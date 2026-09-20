"""Archive the workspace and remove only exact, known demonstration records.

Run once for the migration away from the former sample-data UI. Unrecognized
records, including records sharing a fixture's source name, are preserved.
"""
import argparse
import json
import sqlite3
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from traceweave.fixtures import SAMPLES, DRIFT, ADVERSARIAL

KNOWN = set(SAMPLES + DRIFT + ADVERSARIAL)
KNOWN.add(("custom-review-demo", b"source_ip=192.0.2.44 destination_ip=198.51.100.77 action=deny dst_port=443"))


def clean(path):
    path = Path(path).resolve(strict=True)
    db = sqlite3.connect(path)
    try:
        rows = db.execute("SELECT id,source,raw FROM events").fetchall()
        matches = [(event_id, source) for event_id, source, raw in rows if (source, bytes(raw)) in KNOWN]
        if not matches:
            return {"removed": 0, "remaining": len(rows)}
        archive = path.parent / "archives" / ("before-sample-removal-" + datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S%fZ") + ".sqlite3")
        archive.parent.mkdir(parents=True, exist_ok=True)
        backup = sqlite3.connect(archive)
        try:
            db.backup(backup)
        finally:
            backup.close()
        with db:
            for event_id, _ in matches:
                db.execute("DELETE FROM results WHERE event_id=?", (event_id,))
                db.execute("DELETE FROM events WHERE id=?", (event_id,))
            empty_sources = {source for _, source in matches if not db.execute("SELECT 1 FROM events WHERE source=?", (source,)).fetchone()}
            for source in empty_sources:
                db.execute("DELETE FROM contracts WHERE source=?", (source,))
            for audit_id, details in db.execute("SELECT id,details FROM audit").fetchall():
                if json.loads(details).get("source") in empty_sources:
                    db.execute("DELETE FROM audit WHERE id=?", (audit_id,))
        return {"removed": len(matches), "remaining": len(rows) - len(matches), "backup": str(archive)}
    finally:
        db.close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--db", default=str(ROOT / "data/traceweave.sqlite3"))
    print(json.dumps(clean(parser.parse_args().db), indent=2))
