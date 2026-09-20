# Verification report

Updated: 20 September 2026 (Asia/Calcutta). Runtime: Python 3.12.14 on Windows. These are local behavior checks, not production certification.

## Current interface migration

The current UI starts empty, exposes no sample-loading or benchmark controls, and has no simulated API fallback. `web/demo-data.js` was removed. A case-insensitive scan of `web/` for SIH, prototype, demo, mock, fixture and benchmark returns no matches.

**36 tests passed** with `python -m unittest discover -s tests -v`: 24 engine checks, 10 HTTP integration checks, and two sample-cleanup checks. JavaScript syntax validation (`node --check web/app.js`) and `git diff --check` also passed. Added coverage includes actual upload/review/export/source reuse; pretty JSON, XML, one-row CSV and NDJSON framing; duplicate JSON retention; base64 file bytes with CRLF; comma-containing KV values; invalid record modes; removed runtime endpoints; exact-match cleanup, restorable backup, unrelated-data preservation and idempotence.

Cleanup tests initially failed because Python's restrictive temporary-directory permissions were incompatible with this Windows sandbox. They now create unique, normally inherited directories under `data/cleanup-tests/` and verify the resolved parent before cleanup. No tests require broader machine permissions.

The migration removed 15 exact known sample records from `data/traceweave.sqlite3`, leaving zero active records. The complete pre-migration database was backed up to `data/archives/before-sample-removal-20260919T204428385097Z.sqlite3`. Main-workspace tests do not inject new records.

Browser verification used a separate server on port 8766 with an in-memory database:

- Empty workspace, disabled export and initial three-step instructions.
- Missing-file validation stays in the Add logs dialog and preserves the entered source name.
- Pasted two logs; both appeared as Needs review, with the source selected.
- Reviewed suggested meanings and saved field settings; both logs became Ready to export. Sources showed the correct counts and Activity showed the saved version.
- Original-byte check and export actions completed. An independent API check later confirmed 29 exported records, all validated, while an unsupported 30th record was excluded.
- Added further records through the local API and observed the page automatically update to 30 total / 29 ready / 1 unable to process, without a manual refresh.
- Verified pagination (25 per page), search with no matches, Clear filters, and the Couldn't process status filter.
- Opened the unsupported log and confirmed an actionable explanation and access to retained originals.
- Stopped only the isolated test server; the UI showed Server unavailable, explicitly identified the last received records as stale and disabled upload/export actions.

The 1,265-pixel desktop layout was visually reviewed; current screenshots are retained separately from the older preview. Responsive CSS is included, but mobile viewport behavior and the operating-system file picker/drag-drop interaction have not been independently exercised. The file ingestion API and byte round trip were tested. No new throughput or ML accuracy claim is made.

The following sections retain the initial implementation evidence from September 19. Their sample-data UI describes the earlier version, not the current application.

## Earlier automated behavior checks (September 19)

Command: `python -m unittest discover -s tests -v`

Result: **29 tests passed**: 24 engine checks and five HTTP integration checks. The suite covers all documented demo formats, exact-byte retention, binary input, duplicate fields, invalid ports/actions/types, timezone ambiguity, nested JSON selector collisions, source isolation, contract validation, drift/replay, rollback, persistence, evidence corruption detection, static assets, validated export, and rejection of cross-origin/non-JSON mutations.

The HTTP tests launch their own ephemeral local server with an in-memory database. Their synthetic data does not affect the user's demonstration database. An initial test discovered that the startup message printed the requested port (`0`) instead of the assigned port; that was corrected. A persistence test initially encountered the environment's restricted temporary directory; it now uses a unique file under the workspace and removes that file after the check.

## Synthetic evaluation

Reproduction command: `python scripts/benchmark.py`. Recorded output: [benchmark.json](evidence/benchmark.json).

| Measurement | Recorded result |
| --- | ---: |
| Evaluation records | 240 |
| Correct valid records with fixed aliases | 120 |
| Correct valid records before TraceWeave review | 120 |
| Correct valid records after one supplied mapping | 240 |
| Renamed-field records replayed | 120 |
| Invalid fixtures exported | 0 of 4 |
| Original-byte integrity checks | 1,252 of 1,252 |
| Replay computation for 120 records | 63.21 ms |
| In-memory ingest microbenchmark | 2,235.7 events/second |
| Microbenchmark median / p95 event time | 0.388 / 0.946 ms |

These are one-run local timings on authored synthetic data. The throughput microbenchmark contains 1,000 repeated fixtures and excludes durable disk I/O. No human review time, independent vendor holdout, production-scale durability, commercial comparison, or statistical generalization was measured. The post-review comparison includes an explicit source-field mapping that the fixed baseline did not receive; it demonstrates recovery, not stronger autonomous inference.

## Browser checks

The local application was opened and exercised in the Codex in-app browser:

- Loaded eight reviewed synthetic events across seven format families.
- Injected a source-field rename and observed two events requiring review.
- Opened the evidence dialog, reviewed original content and candidate fields, selected `origin → src_ip`, and replayed both events successfully.
- Injected four adversarial records; the UI reported four quarantined records.
- Verified all 14 demo records against their original hashes.
- Imported an additional synthetic custom record through the text form; it remained a new source requiring mapping review.
- Reviewed layout at the default 1,265-pixel viewport. Document width also measured 1,265 pixels, so there was no page-level horizontal overflow. The responsive CSS exists; mobile breakpoints were not separately verified.
- Browser console inspection returned no captured errors or warnings. A screenshot is retained as [preview.png](evidence/preview.png).

Browser interaction validated the application workflow, while HTTP tests independently checked NDJSON export content. The file-picker upload and byte-download UI controls were not separately exercised; byte round trips and base64 retention are covered by the engine tests.

## Launch and documentation tracking

The native `run.ps1` launcher was executed successfully. It starts the application with `--watch-docs`, which appends tracked source/document changes automatically. The initial milestone was recorded with explicit rationale. The watcher automatically appended the addition of this report to CHANGELOG.md; that entry was read back and confirmed. A restart retained the 15 browser-demo records, and the contracts, decision-history and evaluation views opened successfully.

No paid service, external runtime API, model, GPU or package installation was required. The Docker recipe was not built. The application remains a local single-user prototype with the limits described in README.md.

## Research and input checks

The workbook was extracted read-only with exact cell addresses, and both input files were hashed. The seven-row image was visually inspected and transcribed. The official 2026 portal could not be retrieved; historical rubric snippets and mirror snapshots are not treated as a verified current rubric. Existing product capabilities are linked in the selection report. Final SHA-256 comparisons confirmed that both original attachments were unchanged. All relative links in the delivered Markdown documents resolved to existing local files.
