# TraceWeave

[![Deploy to GitHub Pages](https://github.com/Ixotic27/TraceWeave/actions/workflows/deploy.yml/badge.svg)](https://github.com/Ixotic27/TraceWeave/actions/workflows/deploy.yml)
[![Tests & Verification](https://github.com/Ixotic27/TraceWeave/actions/workflows/test.yml/badge.svg)](https://github.com/Ixotic27/TraceWeave/actions/workflows/test.yml)

🌐 **Live Demo:** [https://ixotic27.github.io/TraceWeave/](https://ixotic27.github.io/TraceWeave/)

A free, offline working prototype for **SIH26156: Universal Log Pre-processing Framework**.

TraceWeave retains original log bytes, normalizes reviewed source mappings, detects structural changes, and replays affected records after a correction. Every normalized field retains source lineage. Unknown or invalid records remain available but are excluded from validated export.

## Run

From this directory in PowerShell:

```powershell
.\run.ps1
```

Then open [TraceWeave](http://127.0.0.1:8765). The launcher uses the existing bundled Python when available and starts automatic source/document change tracking. Stop with Ctrl+C.

Alternatively, with Python 3.11+ on your PATH:

```powershell
python -m traceweave.server --watch-docs
```

No `pip install`, Node build, paid API, account, GPU, or Internet connection is required at runtime. Python 3.12.14 is the tested runtime. The application binds to `127.0.0.1` and is designed for a single local user.

## Demonstrate the difference

1. Click **Load known sources**. Eight synthetic events from seven bounded formats load with pre-reviewed fixture mappings.
2. Click **Change a device format**. On a fresh database, two new events show **Schema drift** and are withheld from validated export.
3. Open a drift event. Map **origin → src_ip**, then click **Approve mapping and replay**. Both retained events are reprocessed; historical revisions remain available.
4. Click **Challenge the parser**. Duplicate keys, an invalid port, an unknown action and binary data remain excluded from export.
5. Click **Verify raw bytes**. Inspect an event's field lineage, download its original bytes, and export validated NDJSON.

Demo buttons append events. Once a changed structure is approved, clicking the same drift scenario again correctly uses that saved contract. For a clean rehearsal without deleting existing data, use a new database:

```powershell
python -m traceweave.server --db data/rehearsal-02.sqlite3 --port 8766
```

Open [the rehearsal instance](http://127.0.0.1:8766). Keep source names stable when importing your own records. New uploaded sources always require review.

## Validation

```powershell
python -m unittest discover -s tests -v
python scripts/benchmark.py
```

The benchmark uses synthetic records and a clearly defined fixed-mapping baseline. It measures successful recovery after one supplied mapping correction. It does not establish 10× performance, general vendor accuracy, or superiority over commercial products. The current recorded run is in [benchmark.json](docs/evidence/benchmark.json).

## Documentation

- [Selection, competitors, ranking, blueprint and demo plan](docs/PROBLEM_STATEMENT.md)
- [Concise architecture](docs/ARCHITECTURE.md)
- [Exact resources, dependencies and remaining domain inputs](docs/RESOURCE_MANIFEST.md)
- [Architecture decisions](docs/DECISIONS.md)
- [Changelog protocol](docs/WORKFLOW.md) and [automatic changelog](docs/CHANGELOG.md)
- [Verification report](docs/VERIFICATION.md)

## Scope

Implemented formats are bounded subsets: JSON objects; key/value records; Syslog with KV payload; CEF header plus a constrained KV extension; LEEF 1.0 tab-separated attributes; flat XML; and a CSV header plus one row. For pretty JSON, XML, or two-line CSV, select **Treat the entire input as one record**. Full vendor/RFC grammar coverage and multirow CSV framing are future work.

The custom output schema is `traceweave.network/0.1`; it is not certified or validated OCSF. No LLM or trained ML model is included. Structural changes are detected, but changes in meaning with identical keys/types may require additional domain validation.

Data stays in `data/traceweave.sqlite3`. Raw content also appears in result revisions for convenient evidence export, increasing storage overhead. SHA-256 verifies local byte consistency; it does not authenticate a device or prevent a local administrator from altering the database. The prototype does not claim enterprise availability, access control, regulatory compliance, or billion-event throughput.

The Dockerfile is an untested optional packaging recipe. Because the server binds loopback, use native Python on Windows; the commented Linux host-network option is intended only for a local demonstration.
