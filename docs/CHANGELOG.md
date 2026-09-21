# Changelog

Changes are appended automatically. Architecture rationale is maintained in DECISIONS.md.

## 2026-09-21

Simplified the hosted workspace navigation and public-facing account experience.

- Removed the Connections navigation page and its manual cloud-export controls from the UI; hosted persistence continues through the authenticated workspace flow.
- Removed the storage/status card and redundant hosting copy from the workspace shell.
- Replaced ambiguous status glyphs with accessible outline icons.
- Added public `web/privacy.html` and `web/terms.html` pages and linked them from the workspace footer.
- Extended local and hosted static routing for the legal pages.
- Added a hosted session preload state to prevent authentication view flicker on refresh.
- Renamed the top-right connection indicator to a plain status label and replaced the refresh glyph with an outline icon.

## 2026-09-19T15:44:20.880561+00:00

Initial delivery: analyzed seven challenges, selected SIH26156, built and tested the free local prototype; see ADR-001 through ADR-007

- Added: `Dockerfile`
- Added: `docs/ARCHITECTURE.md`
- Added: `docs/DECISIONS.md`
- Added: `docs/PROBLEM_STATEMENT.md`
- Added: `docs/RESOURCE_MANIFEST.md`
- Added: `docs/WORKFLOW.md`
- Added: `README.md`
- Added: `run.ps1`
- Added: `scripts/benchmark.py`
- Added: `scripts/changelog.py`
- Added: `scripts/inspect_inputs.py`
- Added: `tests/test_engine.py`
- Added: `tests/test_server.py`
- Added: `traceweave/__init__.py`
- Added: `traceweave/engine.py`
- Added: `traceweave/fixtures.py`
- Added: `traceweave/server.py`
- Added: `web/app.js`
- Added: `web/index.html`
- Added: `web/style.css`

## 2026-09-19T15:45:49.981463+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Added: `docs/VERIFICATION.md`

## 2026-09-19T15:46:40.323080+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Modified: `docs/VERIFICATION.md`

## 2026-09-19T15:55:17.439072+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Added: `docs/NEXT_STEPS.md`

## 2026-09-19T15:55:18.495997+00:00

Clarified remaining work and verified free vendor-log sources in NEXT_STEPS.md; no runtime changes or new benchmark claims

- Modified: `docs/RESOURCE_MANIFEST.md`

## 2026-09-19T16:23:24.536494+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Added: `web/demo-data.js`

## 2026-09-19T16:23:40.642801+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Modified: `traceweave/server.py`

## 2026-09-19T16:23:52.731382+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Modified: `web/index.html`

## 2026-09-19T16:24:06.832622+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Modified: `web/app.js`

## 2026-09-19T16:24:18.916951+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Modified: `web/app.js`

## 2026-09-19T16:24:45.100241+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Modified: `README.md`

## 2026-09-19T20:44:29.537240+00:00

Development server started; automatic file-change tracking enabled

- Added: `scripts/remove_sample_data.py`
- Added: `tests/test_cleanup.py`
- Modified: `tests/test_server.py`
- Modified: `traceweave/server.py`
- Modified: `web/app.js`
- Modified: `web/index.html`
- Modified: `web/style.css`
- Removed: `web/demo-data.js`

## 2026-09-19T20:47:02.467144+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Modified: `tests/test_server.py`
- Modified: `traceweave/server.py`

## 2026-09-19T20:48:28.993252+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Modified: `README.md`

## 2026-09-19T20:48:31.014195+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Modified: `docs/ARCHITECTURE.md`
- Modified: `docs/DECISIONS.md`
- Modified: `docs/NEXT_STEPS.md`
- Modified: `docs/RESOURCE_MANIFEST.md`

## 2026-09-19T20:49:41.436205+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Modified: `web/app.js`
- Modified: `web/index.html`

## 2026-09-19T20:51:07.960013+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Modified: `docs/VERIFICATION.md`

## 2026-09-19T20:55:24.232143+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Added: `scripts/fetch_public_logs.py`

## 2026-09-19T20:58:59.538755+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Added: `traceweave/adapters.py`

## 2026-09-19T20:59:01.557243+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Modified: `traceweave/engine.py`

## 2026-09-19T21:00:05.980312+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Added: `scripts/install_supabase_cli.py`

## 2026-09-20T05:18:03.434470+00:00

Development server started; automatic file-change tracking enabled

