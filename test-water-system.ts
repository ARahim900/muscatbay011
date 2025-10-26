/**
 * Test script to verify connection to "Water System" table (with space)
 * Run with: npx tsx test-water-system.ts
 */

import { supabase } from './lib/supabase';

async function testWaterSystem() {
  console.log('🔍 Testing connection to "Water System" table...\n');

  try {
    // Test 1: Check table and count
    console.log('1️⃣ Checking "Water System" table...');
    const { count, error: countError } = await supabase
      .from('Water System')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('❌ Error accessing table:', countError.message);
      return;
    }

    console.log(`✅ Table exists!`);
    console.log(`📊 Total records: ${count || 0}\n`);

    if (count === 0) {
      console.log('⚠️  No records found. Please import your CSV data.\n');
      return;
    }

    // Test 2: Fetch sample records
    console.log('2️⃣ Fetching sample records...');
    const { data, error } = await supabase
      .from('Water System')
      .select('*')
      .limit(3);

    if (error) {
      console.error('❌ Error fetching records:', error.message);
      return;
    }

    if (data && data.length > 0) {
      console.log(`✅ Successfully fetched ${data.length} records\n`);

      console.log('📋 Sample record:');
      console.log(JSON.stringify(data[0], null, 2));
      console.log('');

      // Test 3: Get unique zones
      console.log('3️⃣ Getting unique zones...');
      const { data: zoneData, error: zoneError } = await supabase
        .from('Water System')
        .select('Zone')
        .not('Zone', 'is', null);

      if (!zoneError && zoneData) {
        const zones = [...new Set(zoneData.map((r: any) => r.Zone))];
        console.log(`✅ Found ${zones.length} unique zones`);
        console.log('   Zones:', zones.join(', '));
        console.log('');
      }

      // Test 4: Get unique types
      console.log('4️⃣ Getting unique types...');
      const { data: typeData, error: typeError } = await supabase
        .from('Water System')
        .select('Type')
        .not('Type', 'is', null);

      if (!typeError && typeData) {
        const types = [...new Set(typeData.map((r: any) => r.Type))];
        console.log(`✅ Found ${types.length} unique types`);
        console.log('   Types:', types.join(', '));
        console.log('');
      }

      // Test 5: Check monthly data
      console.log('5️⃣ Checking monthly consumption data...');
      const monthlyFields = ['Jan-25', 'Feb-25', 'Mar-25', 'Apr-25', 'May-25', 'Jun-25', 'Jul-25', 'Aug-25', 'Sep-25'];
      const sampleRecord = data[0];
      const monthsWithData = monthlyFields.filter(field => sampleRecord[field] != null);
      console.log(`✅ Sample record has data for ${monthsWithData.length}/9 months`);
      console.log('   Months with data:', monthsWithData.join(', '));
      console.log('');
    }

    console.log('✨ All tests completed successfully!\n');
    console.log('📌 Next step: Integrate with Water module components\n');

  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

testWaterSystem();
