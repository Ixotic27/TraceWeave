# TraceWeave architecture

SIH26156 — Universal Log Pre-processing Framework. Version 0.1. This concise source is intended for a two-page submission export; pagination must be checked in the final PDF.

## Problem and architectural decision

Perimeter-device logs differ across vendors and firmware. Incorrect interpretation can break security analytics even when the input parses successfully. TraceWeave preserves accepted raw records and treats normalized data as versioned interpretations, with explicit review when a source structure changes.

Two differentiators: field-level source lineage attached to a reviewed mapping contract; and a single workflow connecting drift detection, correction, replay, and rollback. Automatic parsing and raw retention already exist in mature tools; our advantage is the complete, demonstrable workflow.

```mermaid
flowchart LR
    A[Log input] --> B[Raw bytes + hash]
    B --> C[Bounded parser]
    C --> D[Structure fingerprint]
    D --> E[Approved mapping]
    D --> F[Review new structure]
    F --> E
    E --> G[Validate fields]
    G --> H[Versioned result + lineage]
    G --> I[Quarantine]
    H --> J[Validated NDJSON]
    B --> K[Replay]
    E --> K
    K --> G
```

## Implemented components

- **Ingest and raw store:** local text/file upload; original bytes, SHA-256, source identifier and receipt time stored in SQLite before interpretation. Oversized requests are rejected before acceptance.
- **Parsing:** bounded JSON, KV, Syslog/KV, CEF, LEEF 1.0, flat XML and one-row CSV adapters. Unsupported/ambiguous records retain raw evidence and error reasons.
- **Contract registry:** source name plus format/key/type fingerprint identifies a structure. Mappings are reviewed and versioned. Aliases propose mappings without inventing semantics.
- **Validation:** IP addresses, ports, known action/protocol vocabulary and explicit timestamp timezone. This network demonstration requires source IP, destination IP and action. Unknown extra fields remain available.
- **Replay and provenance:** retain each result revision. Each normalized field records a source selector, original value, transform version, raw hash and contract version. JSON selectors use JSON Pointer. Approval replays affected records; rollback restores the prior contract and appends new result revisions.
- **UI and export:** an empty initial workspace with Add logs → Review fields → Export flow; source summaries and decision activity; 25-row pagination, source/status/text filters and 10-second state refresh. Field settings, raw-byte downloads and technical history are available in the detail dialog. Candidate values are identified as unapproved. All actions use the local API; unavailable connections show an error, never a simulated response. Static hosting cannot execute the backend.

## Data model and runtime

`events` stores raw bytes and identity; `contracts` stores mapping versions; `results` stores interpreted revisions; `audit` stores approval/rollback records. Stable event IDs join them. No result deletes or overwrites an older interpretation through the application.

Runtime: Python 3.11+, standard library, SQLite, and local HTML/CSS/JavaScript. No model, paid API, cloud service or GPU is required. The server binds loopback and validates request origin/host. Input sizes are bounded; untrusted text is escaped in the UI. This is a single-user demonstrator, without enterprise authentication or tamper-proof storage.

## Verification and constraints

The supplied unit tests cover preservation, invalid records, duplicate fields, drift, contract isolation, replay, rollback and persistence. A 240-record synthetic evaluation improves valid normalization from 120 before review to 240 after one supplied field mapping. All four negative fixtures are excluded; all 1,252 retained benchmark records verify. Human onboarding time and external vendor accuracy are unmeasured.

The schema is `traceweave.network/0.1`, not validated OCSF. Structural drift detection cannot establish a same-shaped semantic change. Full vendor grammars, arbitrary proprietary formats, local model suggestions, OCSF integration and distributed durability remain future work.

## Scale path

At one billion events/day, average ingest is about 11,574 events/second. Production requires durable collectors, partitioned queues, immutable raw object storage, stateless parsing/mapping workers, a contract registry, quarantine queues and columnar output. Add backpressure, idempotent processing, replay checkpoints and retention policies. Replace the prototype's single server, per-record commits and full-history reads. Benchmark end-to-end durability and recovery before making scale claims.

The optional local model would only propose restricted mappings from manuals and samples. Reviewed validation gates control promotion; ordinary execution remains deterministic. Do not put per-event LLM calls in the required path.
