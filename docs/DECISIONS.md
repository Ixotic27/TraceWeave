# Architecture decisions

Status: implemented decisions unless explicitly marked proposed. Decision date: 19 September 2026. New entries are appended. Superseded decisions retain their original text and link to the replacement.

## ADR-001 — Select SIH26156

Context: seven supplied NTRO software challenges, an unattributed comparative image, and the user's explicit requirement for a completely free build. Team skills and deadline are unspecified.

Decision: choose a perimeter-log interpretation/recovery workflow. Prioritize raw retention, field traceability, structural drift handling, and replay.

Alternatives: attack forecasting needs defensible temporal labels and training; erasure/recovery needs a narrower storage validation scope; dual-model flooding and metrically validated reconstruction require specialized inputs.

Consequence: a working CPU-only proof can be built from synthetic data; independent vendor coverage remains a required follow-up. Scoring and evidence are in PROBLEM_STATEMENT.md.

Validation: source descriptions extracted with cell references; current product capabilities researched; the official 2026 portal could not be retrieved.

## ADR-002 — No paid service or mandatory model

Context: the user replied “All free and you have to build it.” Competitors already provide AI-assisted extraction.

Decision: use Python standard library, SQLite, local HTML/CSS/JavaScript, and deterministic mappings. Build the runnable prototype in addition to the original requested analysis and documentation.

Alternatives: cloud LLM inference, a local model required for every event, or a large framework dependency stack.

Consequence: no paid account, GPU, model download, or package installation is needed. Alias suggestions are not represented as AI. A local model can be evaluated later as an optional candidate proposer.

Validation: local runtime tested; UI loads without third-party assets; engine tests and a synthetic benchmark run.

## ADR-003 — Separate raw evidence from interpretation

Context: a normalized schema cannot preserve every source-specific distinction in its core fields.

Decision: store accepted original bytes, their hash, parsed attributes, unmapped values, and independently versioned interpretations. Attach selectors, original values, transform and contract versions to normalized fields.

Alternatives: overwrite logs with JSON, discard unknown fields, or use an LLM to rewrite originals.

Consequence: reversible reprocessing and inspectable provenance at greater storage cost. Local SQLite hashes are not tamper-proof chain of custody. Production needs external trust anchors and controlled archival if that property is required.

Validation: CRLF/whitespace and binary-byte round trips, corruption detection, nested-key collision handling, revision history, persistence tests.

## ADR-004 — Explicit review and deterministic replay

Context: valid syntax and IP addresses do not establish field meaning. Firmware changes can invalidate a mapping.

Decision: namespace contracts by source and format/key/type fingerprint. New structures wait for review. Approved mappings reprocess affected retained events and append result versions. Invalid records remain excluded.

Alternatives: globally trust field aliases; auto-approve inferred mappings; mutate earlier interpreted records.

Consequence: slightly more onboarding effort, but no hidden automatic assignment of unfamiliar semantics. Same-shaped semantic changes can evade the fingerprint. Reviewer errors remain possible.

Validation: source isolation, duplicate-target rejection, missing-selector rejection, drift replay, rollback, unknown action and invalid-port checks.

## ADR-005 — Custom demo schema, explicit OCSF roadmap

Context: OCSF is an existing common schema and already supports raw/unmapped data; claiming a novel industry schema adds little value.

Decision: label this implementation `traceweave.network/0.1`; reserve full OCSF mapping/validation for an adapter against a pinned release and class.

Alternatives: falsely claim OCSF compliance from a handful of similarly named fields; spend the initial build on a broad taxonomy.

Consequence: transparent prototype integration limits. NDJSON export is available, but a downstream SIEM adapter is still needed.

Validation: the UI and documentation disclose the schema status. Proposed future adapter needs schema conformance and representative downstream query tests.

## ADR-006 — Separate demonstration from performance claims

Context: the user requests a 10× differentiated solution and winning strategy. There is no independent benchmark corpus, timed baseline, or access to actual competing submissions.

Decision: build the recovery mechanism, measure it honestly, and define 10× onboarding/repair time reduction as a future evaluation target at equal correctness.

Alternatives: claim universal 100% accuracy or 10× superiority from synthetic examples.

Consequence: measured results are narrower but reproducible. The fixed-alias baseline shares parsers and validation; after an explicit mapping, TraceWeave recovers 120 previously withheld records. This does not prove superiority over an edited/replayed baseline or mature products.

Validation: benchmark labels and limitations are saved alongside results; no future-model performance is attributed to the current code.

## ADR-007 — Automatic change capture plus authored rationale

Context: the user asks for ongoing automatic documentation of architecture and scope changes.

Decision: append file changes automatically during the documented development launcher. Require an author-supplied decision entry for semantic architecture or requirement changes. Track source code, tests, scripts, selected root files and Markdown docs; exclude ingested data, screenshots, runtime databases and the changelog itself.

Alternatives: pretend a file watcher can infer architectural intent; depend only on manually remembering changed files; create an unrelated cloud automation.

Consequence: automatic factual capture and a useful human-readable rationale record. The watcher runs only while the development server or standalone watcher is running. Concurrent watcher instances are unsupported; use one per workspace.

Validation: inspect the generated changelog and verify a subsequent change produces an appended entry without rewriting earlier entries.
