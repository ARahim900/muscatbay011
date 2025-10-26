# How to Import CSV Data to "Water System" Table

## Current Status
✅ Table "Water System" exists in Supabase
❌ Table has 0 records - CSV data needs to be imported

## Steps to Import CSV Data

### Method 1: Using Supabase Dashboard (Recommended)

1. **Open Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your project

2. **Navigate to Table Editor**
   - Click "Table Editor" in the left sidebar
   - Find and select the **"Water System"** table

3. **Import CSV Data**
   - Click the **"Insert"** button (top right)
   - Select **"Import data from CSV"**
   - Upload your CSV file: `Water Main Consumption 25 - All Data (2).csv`

4. **Map CSV Columns to Database Columns**

   Make sure your CSV columns map exactly to these database column names:

   | CSV Column | Database Column |
   |------------|----------------|
   | Meter Label | Meter Label |
   | Acct # | Acct # |
   | Label | Label |
   | Zone | Zone |
   | Parent Meter | Parent Meter |
   | Type | Type |
   | Jan-25 | Jan-25 |
   | Feb-25 | Feb-25 |
   | Mar-25 | Mar-25 |
   | Apr-25 | Apr-25 |
   | May-25 | May-25 |
   | Jun-25 | Jun-25 |
   | Jul-25 | Jul-25 |
   | Aug-25 | Aug-25 |
   | Sep-25 | Sep-25 |

5. **Confirm Import**
   - Click "Import" or "Confirm"
   - Wait for the import to complete

6. **Verify Import**
   - Run the test script:
   ```bash
   npx tsx test-water-system.ts
   ```

   Expected output:
   - ✅ Table exists!
   - 📊 Total records: 350 (or your CSV row count)
   - ✅ Sample records displayed
   - ✅ Zones and Types listed

### Method 2: Manual SQL Insert (Alternative)

If the CSV import doesn't work, you can:

1. Convert your CSV to SQL INSERT statements
2. Run the SQL in Supabase SQL Editor

Let me know if you need help with this method.

## After Import

Once your CSV data is imported successfully:

1. ✅ Service layer is ready ([lib/waterMonthlyService.ts](lib/waterMonthlyService.ts))
2. ✅ React hook is ready ([hooks/useWaterMonthly.ts](hooks/useWaterMonthly.ts))
3. ✅ Dashboard component is ready ([components/WaterMonthlyDashboard.tsx](components/WaterMonthlyDashboard.tsx))

## Test the Connection

Run this command to verify everything works:
```bash
npx tsx test-water-system.ts
```

## Integration with Water Module

After successful import, I can help you:
- Connect the Water System data to your Water module KPI cards
- Create visualizations for Zone Analysis
- Set up Consumption by Type charts
- Integrate with the Main Database view

Let me know when the CSV import is complete!
