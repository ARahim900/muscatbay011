-- Check if RLS is enabled on STP_Plant_Database
-- Run this in Supabase SQL Editor

-- 1. Check current RLS status
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public' AND tablename = 'STP_Plant_Database';

-- 2. If rowsecurity is TRUE, you need to either:
--    Option A: Disable RLS (simplest for development)
ALTER TABLE public."STP_Plant_Database" DISABLE ROW LEVEL SECURITY;

--    Option B: Or create a policy to allow public read access
-- CREATE POLICY "Enable read access for all users"
-- ON public."STP_Plant_Database"
-- FOR SELECT
-- USING (true);

-- 3. Verify you have data in the table
SELECT COUNT(*) as total_records FROM public."STP_Plant_Database";

-- 4. Show first 3 records to verify structure
SELECT * FROM public."STP_Plant_Database" LIMIT 3;
