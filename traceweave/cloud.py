"""Optional, explicit export of reviewed revisions to a server-only Supabase table."""
import base64
import hashlib
import json
import os
import re
import urllib.error
import urllib.request
import uuid
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
KEYS = ("TRACEWEAVE_CLOUD_ENABLED", "SUPABASE_URL", "SUPABASE_SECRET_KEY")


def configuration():
    values = {}
    path = ROOT / ".env"
    if path.exists():
        for line in path.read_text(encoding="utf-8-sig").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            if key.strip() in KEYS:
                values[key.strip()] = value.strip().strip("\"'")
    values.update({key: os.environ[key] for key in KEYS if key in os.environ})
    return values


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        # Never forward the service credential to a redirected host.
        return None


class CloudExport:
    def __init__(self, engine, config=None):
        self.engine = engine
        self.config = configuration() if config is None else config
        self.url = self.config.get("SUPABASE_URL", "").rstrip("/")
        self.key = self.config.get("SUPABASE_SECRET_KEY", "")
        self.enabled = self.config.get("TRACEWEAVE_CLOUD_ENABLED") == "1"
        self.valid = bool(re.fullmatch(r"https://[a-z0-9]{20}\.supabase\.co", self.url)) and bool(self.key.startswith("sb_secret_") or self.key.startswith("eyJ")) and not any(c.isspace() for c in self.key)
        self.checked = False
        self.opener = urllib.request.build_opener(NoRedirect())
        engine.db.executescript("""
        CREATE TABLE IF NOT EXISTS cloud_settings(key TEXT PRIMARY KEY, value TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS cloud_receipts(destination TEXT NOT NULL, event_id INTEGER NOT NULL, revision INTEGER NOT NULL, PRIMARY KEY(destination,event_id,revision));
        """)
        with engine.db:
            engine.db.execute("INSERT OR IGNORE INTO cloud_settings VALUES('workspace_id',?)", (str(uuid.uuid4()),))
        self.workspace_id = engine.db.execute("SELECT value FROM cloud_settings WHERE key='workspace_id'").fetchone()[0]

    def pending(self):
        sent = {(r[0], r[1]) for r in self.engine.db.execute("SELECT event_id,revision FROM cloud_receipts WHERE destination=?", (self.url,))}
        return [r for r in self.engine.export() if (r["id"], r["revision"]) not in sent]

    def status(self):
        return {"enabled": self.enabled, "configured": self.enabled and self.valid,
                "connection_verified": self.checked, "destination": self.url if self.valid else None,
                "pending": len(self.pending()), "workspace_id": self.workspace_id,
                "mode": "Manual export of reviewed logs, including originals; local storage remains primary"}

    def request(self, method, path, body=None):
        if not self.enabled or not self.valid:
            raise ValueError("Cloud export is not configured. Local processing remains available.")
        headers = {"apikey": self.key, "Content-Type": "application/json", "Prefer": "resolution=ignore-duplicates,return=minimal"}
        # Legacy service_role JWTs need Authorization; new secret keys use apikey.
        if self.key.startswith("eyJ"):
            headers["Authorization"] = "Bearer " + self.key
        request = urllib.request.Request(self.url + path, data=body, method=method, headers=headers)
        try:
            with self.opener.open(request, timeout=10) as response:
                if not 200 <= response.status < 300:
                    raise ValueError("Supabase did not accept the request. Local data is unchanged.")
                response.read(4096)
        except urllib.error.HTTPError as exc:
            # Remote bodies and request headers may contain sensitive information.
            self.checked = False
            raise ValueError(f"Supabase returned HTTP {exc.code}. Check the project, migration and server key; retry safely.") from None
        except (urllib.error.URLError, TimeoutError, OSError):
            self.checked = False
            raise ValueError("Cannot reach Supabase securely. Local data is saved; retry when connected.") from None
        self.checked = True

    def check(self):
        self.request("GET", "/rest/v1/traceweave_revisions?select=event_id&limit=0")
        return self.status()

    def sync(self, include_originals=False):
        if include_originals is not True:
            raise ValueError("Confirm that this export includes original log content.")
        # One bounded request per click; receipts advance only after a successful response.
        batch = []
        size = 2
        for result in self.pending():
            raw = base64.b64decode(result["raw_base64"], validate=True)
            if hashlib.sha256(raw).hexdigest() != result["raw_sha256"]:
                raise ValueError("Original-byte verification failed; cloud export stopped.")
            row = {"workspace_id": self.workspace_id, "event_id": result["id"], "revision": result["revision"],
                   "source": result["source"], "raw_sha256": result["raw_sha256"], "payload": result}
            encoded = json.dumps(row, separators=(",", ":")).encode()
            if batch and (size + len(encoded) + 1 > 1500000 or len(batch) >= 100):
                break
            if len(encoded) > 1500000:
                raise ValueError("A record exceeds the cloud batch limit. Use local export for this record.")
            batch.append(row)
            size += len(encoded) + 1
        if not batch:
            return {"sent": 0, "remaining": 0}
        self.request("POST", "/rest/v1/traceweave_revisions?on_conflict=workspace_id,event_id,revision",
                     json.dumps(batch, separators=(",", ":")).encode())
        with self.engine.db:
            self.engine.db.executemany("INSERT OR IGNORE INTO cloud_receipts VALUES(?,?,?)",
                                      [(self.url, row["event_id"], row["revision"]) for row in batch])
            self.engine.audit("cloud_export", {"destination": self.url, "records": len(batch)})
        return {"sent": len(batch), "remaining": len(self.pending())}
