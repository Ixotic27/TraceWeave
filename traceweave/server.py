"""Local-only, dependency-free demonstrator. Run with python -m traceweave.server."""
import argparse
import base64
import binascii
import json
import threading
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path
from urllib.parse import urlparse, parse_qs

from .engine import Engine
from .fixtures import SAMPLES, DRIFT, ADVERSARIAL

ROOT = Path(__file__).resolve().parents[1]


class Handler(BaseHTTPRequestHandler):
    def log_message(self, fmt, *args):
        pass

    def send(self, data, status=200, content_type="application/json; charset=utf-8", filename=None):
        body = data if isinstance(data, bytes) else json.dumps(data).encode()
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; frame-ancestors 'none'; base-uri 'none'; form-action 'self'")
        if filename:
            self.send_header("Content-Disposition", f'attachment; filename="{filename}"')
        self.end_headers()
        self.wfile.write(body)

    def local_request(self):
        allowed = {f"127.0.0.1:{self.server.server_port}", f"localhost:{self.server.server_port}"}
        return self.headers.get("Host") in allowed and self.headers.get("Origin", "http://" + self.headers.get("Host", "")) in {"http://" + h for h in allowed}

    def do_GET(self):
        if not self.local_request():
            return self.send({"error": "Local origin required"}, 403)
        path = urlparse(self.path).path
        if path == "/api/state":
            return self.send(self.server.engine.state())
        if path == "/api/verify":
            return self.send(self.server.engine.verify())
        if path == "/api/export":
            rows = self.server.engine.export()
            return self.send(("\n".join(json.dumps(r) for r in rows) + ("\n" if rows else "")).encode(), content_type="application/x-ndjson", filename="traceweave-normalized.ndjson")
        if path == "/api/history":
            try:
                event_id = int(parse_qs(urlparse(self.path).query).get("id", ["0"])[0])
            except ValueError:
                return self.send({"error": "Invalid event ID"}, 400)
            return self.send(self.server.engine.history(event_id))
        if path == "/api/benchmark":
            file = ROOT / "docs/evidence/benchmark.json"
            return self.send(json.loads(file.read_text()) if file.exists() else {"status": "Run python scripts/benchmark.py"})
        assets = {
            "/": ("index.html", "text/html; charset=utf-8"),
            "/app.js": ("app.js", "application/javascript"),
            "/style.css": ("style.css", "text/css"),
            "/demo-data.js": ("demo-data.js", "application/javascript"),
        }
        if path in assets:
            file, typ = assets[path]
            return self.send((ROOT / "web" / file).read_bytes(), content_type=typ)
        return self.send({"error": "Not found"}, 404)

    def do_POST(self):
        if not self.local_request():
            return self.send({"error": "Local origin required"}, 403)
        if self.headers.get("Content-Type", "").split(";")[0] != "application/json":
            return self.send({"error": "JSON required"}, 415)
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if not 0 < length <= 3000000:
                raise ValueError("Request must be smaller than 3 MB")
            data = json.loads(self.rfile.read(length))
            if not isinstance(data, dict):
                raise ValueError("Request must be a JSON object")
            engine = self.server.engine
            path = urlparse(self.path).path
            if path == "/api/demo":
                mode = data.get("mode", "samples")
                if mode not in ("samples", "drift", "adversarial"):
                    raise ValueError("Unknown scenario")
                samples = {"samples": SAMPLES, "drift": DRIFT, "adversarial": ADVERSARIAL}[mode]
                rows = [engine.ingest(source, raw) for source, raw in samples]
                if mode == "samples":
                    # These are pre-reviewed synthetic fixture mappings, never uploaded records.
                    reviewed = set()
                    for row in rows:
                        key = (row["source"], row["fingerprint"])
                        if row["status"] == "needs_mapping" and key not in reviewed:
                            engine.approve(row["source"], row["fingerprint"], row["suggested_mapping"])
                            reviewed.add(key)
                return self.send({"ingested": len(rows)})
            if path == "/api/ingest":
                source = data.get("source", "uploaded-device")
                raw = base64.b64decode(data["base64"], validate=True) if "base64" in data else data.get("text", "").encode("utf-8")
                if not raw or len(raw) > 2000000:
                    raise ValueError("Upload must contain 1 byte to 2 MB")
                records = [raw] if data.get("single_record") else raw.splitlines(keepends=True)
                if len(records) > 2000 or any(len(record) > 262144 for record in records):
                    raise ValueError("Limit: 2,000 records, 256 KiB per raw record")
                if len(engine.latest()) + len(records) > 10000:
                    raise ValueError("Demo database limit: 10,000 records; use a separate --db file")
                for record in records:
                    engine.ingest(source, record)
                return self.send({"ingested": len(records)})
            if path == "/api/approve":
                return self.send(engine.approve(data["source"], data["fingerprint"], data["mapping"]))
            if path == "/api/rollback":
                return self.send(engine.rollback(data["source"], data["fingerprint"]))
            return self.send({"error": "Not found"}, 404)
        except (ValueError, TypeError, KeyError, AttributeError, binascii.Error) as exc:
            return self.send({"error": str(exc)}, 400)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=8765)
    parser.add_argument("--db", default=str(ROOT / "data" / "traceweave.sqlite3"))
    parser.add_argument("--watch-docs", action="store_true", help="Record source/document changes automatically")
    args = parser.parse_args()
    Path(args.db).parent.mkdir(parents=True, exist_ok=True)
    server = HTTPServer(("127.0.0.1", args.port), Handler)
    server.engine = Engine(args.db)
    if args.watch_docs:
        from scripts.changelog import watch, record
        record("Development server started; automatic file-change tracking enabled")
        threading.Thread(target=watch, daemon=True).start()
    print(f"TraceWeave ready at http://127.0.0.1:{server.server_port}", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.engine.close()
        server.server_close()


if __name__ == "__main__":
    main()
