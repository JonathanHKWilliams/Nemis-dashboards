import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// If env vars are missing (no .env file yet), export a dummy client
// so the rest of the app loads fine and falls back to localStorage.
export const supabase = url && key
  ? createClient(url, key)
  : null

/*
  ── Supabase setup ────────────────────────────────────────────────────────────
  1. Copy .env.example → .env  and fill in your Supabase URL + anon key.
  2. Run supabase/system_ui_config.sql in your Supabase SQL Editor.
  ─────────────────────────────────────────────────────────────────────────────
*/
