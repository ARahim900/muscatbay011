# Water Module Backend Setup - Supabase Integration

## Overview
This document describes the Supabase backend setup for the Water Module monthly consumption dashboard.

## Files Created

### 1. Database Schema
**File:** `setup-water-monthly-table.sql`
- Creates `Water_System` table with all monthly columns (Jan-25 to Sep-25)
- Includes indexes for zone, type, and meter_label for optimal query performance
- Enables Row Level Security (RLS) with public read access
- Ready to execute in Supabase SQL Editor

### 2. Service Layer
**File:** `lib/waterMonthlyService.ts`
- `fetchWaterMonthlyRecords()` - Fetch all records
- `fetchWaterMonthlyByZone(zone)` - Filter by zone
- `fetchWaterMonthlyByType(type)` - Filter by type
- `searchWaterMonthlyByMeterLabel(term)` - Search by meter label
- `getUniqueZones()` - Get all unique zones
- `getUniqueTypes()` - Get all unique types

### 3. React Hook
**File:** `hooks/useWaterMonthly.ts`
- Manages state for records, loading, error states
- Provides functions for filtering and searching
- Auto-loads zones and types on mount
- Includes reset functionality

### 4. Dashboard Component
**File:** `components/WaterMonthlyDashboard.tsx`
- Full-featured dashboard with filters (Zone, Type, Search)
- Stats cards showing Total Records, Active Zones, Meter Types
- Responsive data table with all monthly columns
- Loading and error states
- Tailwind CSS styling

### 5. Test Script
**File:** `test-water-monthly-setup.ts`
- Verifies Supabase connection
- Checks table existence
- Tests data fetching
- Displays sample records
- Run with: `npx tsx test-water-monthly-setup.ts`

## Setup Steps

### Step 1: Create Supabase Table
1. Open your Supabase project at https://supabase.com/dashboard
2. Navigate to SQL Editor
3. Copy the contents of `setup-water-monthly-table.sql`
4. Execute the SQL script
5. Verify the table was created in the Table Editor

### Step 2: Upload CSV Data
You have two options:

**Option A: Using Supabase Dashboard (Recommended)**
1. Go to Table Editor in Supabase
2. Select `Water_System` table
3. Click "Insert" → "Import data from CSV"
4. Upload your `Water Main Consumption 25 - All Data (2).csv` file
5. Map CSV columns to database columns:
   - Meter Label → meter_label
   - Acct # → acct_number
   - Label → label
   - Zone → zone
   - Parent Meter → parent_meter
   - Type → type
   - Jan-25 → jan_25
   - Feb-25 → feb_25
   - Mar-25 → mar_25
   - Apr-25 → apr_25
   - May-25 → may_25
   - Jun-25 → jun_25
   - Jul-25 → jul_25
   - Aug-25 → aug_25
   - Sep-25 → sep_25
6. Confirm and import

**Option B: Using SQL INSERT (for programmatic upload)**
Create a script to parse CSV and insert records using the service layer.

### Step 3: Verify Setup
```bash
npx tsx test-water-monthly-setup.ts
```

Expected output:
- ✅ Water_Monthly table exists
- 📊 Record count: 350 (or your CSV row count)
- ✅ Successfully fetched records
- ✅ Found zones and types

### Step 4: Test Dashboard Component
Add the WaterMonthlyDashboard to your app temporarily to verify:

```typescript
import { WaterMonthlyDashboard } from './components/WaterMonthlyDashboard';

// Add to your routing or test page
<WaterMonthlyDashboard />
```

## Database Schema

```sql
Table: Water_System
├── id (SERIAL PRIMARY KEY)
├── meter_label (TEXT NOT NULL)
├── acct_number (TEXT)
├── label (TEXT)
├── zone (TEXT)
├── parent_meter (TEXT)
├── type (TEXT)
├── jan_25 (NUMERIC)
├── feb_25 (NUMERIC)
├── mar_25 (NUMERIC)
├── apr_25 (NUMERIC)
├── may_25 (NUMERIC)
├── jun_25 (NUMERIC)
├── jul_25 (NUMERIC)
├── aug_25 (NUMERIC)
├── sep_25 (NUMERIC)
└── created_at (TIMESTAMP WITH TIME ZONE)
```

## Data Structure from CSV

Based on your CSV file:
- **Total Records:** ~350 rows
- **Zones:** Zone_03_A, Zone_03_B, Zone_05, Zone_08, etc.
- **Types:**
  - Residential (Villa)
  - Residential (Apart)
  - D_Building_Common
  - D_Building_Bulk
  - Retail
  - IRR_Services
  - MB_Common
  - Zone Bulk
  - Main BULK

## Next Steps (Awaiting Your Instructions)

You mentioned you'll provide specific instructions on how to connect this backend to your Water module frontend. Please specify:

1. **KPI Card Requirements:**
   - What metrics should be displayed?
   - How should data be aggregated (sum, average, by zone, by type)?
   - Any specific calculations needed?

2. **Visualization Requirements:**
   - Which charts/graphs for Overview tab?
   - Zone Analysis visualization preferences?
   - Consumption by Type display format?

3. **Integration Points:**
   - Should we replace existing mock data in WaterModule.tsx?
   - Which tabs need Supabase integration?
   - Any specific filtering/grouping logic?

## Current Status

✅ **Completed:**
- Supabase table schema created
- Service layer with data fetching functions
- React hook for state management
- Test dashboard component
- Test script for verification
- Environment variables configured
- .gitignore updated for .env files

⏳ **Pending:**
- Upload CSV data to Supabase (awaiting file upload)
- Connect to Water module KPI cards (awaiting your specifications)
- Integrate with existing Water module components
- Define specific KPI calculations

## Environment Variables

Already configured in `.env.local`:
```env
VITE_SUPABASE_URL=https://mtkgpoeaukfmndncfxts.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

The `lib/supabase.ts` file uses these environment variables with proper fallback support.

## Support

If you encounter any issues:
1. Check Supabase logs in the dashboard
2. Run the test script: `npx tsx test-water-monthly-setup.ts`
3. Verify RLS policies in Supabase
4. Check browser console for detailed error messages
