// Quick test script to verify Supabase STP connection
import { supabase } from './lib/supabase';

async function testStpConnection() {
  console.log('Testing STP_Plant_Database connection...');

  try {
    const { data, error, count } = await supabase
      .from('STP_Plant_Database')
      .select('*', { count: 'exact' });

    if (error) {
      console.error('Error:', error);
      return;
    }

    console.log('Total records:', count);
    console.log('First 3 records:', data?.slice(0, 3));
    console.log('Column names:', data?.[0] ? Object.keys(data[0]) : 'No data');
  } catch (err) {
    console.error('Exception:', err);
  }
}

testStpConnection();
