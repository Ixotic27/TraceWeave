"""Bounded format parsing, explicit mappings, validation, and raw-byte retention.

This is a demonstrator, not an OCSF conformance or universal parsing claim.
"""
import base64
import csv
import hashlib
import ipaddress
import io
import json
import re
import sqlite3
from datetime import datetime, timezone
from pathlib import Path
from xml.etree import ElementTree as ET
from .adapters import pfsense_record, profile_for, profile_value

TARGETS = ("src_ip", "dst_ip", "src_port", "dst_port", "action", "timestamp", "protocol")
REQUIRED = ("src_ip", "dst_ip", "action")
ALIASES = {
    "src_ip": ("src", "srcip", "sourceip", "src_ip", "source_ip"),
    "dst_ip": ("dst", "dstip", "destinationip", "dst_ip", "destination_ip"),
    "src_port": ("spt", "srcport", "src_port"),
    "dst_port": ("dpt", "dstport", "dst_port"),
    "action": ("action", "act", "verdict"),
    "timestamp": ("timestamp", "time", "eventtime"),
    "protocol": ("protocol", "proto"),
}
ACTION = {"allow": "allow", "accept": "allow", "permit": "allow", "deny": "deny", "drop": "deny", "block": "deny", "reject": "deny"}
KV = re.compile(r'([A-Za-z_][\w.\-]*)\s*=\s*("(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\'|[^\s]+)')


def digest(data):
    return hashlib.sha256(data).hexdigest()


def now():
    return datetime.now(timezone.utc).isoformat()


