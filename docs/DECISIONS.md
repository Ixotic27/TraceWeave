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

## ADR-008 — Real-data workspace and plain-language review

Date: 20 September 2026 (Asia/Calcutta). Status: implemented. Supersedes the earlier demonstration-oriented UI and its static response fallback; parsing and review gates are unchanged.

Trigger: the user could not understand the interface and asked to remove prototype/SIH branding, remove testing data, and make the website dynamic.

Decision: organize the interface into Logs, Sources, Activity and How it works. Teach Add logs → Review fields → Export with empty-state guidance. Use plain-language statuses, explicit next actions and meaning-first field selectors. Keep raw content, lineage, schema and result revisions in expandable detail sections. Support file selection, drag/drop and pasted text, stable source names, automatic record framing, source/status/text filters, 25-row pagination and 10-second state refresh.

All runtime state and mutations use the local Python API. Remove the bundled sample payload, static simulated engine, demonstration endpoint, benchmark endpoint and sample buttons. Connection failure leaves previously received data visibly stale and disables mutations; it never manufactures successful ingestion or verification. The static GitHub Pages workflow is not a backend deployment.

Migration: identify sample records by exact source-and-byte pairs, back up SQLite locally, and remove those events and their revisions. Remove mappings and audit entries only for the matching sources that become empty. Preserve unfamiliar records, including different bytes under a sample source name. The executed migration removed 15 known records and left zero active records; the archive remains under ignored `data/archives/`. Retain internal fixtures for regression tests only.

Alternatives: cosmetic renaming with simulated results; clearing the entire database; automatically approving uploads. Rejected because they either mislead users, risk real data, or weaken source review.

Impact: no new dependencies, models, costs or external calls. The user-facing site has no competition/prototype branding. Historical strategy documents retain their context. Vendor adapters, model training, live device collectors and OCSF conformance remain separate unfinished work; public test corpora are not inserted into the clean user workspace.

Validation: HTTP integration checks exercise actual ingestion, approval, export, source reuse, record framing, raw-byte preservation and removed endpoints. Migration checks prove exact matching, backup recovery, preservation of unrelated records and idempotence. Browser checks use a separate in-memory workspace to avoid adding test records to the user's active database. See VERIFICATION.md for results and limits.

## ADR-009 — Vendor semantics before AI suggestions

Date: 20 September 2026. Status: initial implementation.

The next delivery adds versioned FortiGate, pfSense filterlog and Suricata EVE profiles. Profiles specify per-event required fields; network connections and IDS alerts do not require an invented firewall decision. Suricata alert.action cannot be promoted to a final action; that must use verdict.action. FortiGate session states remain additional data. Documented seconds/nanoseconds convert without dropping the original precision. BSD syslog lacks year/timezone, so no full timestamp is fabricated. A changed profile/event class changes the mapping fingerprint and requires review.

150 public Elastic integration fixtures with pinned hashes, expected output companions and license texts were downloaded separately from the empty user workspace. Initial development checks produce 146 candidates passing current field validation; four remain excluded because of unsupported escapes, malformed quoting or protocol vocabulary. This is coverage of the development corpus, not independent accuracy or trained-model performance. Four semantic regression tests were added; all 40 tests pass at the pre-model checkpoint.

AI remains a later optional suggestion component with mandatory human review. Supabase setup is in progress at the user's request; no cloud connection or model is claimed by this checkpoint. The official npm installer encountered a certificate validation error; verification was not disabled.

## ADR-010 — Train the mapping assistant on AMD DirectML

Date: 20 September 2026. Status: implemented; supersedes the optional-model status in ADR-009.

The user explicitly required GPU training after the pre-model code checkpoint was pushed to GitHub. Installed pinned PyTorch DirectML packages in an ignored project environment and selected the AMD RX 6500M explicitly. A small 16,448-parameter supervised field classifier fits the 4 GB GPU comfortably without an LLM fine-tuning stack. Training fails on operator fallback warnings and verifies gradients remain on the selected GPU.

169 authored training examples, 40 validation examples and 60 held-out examples have disjoint normalized field names. Validation selects abstention thresholds. The test produced 39 correct and two incorrect suggestions, with 19 abstentions. Incorrect suggestions are documented rather than hidden or tuned away using the test set. The task is name/type generalization on authored data, not independent vendor validation. Dataset and weights are hashed in the evidence report.

The integration uses learned suggestions only after exact aliases, only for generic profiles, with value validation and ambiguous-candidate abstention. Mandatory source review and export gating remain unchanged. Runtime inference is a small, local, dependency-free weight calculation; GPU acceleration is required for the training script. Missing/invalid model data does not prevent manual parsing/review. A JSON artifact avoids executable model serialization.

Validation: 46 automated checks passed after integration, including GPU-artifact provenance, split leakage, unapproved-export exclusion, alias precedence, conflicting suggestions, invalid values, missing-model behavior and vendor-profile isolation. See MODEL_CARD.md and evidence/gpu-training.json.

## ADR-011 — Optional, explicit Supabase export

Date: 20 September 2026. Status: code implemented; deployment state in SUPABASE.md.

The user requested CLI setup and a dedicated project only if free. SQLite remains primary for air-gapped use. The browser never receives server secrets. Only reviewed latest revisions are sent, with retained originals and lineage, after an explicit action identifying that scope. Batches are bounded; a stable local workspace UUID and revision key make retries idempotent. Receipts advance only after remote success. Earlier cloud revisions are retained, so this is an export rather than a full backup or collaborative editing system.

The migration denies anonymous/authenticated access and grants the server role SELECT and INSERT only. Redirects are refused, TLS verification remains enabled, and errors exclude remote response bodies. Cloud export is off until configured. Unit tests use a controlled transport and ordinary HTTP integration tests force cloud off even when a developer has a real .env file.
## ADR-012 — Free hosted workspaces alongside offline deployment

21 September 2026. Hosted deployment adds Supabase password authentication,
owner-scoped RLS, and atomic revision-checked snapshots of the complete workspace.
Render needs only a public API key plus the signed-in user's token. Full snapshots
reuse the existing lossless engine while preserving review history across free
host restarts; they deliberately cap a workspace at 1,000 records and 8 MB.
Compare-and-swap rejects concurrent stale writes, and persistent operation IDs
allow clients to deduplicate recent retries. This is a bounded online workbench,
not the future distributed streaming architecture. Local air-gapped mode remains
available. The GPU-trained artifact runs CPU inference on the free host.
