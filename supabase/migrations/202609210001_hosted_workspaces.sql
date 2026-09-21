-- Complete hosted workspaces; independent from the optional local export table.
create table public.traceweave_workspaces (
  owner_id uuid primary key references auth.users(id) on delete cascade,
  revision bigint not null check (revision > 0),
  snapshot jsonb not null check (jsonb_typeof(snapshot) = 'object'),
  updated_at timestamptz not null default now(),
  check (octet_length(snapshot::text) <= 8388608)
);
alter table public.traceweave_workspaces enable row level security;
revoke all on public.traceweave_workspaces from public, anon, authenticated;
grant select on public.traceweave_workspaces to authenticated;
create policy own_workspace on public.traceweave_workspaces for select to authenticated
  using ((select auth.uid()) = owner_id);

create function public.traceweave_save(expected_revision bigint, new_snapshot jsonb)
returns bigint language plpgsql security definer set search_path = '' as $$
declare
  caller uuid := auth.uid();
  current_revision bigint;
  total_bytes bigint;
begin
  if caller is null then raise exception 'Authentication required'; end if;
  if new_snapshot is null or jsonb_typeof(new_snapshot) <> 'object'
     or octet_length(new_snapshot::text) > 8388608 then
    raise exception 'Workspace size limit';
  end if;
  -- Serialize quota accounting and CAS, including simultaneous first saves.
  perform pg_catalog.pg_advisory_xact_lock(874219621);
  select revision into current_revision from public.traceweave_workspaces where owner_id = caller;
  if coalesce(current_revision, 0) <> expected_revision then
    raise exception using errcode = '40001', message = 'Workspace changed; refresh before retrying';
  end if;
  select coalesce(sum(octet_length(snapshot::text)),0) into total_bytes
    from public.traceweave_workspaces where owner_id <> caller;
  if total_bytes + octet_length(new_snapshot::text) > 134217728 then
    raise exception 'Hosted storage capacity reached';
  end if;
  insert into public.traceweave_workspaces(owner_id, revision, snapshot)
    values(caller, expected_revision + 1, new_snapshot)
    on conflict(owner_id) do update set revision = excluded.revision,
      snapshot = excluded.snapshot, updated_at = now();
  return expected_revision + 1;
end;
$$;
revoke all on function public.traceweave_save(bigint,jsonb) from public, anon;
grant execute on function public.traceweave_save(bigint,jsonb) to authenticated;
