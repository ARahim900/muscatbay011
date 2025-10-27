import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mtkgpoeaukfmndncfxts.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10a2dwb2VhdWtmbW5kbmNmeHRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0MjQ1MDcsImV4cCI6MjA3NjAwMDUwN30.vevUqgoXO4ChJvOt4j8D_4V4H3ZRmf0XG6p9p9fJHFQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);