def pairs_unique(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError(f"Duplicate field: {key}")
        result[key] = value
    return result


def flatten(value, prefix=""):
    result = {}
    if not isinstance(value, dict):
        raise ValueError("JSON root must be an object")
    for key, val in value.items():
        # JSON Pointer preserves dots, slashes, and nesting without collisions.
        path = prefix + "/" + key.replace("~", "~0").replace("/", "~1")
        if isinstance(val, dict) and val:
            result.update(flatten(val, path))
        else:
            result[path] = val
    return result


def parse_record(raw):
    text = raw.decode("utf-8", errors="strict").strip()
    if not text:
        raise ValueError("Empty record retained as raw evidence")
    if len(raw) > 65536:
        raise ValueError("Record exceeds 64 KiB parser limit")
    if "filterlog" in text:
        parsed = pfsense_record(text)
        if parsed:
            return parsed
    if text.startswith("{"):
        fields = flatten(json.loads(text, object_pairs_hook=pairs_unique))
        return "JSON", fields
    if text.startswith("<") and not re.match(r"^<\d{1,3}>", text):
        if "<!" in text:
            raise ValueError("XML declarations with entities or DTD are unsupported")
        root = ET.fromstring(text)
        if any(list(child) or child.attrib for child in root) or root.attrib:
            raise ValueError("Only flat XML element records are supported")
        return "XML", pairs_unique([(child.tag, child.text or "") for child in root])
    fmt = "KV"
    if text.startswith("CEF:"):
        parts = re.split(r"(?<!\\)\|", text, maxsplit=7)
        if len(parts) != 8:
            raise ValueError("CEF header must contain seven separators")
        text, fmt = parts[-1], "CEF"
    elif text.startswith("LEEF:"):
        parts = text.split("|", 5)
        if len(parts) != 6 or parts[0] != "LEEF:1.0":
            raise ValueError("Only LEEF 1.0 tab-delimited extensions are supported")
        # LEEF values can contain spaces. Tabs, not spaces, delimit fields.
        pairs = []
        for token in parts[-1].split("\t"):
            if "=" not in token:
                raise ValueError("Invalid LEEF attribute")
            pairs.append(token.split("=", 1))
        return "LEEF", pairs_unique(pairs)
    elif re.match(r"^<\d{1,3}>", text):
        fmt = "Syslog/KV"
    elif "," in text and "\n" in text:
        rows = list(csv.reader(io.StringIO(text)))
        if len(rows) != 2 or len(rows[0]) != len(rows[1]):
            raise ValueError("CSV record requires one header and one data row")
        return "CSV", pairs_unique(list(zip(rows[0], rows[1])))
    matches = list(KV.finditer(text))
    if not matches:
        raise ValueError("Unsupported structure; supply a supported record or add an adapter")
    # A syslog envelope may precede the payload. Other unmatched text is unsafe.
    cursor = matches[0].start() if fmt == "Syslog/KV" else 0
    pairs = []
    for m in matches:
        if text[cursor:m.start()].strip():
            raise ValueError("Unparsed text between fields; use quoted values")
        value = m.group(2)
        if value.startswith('"'):
            value = json.loads(value)
        elif value.startswith("'"):
            value = value[1:-1]
        pairs.append((m.group(1), value))
        cursor = m.end()
    if text[cursor:].strip():
        raise ValueError("Unparsed trailing text")
    return fmt, pairs_unique(pairs)


def kind(value):
    if isinstance(value, bool):
        return "bool"
    if isinstance(value, (int, float)):
        return "number"
    if isinstance(value, (list, dict)):
        return "complex"
    return "null" if value is None else "string"


def fingerprint(fmt, fields):
    structure = [fmt, sorted((k, kind(v)) for k, v in fields.items())]
    return digest(json.dumps(structure, separators=(",", ":")).encode())[:16]


def suggest(fields):
    result = {}
    for target, aliases in ALIASES.items():
        candidates = [k for k in fields if k.lstrip("/").lower() in aliases]
        if len(candidates) == 1:
            result[candidates[0]] = target
    return result


def convert(target, value):
    if isinstance(value, (bool, list, dict)) or value is None:
        raise ValueError(f"{target}: unsupported value type")
    text = str(value).strip()
    if target.endswith("_ip"):
        return str(ipaddress.ip_address(text))
    if target.endswith("_port"):
        if not re.fullmatch(r"\d{1,5}", text) or not 0 <= int(text) <= 65535:
            raise ValueError(f"{target}: port outside 0..65535")
        return int(text)
    if target == "action":
        if text.lower() not in ACTION:
            raise ValueError("action: unknown vocabulary; explicit adapter required")
        return ACTION[text.lower()]
    if target == "timestamp":
        dt = datetime.fromisoformat(text.replace("Z", "+00:00"))
        if dt.tzinfo is None:
            raise ValueError("timestamp: timezone is required")
        return dt.astimezone(timezone.utc).isoformat()
    if target == "protocol":
        known = {"6": "tcp", "17": "udp", "1": "icmp", "58": "icmpv6"}
        text = known.get(text, text.lower())
        if text not in ("tcp", "udp", "icmp", "icmpv6"):
            raise ValueError("protocol: unknown protocol")
        return text
    raise ValueError("Unsupported target")


def normalize(fields, mapping, profile=None):
    canonical, lineage, errors = {}, {}, []
    for source, target in mapping.items():
        if source not in fields:
            errors.append(f"Missing source field: {source}")
            continue
        try:
            adapted, transform = profile_value(profile, source, target, fields[source]) if profile else (fields[source], None)
            value = adapted if transform == "fortigate-epoch/1" else convert(target, adapted)
            if target in canonical:
                errors.append(f"Ambiguous mapping: multiple fields target {target}")
            canonical[target] = value
            lineage[target] = {"selector": source, "original_value": fields[source], "transform": transform or "validate-and-normalize/1"}
        except (ValueError, TypeError, OverflowError) as exc:
            errors.append(str(exc))
    for field in profile["required"] if profile else REQUIRED:
        if field not in canonical:
            errors.append(f"Required field unavailable: {field}")
    extras = {k: v for k, v in fields.items() if k not in mapping}
    return canonical, lineage, extras, errors


class Engine:
    def __init__(self, path=":memory:"):
        self.db = sqlite3.connect(path)
        self.db.row_factory = sqlite3.Row
        self.db.executescript("""
        CREATE TABLE IF NOT EXISTS events(id INTEGER PRIMARY KEY, source TEXT NOT NULL, raw BLOB NOT NULL, sha256 TEXT NOT NULL, created TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS contracts(source TEXT NOT NULL, fingerprint TEXT NOT NULL, version INTEGER NOT NULL, mapping TEXT NOT NULL, active INTEGER NOT NULL, PRIMARY KEY(source,fingerprint,version));
        CREATE TABLE IF NOT EXISTS results(id INTEGER PRIMARY KEY, event_id INTEGER NOT NULL, revision INTEGER NOT NULL, payload TEXT NOT NULL);
        CREATE TABLE IF NOT EXISTS audit(id INTEGER PRIMARY KEY, at TEXT NOT NULL, action TEXT NOT NULL, details TEXT NOT NULL);
        """)

    def close(self):
        self.db.close()

    def audit(self, action, details):
        self.db.execute("INSERT INTO audit(at,action,details) VALUES(?,?,?)", (now(), action, json.dumps(details)))

    def ingest(self, source, raw):
        if not isinstance(source, str) or not source.strip() or len(source) > 100:
            raise ValueError("Source must be 1..100 characters")
        if len(raw) > 262144:
            raise ValueError("Record exceeds 256 KiB raw-storage limit")
        with self.db:
            cur = self.db.execute("INSERT INTO events(source,raw,sha256,created) VALUES(?,?,?,?)", (source, raw, digest(raw), now()))
            return self.process(cur.lastrowid)

    def process(self, event_id):
        row = self.db.execute("SELECT * FROM events WHERE id=?", (event_id,)).fetchone()
        raw = bytes(row["raw"])
        revision = self.db.execute("SELECT COUNT(*) FROM results WHERE event_id=?", (event_id,)).fetchone()[0] + 1
        result = {"id": event_id, "revision": revision, "source": row["source"], "raw_sha256": row["sha256"], "raw_base64": base64.b64encode(raw).decode(), "raw_text": raw.decode("utf-8", errors="replace"), "schema": "traceweave.network/0.1", "status": "quarantined", "format": "Unknown", "fingerprint": "", "fields": {}, "canonical": {}, "lineage": {}, "unmapped": {}, "errors": [], "suggested_mapping": {}, "contract_version": None}
        if digest(raw) != row["sha256"]:
            result["errors"] = ["Raw evidence hash mismatch"]
        else:
            try:
                fmt, fields = parse_record(raw)
                profile = profile_for(fmt, fields)
                fp = fingerprint(fmt if profile["id"] == "generic/1" else fmt + ":" + profile["id"] + ":" + profile["event_class"], fields)
                proposed = suggest(fields) if profile["id"] == "generic/1" else profile["mapping"]
                result.update(format=fmt, fields=fields, fingerprint=fp, suggested_mapping=proposed, profile=profile, event_class=profile["event_class"], warnings=profile["warnings"])
                contract = self.db.execute("SELECT * FROM contracts WHERE source=? AND fingerprint=? AND active=1 ORDER BY version DESC LIMIT 1", (row["source"], fp)).fetchone()
                mapping = json.loads(contract["mapping"]) if contract else proposed
                canonical, lineage, extras, errors = normalize(fields, mapping, profile)
                result.update(canonical=canonical, lineage=lineage, unmapped=extras, errors=errors)
                if contract:
                    result["contract_version"] = contract["version"]
                    if not errors:
                        result["status"] = "normalized"
                else:
                    known = self.db.execute("SELECT 1 FROM contracts WHERE source=? LIMIT 1", (row["source"],)).fetchone()
                    result["status"] = "drift" if known else "needs_mapping"
                    result["errors"].insert(0, "Structure changed; review mapping before export" if known else "Review source mapping before export")
            except (ValueError, UnicodeError, ET.ParseError, RecursionError, csv.Error) as exc:
                result["errors"] = [str(exc)]
        for line in result["lineage"].values():
            line.update(raw_sha256=row["sha256"], contract_version=result["contract_version"])
        self.db.execute("INSERT INTO results(event_id,revision,payload) VALUES(?,?,?)", (event_id, revision, json.dumps(result)))
        return result

    def approve(self, source, fp, mapping):
        if not isinstance(mapping, dict) or not mapping or len(mapping) > len(TARGETS):
            raise ValueError("Supply a nonempty field mapping")
        if any(not isinstance(k, str) or not isinstance(v, str) or v not in TARGETS for k, v in mapping.items()):
            raise ValueError("Mapping uses an unsupported target")
        if len(set(mapping.values())) != len(mapping):
            raise ValueError("Each target may have only one source")
        rows = [r for r in self.latest() if r["source"] == source and r["fingerprint"] == fp]
        if not rows:
            raise ValueError("No matching records to validate")
        checks = []
        for row in rows:
            _, _, _, errors = normalize(row["fields"], mapping, row.get("profile"))
            checks.append({"id": row["id"], "valid": not errors, "errors": errors})
        if not any(check["valid"] for check in checks):
            raise ValueError("Mapping validates no records: " + "; ".join(checks[0]["errors"]))
        version = self.db.execute("SELECT COALESCE(MAX(version),0)+1 FROM contracts WHERE source=?", (source,)).fetchone()[0]
        with self.db:
            self.db.execute("UPDATE contracts SET active=0 WHERE source=? AND fingerprint=?", (source, fp))
            self.db.execute("INSERT INTO contracts VALUES(?,?,?,?,1)", (source, fp, version, json.dumps(mapping, sort_keys=True)))
            self.audit("mapping_approved", {"source": source, "fingerprint": fp, "version": version, "mapping": mapping, "validation": checks})
            replayed = [self.process(r["id"]) for r in rows]
        return {"version": version, "validation": checks, "replayed": len(replayed), "normalized": sum(r["status"] == "normalized" for r in replayed)}

    def rollback(self, source, fp):
        versions = self.db.execute("SELECT * FROM contracts WHERE source=? AND fingerprint=? ORDER BY version DESC", (source, fp)).fetchall()
        active_index = next((i for i, r in enumerate(versions) if r["active"]), None)
        if active_index is None or active_index + 1 >= len(versions):
            raise ValueError("No earlier contract version for this structure")
        previous = versions[active_index + 1]
        with self.db:
            self.db.execute("UPDATE contracts SET active=0 WHERE source=? AND fingerprint=?", (source, fp))
            self.db.execute("UPDATE contracts SET active=1 WHERE source=? AND fingerprint=? AND version=?", (source, fp, previous["version"]))
            self.audit("mapping_rollback", {"source": source, "fingerprint": fp, "version": previous["version"]})
            rows = [r for r in self.latest() if r["source"] == source and r["fingerprint"] == fp]
            for row in rows:
                self.process(row["id"])
        return {"version": previous["version"], "replayed": len(rows)}

    def latest(self):
        return [json.loads(row[0]) for row in self.db.execute("SELECT r.payload FROM results r JOIN (SELECT event_id,MAX(id) id FROM results GROUP BY event_id) x ON r.id=x.id ORDER BY r.event_id")]

    def history(self, event_id):
        return [json.loads(r[0]) for r in self.db.execute("SELECT payload FROM results WHERE event_id=? ORDER BY revision", (event_id,))]

    def verify(self):
        rows = self.db.execute("SELECT id,raw,sha256 FROM events").fetchall()
        failed = [r["id"] for r in rows if digest(bytes(r["raw"])) != r["sha256"]]
        return {"records": len(rows), "verified": len(rows) - len(failed), "failed": failed, "scope": "Local byte integrity, not proof of origin or tamper-proof storage"}

    def export(self):
        return [r for r in self.latest() if r["status"] == "normalized"]

    def state(self):
        rows = self.latest()
        return {"events": rows, "counts": {s: sum(r["status"] == s for r in rows) for s in ("normalized", "needs_mapping", "drift", "quarantined")}, "raw_bytes": self.db.execute("SELECT COALESCE(SUM(length(raw)),0) FROM events").fetchone()[0], "audit": [dict(r) for r in self.db.execute("SELECT * FROM audit ORDER BY id DESC LIMIT 30")], "contracts": [dict(r) for r in self.db.execute("SELECT * FROM contracts ORDER BY source,version")], "targets": TARGETS}
