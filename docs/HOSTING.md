# TraceWeave online

Deployed 21 September 2026: https://traceweave.onrender.com

- Render service: `srv-daokffrtqb8s73fn4340`, Singapore, **Free**.
- Supabase project: `dlyxamexvbewnniwaime`, existing **Free** organization.
- Render reported the initial deployment live; the public sign-in page loaded
  without browser errors. The Auth Site URL now points to the live HTTPS address.
- Authenticated upload/save on the live service still needs the owner's first
  account sign-in. No sample records or user accounts were seeded for deployment.

Render Free runs the website, parser and saved GPU-trained field model. Supabase
Free provides authentication and durable private workspaces. No local server or
paid model API is needed. Training remains GPU-only on the development laptop;
online inference uses the small JSON weights on Render's CPU.

## Deployment

1. Apply `supabase/migrations` to the dedicated TraceWeave project.
2. Deploy `main` with `render.yaml`, explicitly keeping the **Free** instance.
3. Set `SUPABASE_PUBLIC_KEY` to the project's publishable/anon key. No service
   secret or database password is required on Render. `SUPABASE_URL` is in the
   blueprint; Render supplies `PORT` and `RENDER_EXTERNAL_HOSTNAME`.
4. Set Supabase Auth's Site URL to the resulting HTTPS Render address.
5. Create an account, confirm the email, and sign in. Supabase's default email
   service restricts delivery to project team addresses; broader registration
   requires an email provider. Until configured, this is an owner-access service.

## Storage and security

Each authenticated Supabase user owns one workspace. RLS permits only their row.
The save RPC derives ownership from `auth.uid()`, never browser input. It commits
the complete snapshot with a compare-and-swap revision. Originals (base64), all
result revisions, source contracts, activity, and recent operation receipts are
retained. A success response is sent only after Supabase accepts the save.

The server uses request-local in-memory SQLite engines; Render's ephemeral disk
is never primary storage. The bounded cache stores serialized snapshots and
checks their remote revision on reads. Restarts and deployments reconstruct from
Supabase. Conflicting saves fail with a refresh message. The most recent 256
operation IDs are persisted for replay deduplication; API clients must reuse
their ID for retries. The website never automatically resubmits an uncertain
upload and tells users to refresh before retrying.

Supabase validates the login token on each request. The token is in a Secure,
HttpOnly, SameSite=Strict cookie, expires after at most one hour, and is never
returned to JavaScript. Sign-out clears it; users sign in again after expiration.
POST requires the exact HTTPS Origin and Host. No passwords, keys, or log content
are printed in request logs. Local `python -m traceweave.server` remains isolated
on loopback with optional explicit cloud export; existing local logs are never
copied into the online service automatically.

## Free-service limits

- 1,000 logs per workspace; 2 MB per upload; 8 MB of complete workspace history.
- 128 MB aggregate logical workspace storage, leaving headroom in Supabase Free.
- Four simultaneous server requests; 16 MB snapshot cache. This is bounded file
  ingestion and review, not billion-event production throughput.
- Free Render sleeps when idle; the first visit can take time to wake up.
- Free Supabase quotas and inactivity policies apply. Export important records
  regularly; application persistence is not an independent disaster backup.
- No automatic GPU retraining, live syslog listener, shared workspace editing,
  or self-service password recovery UI in this release.

Primary references: [Render Free](https://render.com/docs/free),
[Render blueprint](https://render.com/docs/blueprint-spec),
[Supabase Auth](https://supabase.com/docs/guides/auth/passwords),
[Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security).
