/**
 * Check all tables in Supabase to find water data
 */

import { supabase } from './lib/supabase';

async function checkTables() {
  console.log('🔍 Checking Supabase tables...\n');

  // Common table name variations to check
  const tableNames = [
    'Water_System',
    'water_system',
    'WaterSystem',
    'Water_Monthly',
    'water_monthly',
    'WaterMonthly',
    'water_consumption',
    'Water_Consumption',
    'water_main_consumption',
    'Water_Main_Consumption'
  ];

  for (const tableName of tableNames) {
    console.log(`📋 Checking table: ${tableName}`);

    const { data, error, count } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true });

    if (!error) {
      console.log(`   ✅ Table exists! Record count: ${count || 0}\n`);

      if (count && count > 0) {
        // Fetch a sample record
        const { data: sample } = await supabase
          .from(tableName)
          .select('*')
          .limit(1);

        if (sample && sample.length > 0) {
          console.log('   📄 Sample record structure:');
          console.log('   Columns:', Object.keys(sample[0]).join(', '));
          console.log('   First record:', JSON.stringify(sample[0], null, 2));
          console.log('\n');
        }
      }
    } else {
      console.log(`   ❌ Table not found or no access\n`);
    }
  }

  console.log('✨ Table check complete!\n');
}

checkTables();
