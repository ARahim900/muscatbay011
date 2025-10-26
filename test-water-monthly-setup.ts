/**
 * Test script to verify Supabase connection and Water_System table setup
 * Run with: npx tsx test-water-monthly-setup.ts
 */

import { supabase } from './lib/supabase';

async function testWaterMonthlySetup() {
  console.log('🔍 Testing Supabase connection for Water_System table...\n');

  try {
    // Test 1: Check if table exists by trying to query it
    console.log('1️⃣ Checking if Water_System table exists...');
    const { data, error, count } = await supabase
      .from('Water_System')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('❌ Error accessing Water_System table:', error.message);
      console.log('\n📝 Please run the SQL script in Supabase SQL Editor:');
      console.log('   File: setup-water-monthly-table.sql\n');
      return;
    }

    console.log('✅ Water_System table exists!');
    console.log(`📊 Current record count: ${count || 0}\n`);

    // Test 2: Try to fetch all records
    console.log('2️⃣ Fetching all records...');
    const { data: records, error: fetchError } = await supabase
      .from('Water_System')
      .select('*')
      .limit(5);

    if (fetchError) {
      console.error('❌ Error fetching records:', fetchError.message);
      return;
    }

    console.log(`✅ Successfully fetched records`);
    if (records && records.length > 0) {
      console.log(`📋 Sample record (first of ${count}):`);
      console.log(JSON.stringify(records[0], null, 2));
    } else {
      console.log('ℹ️  No records in table yet. Upload CSV data to populate.');
    }

    // Test 3: Get unique zones
    console.log('\n3️⃣ Getting unique zones...');
    const { data: zoneData, error: zoneError } = await supabase
      .from('Water_System')
      .select('zone')
      .not('zone', 'is', null);

    if (!zoneError && zoneData) {
      const zones = [...new Set(zoneData.map(r => r.zone))];
      console.log(`✅ Found ${zones.length} unique zones`);
      if (zones.length > 0) {
        console.log('   Zones:', zones.slice(0, 5).join(', ') + (zones.length > 5 ? '...' : ''));
      }
    }

    // Test 4: Get unique types
    console.log('\n4️⃣ Getting unique types...');
    const { data: typeData, error: typeError } = await supabase
      .from('Water_System')
      .select('type')
      .not('type', 'is', null);

    if (!typeError && typeData) {
      const types = [...new Set(typeData.map(r => r.type))];
      console.log(`✅ Found ${types.length} unique types`);
      if (types.length > 0) {
        console.log('   Types:', types.slice(0, 5).join(', ') + (types.length > 5 ? '...' : ''));
      }
    }

    console.log('\n✨ All tests completed successfully!\n');
    console.log('📌 Next steps:');
    console.log('   1. Upload CSV data to Water_System table in Supabase');
    console.log('   2. Use WaterMonthlyDashboard component to view data');
    console.log('   3. Integrate with Water module KPI cards\n');

  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

// Run the test
testWaterMonthlySetup();
