# Resource and dependency manifest

Constraint: all software and the delivered runtime must work without payments. User instruction: “All free and you have to build it.” No paid account, subscription, cloud API, or GPU was used for the prototype.

For the prioritized remaining work, verified FortiGate/pfSense/Suricata source links, collection targets, and the small set of user inputs, see [NEXT_STEPS.md](NEXT_STEPS.md). These newly identified public samples have not yet been integrated.

## Available now

| Resource | Exact choice | Cost / access | Purpose |
| --- | --- | --- | --- |
| Runtime | Python 3.11+; tested with bundled Python 3.12.14 | Existing runtime; no package install | Parser, validation, server, benchmark, changelog |
| Database | Python `sqlite3`, SQLite BLOB and JSON-text columns | Included | Original bytes, contracts, result versions, audit |
| Core libraries | `json`, `csv`, `re`, `xml.etree.ElementTree`, `hashlib`, `ipaddress`, `datetime`, `http.server`, `base64`, `unittest` | Python standard library | Explicit, reproducible behavior |
| UI | HTML5, CSS, browser JavaScript | Local static files, no CDN | Evidence review and correction |
| Datasets | `traceweave/fixtures.py`; generated evaluation records in `scripts/benchmark.py` | Authored synthetic data; reserved example address ranges | Seven bounded formats; drift and invalid-input demos |
| Compute | A CPU laptop, browser, and available disk space | Existing hardware | Run the demo; no GPU dependency |
| Hosting | `http://127.0.0.1:8765` | Localhost | Offline demonstration |
| Automated checks | `python -m unittest discover -s tests -v` | Included | Meaningful behavior and persistence tests |
| Packaging | `run.ps1`; optional `Dockerfile` based on `python:3.12-slim` | Native launcher tested; container not built here | Reproducible startup |

Aim for 4 GB available RAM and 1 GB spare disk for comfortable demonstration use; these are allowances, not measured minimums. Local uploads are limited to 2 MB, 2,000 records/request, 256 KiB/retained record, and 64 KiB/parsed record. Requests above the storage limit are rejected before acceptance. The SQLite server is intended for small demonstrations.

CSV currently accepts one header plus one data row as a single record. XML supports flat child elements without attributes/DTD/entities. CEF supports a bounded header plus quoted/unquoted KV extension subset, not complete CEF escape semantics. LEEF supports version 1.0 tab-delimited attributes. Syslog support extracts a KV body; it is not full RFC5424 metadata normalization. Nested JSON objects flatten using JSON Pointer; arrays remain unmapped. These limits should be visible in any coverage claims.

## Models and APIs

**Required LLMs: none. Required vision models: none. Third-party APIs: none.** The evidence image is an input to selection, not a reason to put multimodal inference into the product. Alias suggestions are deterministic and must not be presented as trained AI.

Optional future proposer: [Qwen/Qwen3-0.6B](https://huggingface.co/Qwen/Qwen3-0.6B/tree/main), whose publisher lists Apache-2.0 licensing. Run locally on CPU after a one-time download; evaluate whether it improves mapping suggestions enough to justify the dependency. A small model may be inadequate for complex device semantics. Pin the exact model revision and inspect its license, memory use, and measured quality before adoption. No model has been downloaded or integrated.

Optional execution runtime: [llama.cpp](https://github.com/ggml-org/llama.cpp), an official project to evaluate for quantized local inference. This is a future option, not a current install requirement. The normal ingestion path must continue to run if model inference is disabled or fails.

## Open data and standards for the next validation step

| Resource | How to use it | Limit or dependency |
| --- | --- | --- |
| [LOGPAI Loghub](https://github.com/logpai/loghub) | Supplemental parsing variability and regression samples | Generic system logs are not sufficient perimeter-device ground truth; review each dataset's terms |
| [Drain3](https://github.com/logpai/Drain3) | Optional template-clustering baseline for unstructured payloads | Not semantic ground truth; not included in the runtime |
| [OCSF schema](https://github.com/ocsf/ocsf-schema) | Choose and pin a release, map a network class, validate required and enumerated fields offline | Current custom schema is **not OCSF-conformant** |
| [Vector Remap](https://vector.dev/docs/reference/configuration/transforms/remap/) | Production parser/transform reference and future execution adapter | Do not infer throughput for our Python implementation from Vector |
| Vendor manuals and sanitized logs | Validate semantics, timestamps, action vocabularies and firmware changes | Required for credible external vendor coverage; not supplied |

Future production storage/queue/framework choices should be evaluated after workload requirements exist. A Rust or Vector worker, partitioned durable ingest, raw object storage, and columnar export are architectural options. They are not dependencies to install to run this prototype. Free software does not imply free production compute, storage, or operations.

## Exact inputs requested for a stronger competition entry

The current build is complete without these. They are needed to expand and substantiate it:

1. Current official SIH26156 text or confirmed portal entry, submission deadline, and current judging instructions. The portal was inaccessible to the research tool.
2. Three target perimeter products and firmware versions. For each, ideally 100–500 sanitized representative events, their format manual, and 20 deliberately changed/invalid cases. Include rare event types, not just repeated allow records.
3. A small field-label sheet or JSON file: original record ID, source/destination meaning, expected action, timestamp timezone/units, and fields that must remain unmapped. A knowledgeable reviewer should label it independently of the parser.
4. Expected target: OCSF release/class, ECS, or a sponsor-specific schema; required SIEM/data-lake destination; lossless-retention definition and retention period.
5. Evaluation laptop specifications and whether a fully offline installation package is required. No access credentials should be needed for the benchmark.
6. Available build time, team size and skills. These were not specified; the working code and documentation can serve as the shared starting point.

Do not substitute fabricated vendor approval, source semantics, accuracy labels, or benchmark results when these inputs are absent. Synthetic examples remain clearly labelled.
