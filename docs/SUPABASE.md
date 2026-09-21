# Optional Supabase export

Status on September 20, 2026: **connected and verified**. The official Windows CLI
**2.117.0** is installed under `.tools/supabase/` after SHA-256 verification. After
the user signed into the dashboard, its Free plan and available capacity were
verified. The CLI was authenticated to that account and created a dedicated
**TraceWeave** project (`dlyxamexvbewnniwaime`, Mumbai / `ap-south-1`, Nano compute).
The migration was previewed and applied; credentials are in ignored local `.env`.
Other projects were not changed. Cloud export is configured but never automatic.

An isolated, authored record completed a real cloud round trip with original-byte
verification. A retry after a deliberately lost local receipt produced only one
remote revision. The valid public key could not read or insert table rows; the
server key could not update or delete them. Database inspection confirmed RLS and
the intended grants. All temporary verification rows were removed, and the main
local workspace remains empty. Evidence: `evidence/cloud-verification.json`.

The [Supabase free plan](https://supabase.com/docs/guides/platform/billing-on-supabase)
allows two active free projects across owned/administered organizations. Paused
projects do not count. Do not upgrade, pause another app, delete a project, or
reuse another app's database without the user's direction. The initial saved CLI
account differed from the user's dashboard account; aligning the login resolved
the apparent lack of free capacity. No paid upgrade was made.

## What is implemented

- Local SQLite remains the primary store. Cloud export is off by default, and
  uploads, AI suggestions, review, replay and NDJSON export require no network.
- The hosted workspace uses the authenticated Supabase project for its own
  workspace snapshots. The hosted UI does not expose a separate connection
  screen.
- An explicit **Send ready logs to Supabase** action sends at most 100 reviewed
  records and 1.5 MB per request, including original bytes, lineage and unmapped
  fields. The UI identifies this scope and requires the original-content choice.
- Local receipts advance only after success. Remote composite keys and
  `resolution=ignore-duplicates` make uncertain-response retries idempotent.
  Updated interpretations create new revisions; old cloud copies remain.
- This is a reviewed-record export, not a backup/restore service. Unreviewed logs,
  full local audit history and contract tables are not synchronized. There is no
  cloud login, browser database access, realtime collaboration or remote restore.

## Reconnect on another machine

1. Use the existing dedicated **TraceWeave** project, or create another only after
   confirming free capacity. Keep database passwords out of chat and Git.
2. Use `scripts/supabase.ps1 link --project-ref <ref>` and
   `scripts/supabase.ps1 db push --dry-run`, inspect the migration, then
   `scripts/supabase.ps1 db push`. Do not run a database reset on an existing app.
3. Copy `.env.example` to ignored `.env`. Set `SUPABASE_URL` to that project's
   HTTPS URL and `SUPABASE_SECRET_KEY` to a server secret key. Legacy service-role
   JWTs are supported. Never use a publishable/anonymous key for this table.
   Set `TRACEWEAVE_CLOUD_ENABLED=1` and restart `run.ps1`.
4. For the local server’s optional export path, use the documented API/configuration
   directly. The hosted workspace saves its own signed-in snapshots automatically.

Use `TRACEWEAVE_CLOUD_ENABLED=0` for air-gapped operation. Merely adding a project
URL does not enable export. The `.env` reader handles simple `KEY=value` lines
only; process environment values take precedence. The app only accepts standard
`https://<20-character-project-ref>.supabase.co` destinations. Custom domains and
local Supabase endpoints are intentionally not supported yet.

## Security and validation

The migration enables RLS, revokes access from public/anon/authenticated roles,
and grants the server role only SELECT and INSERT on the dedicated table. No
anonymous browser policy is created. Secret keys remain server-side; redirects
are refused and errors exclude remote bodies/credentials. This follows
[Supabase's API access guidance](https://supabase.com/docs/guides/api/securing-your-api)
and [key guidance](https://supabase.com/docs/guides/api/api-keys).

Automated transport tests cover review gating, explicit original-content selection,
retention, bounded batches, safe retries, failure receipts, disabled operation,
destination validation and redirect rejection. They use a controlled transport,
not a real cloud database. Separate opt-in verification against the real dedicated
project passed, including access controls, byte retention, retries and exact
cleanup. Reproduce with `python scripts/verify_cloud.py --project-ref
dlyxamexvbewnniwaime`; this creates and removes only its own temporary workspace.

On this computer, the CLI initially could not validate the HTTPS certificate
chain. A public CA bundle exported from the Windows trust store under ignored
`.tools/` resolved that issue through `NODE_EXTRA_CA_CERTS`. TLS validation was
never disabled. The PowerShell wrapper uses that bundle when present.
# Hosted workspace addition — 21 September 2026

The dedicated project also stores complete online workspaces for
https://traceweave.onrender.com. Migration `202609210001_hosted_workspaces.sql`
was applied: authenticated users can read only their own workspace, while saves
use an owner-scoped atomic RPC. Render uses the publishable key and user token;
it has no service-role key or database password. The sections below describe the
separate, optional export connection used by the offline app. See HOSTING.md.
