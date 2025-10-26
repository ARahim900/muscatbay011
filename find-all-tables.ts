/**
 * Find all tables in Supabase and their record counts
 */

import { supabase } from './lib/supabase';

async function findAllTables() {
  console.log('🔍 Searching for all tables with data in Supabase...\n');

  try {
    // Query the information schema to get all tables
    const { data, error } = await supabase
      .rpc('get_table_list'); // This might not work, let's try a different approach

    if (error) {
      console.log('⚠️  RPC not available, trying manual table discovery...\n');

      // Try common water-related table names
      const commonTables = [
        'stp_plant_monthly',
        'STP_Plant_Monthly',
        'Water_System',
        'Water_Monthly',
        'water_monthly',
        'water',
        'Water',
        'meters',
        'Meters',
        'consumption',
        'Consumption'
      ];

      for (const tableName of commonTables) {
        try {
          const { count, error: countError } = await supabase
            .from(tableName)
            .select('*', { count: 'exact', head: true });

          if (!countError && count !== null && count > 0) {
            console.log(`✅ Found table with data: "${tableName}"`);
            console.log(`   📊 Record count: ${count}`);

            // Get sample record
            const { data: sample } = await supabase
              .from(tableName)
              .select('*')
              .limit(1);

            if (sample && sample.length > 0) {
              console.log(`   📄 Columns:`, Object.keys(sample[0]).join(', '));
              console.log('');
            }
          }
        } catch (err) {
          // Skip tables that don't exist
        }
      }
    }

    console.log('✨ Search complete!\n');

  } catch (err) {
    console.error('❌ Error:', err);
  }
}

findAllTables();
