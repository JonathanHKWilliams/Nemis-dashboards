-- ============================================================
--  NEMIS Dashboard — System UI Config
--  Table: system_ui_config
--
--  Stores the live-editable design tokens for the System UI
--  page (colors, fonts, status badges, role badges).
--
--  Run this once in your Supabase project → SQL Editor
-- ============================================================

-- 1. Create the table
create table if not exists system_ui_config (
  key        text        primary key,
  value      jsonb       not null,
  updated_at timestamptz not null default now()
);

-- 2. Auto-update the updated_at column on every row change
create or replace function update_system_ui_timestamp()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create or replace trigger trg_system_ui_updated_at
  before update on system_ui_config
  for each row
  execute procedure update_system_ui_timestamp();

-- 3. Enable Realtime (required for live cross-device updates)
alter publication supabase_realtime add table system_ui_config;

-- 4. Enable Row Level Security
alter table system_ui_config enable row level security;

-- 4. RLS Policies
--    Read is public (anyone can load the design tokens)
create policy "system_ui_public_read"
  on system_ui_config
  for select
  using (true);

--    Inserts are public (first-time save per key)
create policy "system_ui_public_insert"
  on system_ui_config
  for insert
  with check (true);

--    Updates are public (subsequent saves)
create policy "system_ui_public_update"
  on system_ui_config
  for update
  using (true);

-- ============================================================
--  Keys written by the app (src/pages/SystemUI.jsx)
-- ============================================================
--
--  key       │ description
--  ──────────┼──────────────────────────────────────────────
--  colors    │ Color group array  (brand, status, surface, text)
--  fonts     │ Font families array (Sora, Lato, Roboto samples)
--  status    │ Status badge array (Approved, Pending, Rejected …)
--  roles     │ Role badge array   (School Admin, Finance Manager …)
--
-- ============================================================
--  Seed rows (optional — lets the page load defaults from DB
--  even before the first edit is made in the UI)
-- ============================================================

insert into system_ui_config (key, value) values
  ('colors', 'null'::jsonb),
  ('fonts',  'null'::jsonb),
  ('status', 'null'::jsonb),
  ('roles',  'null'::jsonb)
on conflict (key) do nothing;

-- ============================================================
--  To reset everything back to code defaults, run:
--    delete from system_ui_config;
-- ============================================================