- Modified: `docs/DECISIONS.md`
- Added: `docs/MODEL_CARD.md`
- Modified: `docs/NEXT_STEPS.md`
- Modified: `docs/RESOURCE_MANIFEST.md`
- Modified: `README.md`
- Added: `scripts/build_mapping_dataset.py`
- Modified: `scripts/fetch_public_logs.py`
- Added: `scripts/train_field_mapper_gpu.py`
- Added: `tests/test_adapters.py`
- Added: `tests/test_learning.py`
- Modified: `traceweave/engine.py`
- Added: `traceweave/learning.py`
- Modified: `traceweave/server.py`
- Modified: `web/app.js`
- Modified: `web/index.html`
- Modified: `web/style.css`

## 2026-09-20T05:23:48.399112+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Modified: `scripts/install_supabase_cli.py`

## 2026-09-20T05:23:50.418489+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Modified: `Dockerfile`

## 2026-09-20T05:28:08.444229+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Modified: `traceweave/engine.py`
- Modified: `traceweave/learning.py`

## 2026-09-20T05:30:01.435451+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Added: `traceweave/cloud.py`

## 2026-09-20T05:30:03.464825+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Modified: `traceweave/server.py`

## 2026-09-20T05:31:38.286314+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Modified: `traceweave/cloud.py`
- Modified: `web/app.js`
- Modified: `web/index.html`

## 2026-09-20T05:31:40.307504+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Modified: `web/style.css`

## 2026-09-20T05:32:58.941332+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Added: `tests/test_cloud.py`
- Modified: `tests/test_server.py`

## 2026-09-20T16:25:43.940933+00:00

Development server started; automatic file-change tracking enabled

- Added: `datasets/model/field_labels.json`
- Added: `docs/SUPABASE.md`
- Added: `models/field_mapper.json`
- Added: `requirements-gpu-lock.txt`
- Added: `requirements-gpu.txt`
- Modified: `scripts/changelog.py`
- Added: `scripts/supabase.ps1`
- Added: `supabase/config.toml`
- Added: `supabase/migrations/202609200001_traceweave_revisions.sql`
- Modified: `web/app.js`

## 2026-09-20T16:28:45.979096+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Modified: `docs/ARCHITECTURE.md`
- Modified: `docs/RESOURCE_MANIFEST.md`

## 2026-09-20T16:28:48.005332+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Modified: `docs/VERIFICATION.md`
- Modified: `README.md`

## 2026-09-20T16:31:45.923543+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Modified: `tests/test_server.py`

## 2026-09-20T16:32:26.383585+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Modified: `docs/DECISIONS.md`
- Modified: `docs/NEXT_STEPS.md`

## 2026-09-20T16:34:47.940066+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Added: `scripts/verify_cloud.py`

## 2026-09-20T16:36:18.902106+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Modified: `scripts/verify_cloud.py`

## 2026-09-20T16:38:00.026520+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Modified: `scripts/verify_cloud.py`

## 2026-09-20T16:39:50.340881+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Modified: `docs/NEXT_STEPS.md`
- Modified: `docs/SUPABASE.md`
- Modified: `docs/VERIFICATION.md`

## 2026-09-20T16:41:49.745107+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Added: `scripts/build_architecture_pdf.py`

## 2026-09-20T16:43:02.615625+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Modified: `scripts/build_architecture_pdf.py`

## 2026-09-20T16:43:04.652592+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Modified: `docs/ARCHITECTURE.md`
- Modified: `README.md`

## 2026-09-20T16:43:06.680967+00:00

Automatic file-change snapshot; semantic rationale belongs in docs/DECISIONS.md

- Modified: `docs/VERIFICATION.md`

## 2026-09-21T15:04:42.786818+00:00

Add private hosted workspaces, durable Supabase storage, and Render Free deployment.

- Modified: `docs/ARCHITECTURE.md`
- Modified: `docs/DECISIONS.md`
- Added: `docs/HOSTING.md`
- Modified: `README.md`
- Added: `render.yaml`
- Modified: `scripts/changelog.py`
- Added: `supabase/migrations/202609210001_hosted_workspaces.sql`
- Added: `tests/test_hosted.py`
- Added: `traceweave/hosted.py`
- Modified: `traceweave/server.py`
- Modified: `web/app.js`
- Modified: `web/index.html`
- Modified: `web/style.css`

## 2026-09-21T15:08:39.316339+00:00

Record the live free Render URL, applied Supabase migration, and first-account onboarding limits.

- Modified: `docs/HOSTING.md`
- Modified: `docs/NEXT_STEPS.md`
- Modified: `docs/SUPABASE.md`
- Modified: `README.md`

## 2026-09-21T15:13:41.753572+00:00

Simplify product language; separate sign-in and registration views; report deployed model availability in startup logs.

- Modified: `docs/HOSTING.md`
- Modified: `traceweave/hosted.py`
- Modified: `web/app.js`
- Modified: `web/index.html`
- Modified: `web/style.css`
