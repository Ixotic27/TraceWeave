# TraceWeave

**Online:** [traceweave.onrender.com](https://traceweave.onrender.com)

Create an account and sign in. Initial email delivery is limited to the Supabase
project team until an email provider is configured. Free hosting can take a moment
to wake up after inactivity. Local instructions below remain available for offline use.

[![Deploy to GitHub Pages](https://github.com/Ixotic27/TraceWeave/actions/workflows/deploy.yml/badge.svg)](https://github.com/Ixotic27/TraceWeave/actions/workflows/deploy.yml)
[![Tests & Verification](https://github.com/Ixotic27/TraceWeave/actions/workflows/test.yml/badge.svg)](https://github.com/Ixotic27/TraceWeave/actions/workflows/test.yml)

A free workspace for making device logs consistent and understandable, available
as an offline local app or a hosted service with private Supabase storage.

For online deployment, see [HOSTING.md](docs/HOSTING.md). The Render Free service
runs the saved GPU-trained model without a paid AI API. Hosted users sign in;
originals, field settings and review history are saved automatically.

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

## Use your workspace

1. Choose **Add logs**, name your device, and upload a file or paste its logs. Reuse that source name for future uploads.
2. Open a log marked **Needs review**. Check Source IP, Destination IP, Action, and the optional fields against your device documentation. Choose **Save settings & process logs**.
3. All matching logs from that source are reprocessed. Future uploads with the same structure reuse the saved settings. A changed structure is marked **Format changed** for review.
4. Choose **Export ready logs** to download reviewed records as NDJSON. Records needing review or failing validation are excluded, while their originals remain saved.
5. Use **Sources** to see devices and saved field settings, **Activity** for decisions, and **How it works** for explanations. Open a log's expandable details to download its original bytes or inspect processing history.

The workspace starts empty. There are no sample-loading buttons or simulated API responses. Counts, source summaries, filters and export availability come from the local database. The visible page refreshes every 10 seconds; this refresh does not collect logs directly from a device. Add files, paste text, or submit logs through `POST /api/ingest`.

To open a separate workspace without changing existing data:

```powershell
python -m traceweave.server --db data/another-workspace.sqlite3 --port 8766
```

Open [the separate workspace](http://127.0.0.1:8766).

### Hosting and connection

Run the Python server to process logs. The existing GitHub Pages workflow publishes static frontend files only; it cannot run this backend. When no backend is available, the page displays connection instructions and disables uploads rather than showing fabricated results. No cloud service is required for local operation.

The hosted workspace saves each signed-in user’s workspace through Supabase. The main workspace keeps this detail out of the navigation; account and data handling are described in the [privacy notice](web/privacy.html) and [terms of use](web/terms.html). Setup and deployment details are documented in [SUPABASE.md](docs/SUPABASE.md).

### Local ingestion API

Send JSON to `POST http://127.0.0.1:8765/api/ingest` with a stable `source`, and either `text` or `base64` for original file bytes. `record_mode` accepts `auto`, `lines`, or `single`. Automatic mode recognizes complete JSON objects, flat XML, and a CSV header plus one row; other inputs are split at line boundaries with line endings retained. Existing `single_record` clients remain compatible. Limits: 2 MB per upload, 2,000 records per request and 10,000 records per workspace.

### Removal of earlier sample records

The September 20 interface migration removed 15 exact known sample records from the local workspace after backing up the database under `data/archives/`. Unrecognized records are preserved. For an older installation, stop the server and run `python scripts/remove_sample_data.py`; the script is idempotent and only matches known source-and-byte pairs. Development fixtures remain in tests and the benchmark, separate from the application.

## Validation

```powershell
python -m unittest discover -s tests -v
python scripts/benchmark.py
```

The benchmark uses synthetic records and a clearly defined fixed-mapping baseline. It measures successful recovery after one supplied mapping correction. It does not establish 10× performance, general vendor accuracy, or superiority over commercial products. The current recorded run is in [benchmark.json](docs/evidence/benchmark.json).

## Documentation

- [Selection, competitors, ranking, blueprint and demo plan](docs/PROBLEM_STATEMENT.md)
- [Concise architecture](docs/ARCHITECTURE.md) and [two-page PDF](output/pdf/TraceWeave-Architecture.pdf)
- [Exact resources, dependencies and remaining domain inputs](docs/RESOURCE_MANIFEST.md)
- [Architecture decisions](docs/DECISIONS.md)
- [Changelog protocol](docs/WORKFLOW.md) and [automatic changelog](docs/CHANGELOG.md)
- [Verification report](docs/VERIFICATION.md)
- [GPU training, measured results and limitations](docs/MODEL_CARD.md)

## Scope

Implemented formats are bounded subsets: JSON objects; key/value records; Syslog with KV payload; CEF header plus a constrained KV extension; LEEF 1.0 tab-separated attributes; flat XML; and a CSV header plus one row. Automatic reading handles complete JSON objects, XML and two-line CSV. Use **Reading options → Entire input is one record** to override detection. Full vendor/RFC grammar coverage and multirow CSV framing are future work.

The custom output schema is `traceweave.network/0.1`; it is not certified or validated OCSF. A small GPU-trained model supplies optional, reviewable field suggestions for unfamiliar generic logs. Known vendor rules take precedence; no model suggestion is automatically approved. See [the model card](docs/MODEL_CARD.md) for AMD DirectML training evidence, held-out results and limitations. Structural changes are detected, but changes in meaning with identical keys/types may require additional domain validation.

Data stays in `data/traceweave.sqlite3`. Raw content also appears in result revisions for convenient evidence export, increasing storage overhead. SHA-256 verifies local byte consistency; it does not authenticate a device or prevent a local administrator from altering the database. Enterprise availability, access control, regulatory compliance, and billion-event throughput have not been implemented or established.

The Dockerfile is an untested optional packaging recipe. Because the server binds loopback, use native Python on Windows; the commented Linux host-network option is intended only for a local demonstration.
