/**
 * Inspect the meters table structure and data
 */

import { supabase } from './lib/supabase';

async function inspectMetersTable() {
  console.log('🔍 Inspecting meters table...\n');

  try {
    // Get total count
    const { count } = await supabase
      .from('meters')
      .select('*', { count: 'exact', head: true });

    console.log(`📊 Total records: ${count}\n`);

    // Get first 3 sample records
    const { data, error } = await supabase
      .from('meters')
      .select('*')
      .limit(3);

    if (error) {
      console.error('❌ Error:', error);
      return;
    }

    if (data && data.length > 0) {
      console.log('📋 Sample records:\n');
      data.forEach((record, index) => {
        console.log(`Record ${index + 1}:`);
        console.log(JSON.stringify(record, null, 2));
        console.log('');
      });

      // Show column structure
      console.log('📄 Table columns:');
      const columns = Object.keys(data[0]);
      columns.forEach(col => {
        const sampleValue = data[0][col];
        const type = typeof sampleValue;
        console.log(`   - ${col}: ${type} = ${JSON.stringify(sampleValue)}`);
      });
    }

  } catch (err) {
    console.error('❌ Error:', err);
  }
}

inspectMetersTable();
