# Remaining work and free data sources

Hosting update, 21 September 2026: the online service is deployed at
https://traceweave.onrender.com with a sign-in screen, saved model inference, and
owner-scoped Supabase workspace persistence. The owner still needs to create and
confirm the first app account. Broad public registration requires an email provider;
the default Supabase sender delivers only to project team addresses. See HOSTING.md.

Updated 20 September 2026. This page distinguishes delivered functionality from work that still needs evidence.

## Current status

The local application implements raw retention, constrained format parsers, source-mapping review, structural drift detection, replay, rollback, provenance and validated NDJSON export. On September 20 the interface was simplified around real uploads, review and export; sample records, sample controls, evaluation UI and simulated responses were removed. The visible workspace refreshes every 10 seconds. Direct collection from devices is still future work. See the updated verification report for current checks. Real vendor coverage, full OCSF conformance and a measured 10x advantage are not established.

## Build priorities

September 20 checkpoint: initial FortiGate/pfSense/Suricata profiles and event-specific field requirements are implemented with 150 pinned public reference records kept outside the UI. Four records remain unsupported in the initial development check. The pre-model checkpoint was committed and pushed. A field-mapping classifier was then trained on the AMD RX 6500M with DirectML and integrated behind the review gate. A dedicated Free Supabase project is connected, with a migrated server-only table and a verified cloud round trip; SUPABASE.md records the details. Full vendor coverage, independent field validation and live collection remain incomplete.

| Priority | Work remaining | Evidence needed to call it done |
| --- | --- | --- |
| 1 | Add and verify FortiGate traffic, pfSense filterlog, and Suricata event adapters | Source samples and documented expected meanings pass independent field checks; unsupported event types are explicit |
| Delivered | Event-specific schema requirements and initial GPU field model | Semantic regression checks pass; model evidence and authored holdout limits are in MODEL_CARD.md |
| 1 | Add pinned OCSF export and schema validation | Validate against the selected release and event classes; preserve raw/unmapped data |
| 2 | Add one live local ingestion path | File tail or TCP syslog feeds the app, handles incomplete records, survives restart and accounts for retained/rejected input |
| 2 | Strengthen drift and malformed-input validation | Exercise real field/version variation, escaped values, arrays, timestamps, optional fields and same-shaped semantic changes |
| 2 | Run an independent benchmark | Separate development and evaluation source/version sets; measure field correctness, coverage, review time and durable replay/ingest throughput |
| 2 | Complete packaging and submission artifacts | Verify offline startup on a clean target machine; produce the two-page architecture PDF, five slides, two-minute video and source repository |
| 2 | Expand model evaluation beyond authored names | Independently labeled vendor/device holdouts and measured reviewer effort; no automatic promotion of unverified output |
| Later production | Distributed ingest, storage/retention, access control and evidence trust anchors | End-to-end durability, capacity and operational validation; a laptop demo cannot establish these properties |

Broad multirow CSV and complete vendor/CEF/Syslog grammar support remain incomplete. The existing app supports only documented subsets. A small local field classifier is implemented; autonomous parser generation and an LLM are not.

## Free starter data

### FortiGate

- [Elastic's FortiGate sample collection](https://github.com/elastic/integrations/tree/main/packages/fortinet_fortigate/data_stream/log/_dev/test/pipeline)
- [Specific FortiOS 7.4 test log](https://github.com/elastic/integrations/blob/main/packages/fortinet_fortigate/data_stream/log/_dev/test/pipeline/test-fortinet-7-4.log)

The directory contains version-specific raw logs and companion expected JSON files. Use the raw logs as input and the companion files as comparison material, with vendor documentation resolving semantic questions. The 7.4-named file currently has 82 lines; obtain diverse examples across files instead of duplicating lines to reach a numeric target. Its mixed event types must not all be treated as firewall traffic.

### pfSense

- [Elastic's pfSense sample collection](https://github.com/elastic/integrations/tree/main/packages/pfsense/data_stream/log/_dev/test/pipeline)
- [Netgate's raw filterlog format](https://docs.netgate.com/pfsense/en/latest/monitoring/logs/raw-filter-format.html)

Start with `test-pfsense-bsd.log` and `test-pfsense-syslog.log`, plus their expected JSON companions. Focus initial coverage on filterlog traffic, not every VPN/DHCP/service log in the collection. The documented firewall payload is positional CSV whose fields depend on IP version and protocol; the current header-plus-one-row CSV parser is insufficient.

### Suricata

- [Official EVE format and examples](https://docs.suricata.io/en/latest/output/eve/eve-json-format.html)
- [Official Suricata verification repository](https://github.com/OISF/suricata-verify)

Start with the documented alert/flow examples. The verification repository provides configurations and test inputs for generating and checking output; it is not a promise of a single ready-to-download EVE dataset. For a larger corpus, generate `eve.json` from a controlled lab capture using a pinned Suricata version and configuration.

Important semantic requirement: the EVE documentation states that an alert's action does not necessarily describe the final packet/flow verdict. Preserve that distinction. Similarly, a passive connection record must not acquire a fabricated firewall allow/deny value merely to satisfy the current demo schema.

These are public documentation and integration-test fixtures, not independently sampled production deployments. Keep their attribution and version/commit references. Logs used to tune adapters must not also be advertised as unseen benchmark data. 150 raw records plus companion expected outputs and license material are now pinned under datasets/public/; they are not injected into the application.

## What to collect

A useful initial target is 100–500 diverse records from each of three source families, approximately 300–1,500 total, with available smaller public examples used first. Diversity matters more than repeated volume.

For each source, retain the original `.log`/`.json`/`.txt` file, product/version, event type, source URL or authorized lab provenance, and documentation of timestamps and field meanings. Add expected labels for at least 20 representative records: record ID, event type, source and destination addresses, ports when present, timestamp and units/timezone, action/verdict when established, and intentionally unavailable fields. A reviewer should verify labels independently of the new adapter.

Author separate mutation fixtures for renames, missing fields, optional additions, invalid ports, duplicate keys, unknown action values, nested content, and broken records. Mark them synthetic. Preserve original data separately.

No attack/benign labels, model-training GPU, paid API or enormous intrusion-detection dataset is required to begin this normalization work.

## Inputs that need the user or a domain contact

1. Submission deadline and the current official PS/rubric from the SIH portal or college SPOC. The research tool could not retrieve the official 2026 portal in the initial analysis.
2. Confirm a submission deadline and whether another evaluation machine must be supported. Current development hardware is Windows, 16 GB RAM and an AMD RX 6500M with 4 GB graphics memory.
3. Optional: an authorized, sanitized sample from a college firewall/network lab, with product/version and an IT/lab reviewer who can confirm field meanings. Consistent anonymization should preserve field structure and relationships; remove secrets and unnecessary personal content.

Public sample collection, adapter implementation, labels drafted from manuals, synthetic mutation generation, schema validation and benchmarking can be handled within the project. A domain reviewer provides stronger independent confirmation but is not required to continue from public examples.
