import { createClient } from '@supabase/supabase-js';

type EnvRecord = Record<string, string | undefined>;

const env = (import.meta.env ?? {}) as EnvRecord;

const supabaseUrl =
  env.VITE_SUPABASE_URL ||
  env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://mtkgpoeaukfmndncfxts.supabase.co';

const supabaseAnonKey =
  env.VITE_SUPABASE_ANON_KEY ||
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10a2dwb2VhdWtmbW5kbmNmeHRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0MjQ1MDcsImV4cCI6MjA3NjAwMDUwN30.vevUqgoXO4ChJvOt4j8D_4V4H3ZRmf0XG6p9p9fJHFQ';

if (!env.VITE_SUPABASE_URL && !env.NEXT_PUBLIC_SUPABASE_URL) {
  console.warn(
    'Supabase URL not found in environment variables. Falling back to the default project URL.'
  );
}

if (!env.VITE_SUPABASE_ANON_KEY && !env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn(
    'Supabase anon key not found in environment variables. Falling back to the default anon key.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
