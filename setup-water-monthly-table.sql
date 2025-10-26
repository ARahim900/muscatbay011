-- Create Water_System table for water consumption data
CREATE TABLE IF NOT EXISTS public."Water_System" (
    id SERIAL PRIMARY KEY,
    meter_label TEXT NOT NULL,
    acct_number TEXT,
    label TEXT,
    zone TEXT,
    parent_meter TEXT,
    type TEXT,
    jan_25 NUMERIC,
    feb_25 NUMERIC,
    mar_25 NUMERIC,
    apr_25 NUMERIC,
    may_25 NUMERIC,
    jun_25 NUMERIC,
    jul_25 NUMERIC,
    aug_25 NUMERIC,
    sep_25 NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_water_system_zone ON public."Water_System"(zone);
CREATE INDEX IF NOT EXISTS idx_water_system_type ON public."Water_System"(type);
CREATE INDEX IF NOT EXISTS idx_water_system_meter_label ON public."Water_System"(meter_label);

-- Enable Row Level Security
ALTER TABLE public."Water_System" ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (adjust as needed for your security requirements)
CREATE POLICY "Allow public read access" ON public."Water_System"
    FOR SELECT
    USING (true);

-- Optional: Add policy for authenticated writes if needed
-- CREATE POLICY "Allow authenticated insert" ON public."Water_System"
--     FOR INSERT
--     WITH CHECK (auth.role() = 'authenticated');

COMMENT ON TABLE public."Water_System" IS 'Water consumption monthly data for all meters';
COMMENT ON COLUMN public."Water_System".meter_label IS 'Unique meter identifier';
COMMENT ON COLUMN public."Water_System".zone IS 'Zone designation (e.g., Zone_03_A, Zone_05)';
COMMENT ON COLUMN public."Water_System".type IS 'Meter type (e.g., Residential (Villa), D_Building_Common, etc.)';
