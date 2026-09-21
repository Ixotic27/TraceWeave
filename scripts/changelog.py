"""Append factual change summaries automatically; accept explicit decision rationale.

Only records file hashes and paths. Never reads or logs ingested device records.
"""
import argparse
import hashlib
import json
import time
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
STATE = ROOT / "data" / "documentation_state.json"
LOG = ROOT / "docs" / "CHANGELOG.md"


def snapshot():
    paths = [ROOT / "README.md", ROOT / "run.ps1", ROOT / "Dockerfile", ROOT / "requirements-gpu.txt", ROOT / "requirements-gpu-lock.txt", ROOT / "render.yaml"]
    for folder, suffixes in (("traceweave", {".py"}), ("web", {".html", ".js", ".css"}), ("scripts", {".py", ".ps1"}), ("tests", {".py"}), ("docs", {".md"}), ("models", {".json"}), ("datasets/model", {".json"}), ("supabase", {".sql", ".toml"})):
        paths.extend(p for p in (ROOT / folder).rglob("*") if p.suffix in suffixes and p != LOG)
    return {str(p.relative_to(ROOT)).replace("\\", "/"): hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(set(paths)) if p.is_file()}


def record(reason="Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md"):
    current = snapshot()
    previous = json.loads(STATE.read_text()) if STATE.exists() else {}
    changes = [("added" if name not in previous else "modified", name) for name, value in current.items() if previous.get(name) != value]
    changes += [("removed", name) for name in previous if name not in current]
    if not changes:
        return False
    LOG.parent.mkdir(parents=True, exist_ok=True)
    if not LOG.exists():
        LOG.write_text("# Changelog\n\nChanges are appended automatically. Architecture rationale is maintained in DECISIONS.md.\n", encoding="utf-8")
    with LOG.open("a", encoding="utf-8") as output:
        output.write(f"\n## {datetime.now(timezone.utc).isoformat()}\n\n{reason}\n\n")
        for action, name in changes:
            output.write(f"- {action.capitalize()}: `{name}`\n")
    STATE.parent.mkdir(parents=True, exist_ok=True)
    STATE.write_text(json.dumps(current, indent=2), encoding="utf-8")
    return True


def watch():
    while True:
        time.sleep(2)
        try:
            record()
        except (OSError, ValueError) as exc:
            print(f"Documentation watcher: {exc}", flush=True)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--reason", default="Recorded implementation/documentation changes")
    parser.add_argument("--watch", action="store_true")
    args = parser.parse_args()
    print("Recorded changes" if record(args.reason) else "No source changes")
    if args.watch:
        watch()
