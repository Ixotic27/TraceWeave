-- Only the local server's secret/service_role key may use this table.
create table public.traceweave_revisions (
  workspace_id uuid not null,
  event_id bigint not null check (event_id > 0),
  revision integer not null check (revision > 0),
  source text not null check (length(source) between 1 and 100),
  raw_sha256 text not null check (raw_sha256 ~ '^[0-9a-f]{64}$'),
  payload jsonb not null check (
    jsonb_typeof(payload) = 'object'
    and payload ? 'status' and payload ->> 'status' = 'normalized'
    and payload ? 'raw_base64' and payload ? 'raw_sha256'
    and payload ->> 'raw_sha256' = raw_sha256
  ),
  received_at timestamptz not null default now(),
  primary key (workspace_id, event_id, revision)
);
alter table public.traceweave_revisions enable row level security;
revoke all on public.traceweave_revisions from public, anon, authenticated;
revoke all on public.traceweave_revisions from service_role;
grant select, insert on public.traceweave_revisions to service_role;
-- No browser policies; no UPDATE or DELETE grants. Retries ignore duplicate keys.
comment on table public.traceweave_revisions is
  'Reviewed TraceWeave revisions with retained original bytes; server-only optional export.';
