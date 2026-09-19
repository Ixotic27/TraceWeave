# Documentation and changelog protocol

Every architectural decision, requirement pivot, dependency change, benchmark-method change, or scope change must update the corresponding documentation in the same work session as the implementation. This protocol is for future work in this project; it is not an autonomous scheduled task.

## Automatic recording

`run.ps1` starts the application with `--watch-docs`. The watcher hashes source files and Markdown documentation every two seconds. When content changes, it appends an ISO-8601 UTC entry to `docs/CHANGELOG.md`, listing added, modified, and removed paths. Prior entries are retained. Hash state lives in `data/documentation_state.json`.

For a standalone watcher:

```powershell
python scripts/changelog.py --watch
```

For a deliberate milestone:

```powershell
python scripts/changelog.py --reason "ADR-008: add a pinned OCSF adapter and update schema validation"
```

Run only one watcher per workspace. Changes are noticed at the next polling interval; very brief intermediate states between polls may be coalesced. This is a local development record, not a signed or tamper-proof audit system. Starting without `--watch-docs` does not start automatic tracking.

The watcher excludes original user attachments, ingested device logs, database contents, generated evidence JSON, and its own changelog. Those exclusions prevent disclosure and recursive logging. Record intentional changes to benchmark methodology in the tracked script and decision document; retain generated results in `docs/evidence/`.

## Required authored decision entry

Automatic file detection cannot reliably infer *why* an architecture changed. For a semantic decision, add the next `ADR-NNN` entry to `docs/DECISIONS.md` with:

- Date and status: proposed, implemented, superseded, or rejected.
- Trigger and evidence, including the user instruction if it changed scope.
- Decision and alternatives considered.
- Impact on requirements, data, dependencies, interface, cost and migration.
- Validation performed, failures and remaining limits.
- Link to the superseding entry if a previous decision changed.

Then update `PROBLEM_STATEMENT.md`, `ARCHITECTURE.md`, `RESOURCE_MANIFEST.md`, and `README.md` only where affected. Never silently turn a target into a measured result, a proposed component into an implemented component, or synthetic data into external validation.

## Milestone completion

1. Update code and affected requirement/architecture text together.
2. Run relevant tests. Re-run benchmarks only when implementation or measurement assumptions changed.
3. Save reproducible results and summarize them in `VERIFICATION.md`.
4. Record the milestone rationale using the command above if the watcher has not already captured the file changes. If it has, the ADR remains the semantic source of truth.
5. Before submission, check official requirements, exported architecture page count, video duration, slide count, setup on the target machine, and actual offline installation. A local prototype is not a submitted competition entry.
