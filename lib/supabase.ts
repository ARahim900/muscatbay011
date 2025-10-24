/**
 * Supabase Client Configuration
 *
 * This file initializes and exports the Supabase client for use throughout the application.
 * The client is configured with the Supabase URL and anonymous key from environment variables.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate that required environment variables are present
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!');
  console.error('Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in .env.local');
}

/**
 * Supabase client instance
 * This client is used to interact with the Supabase database
 */
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Test the Supabase connection
 *
 * @returns {Promise<{success: boolean, message: string}>} Connection test result
 *
 * @example
 * const result = await testConnection();
 * console.log(result.message);
 */
export const testConnection = async (): Promise<{success: boolean, message: string}> => {
  try {
    // Try to query the Water_ Monthly table (note the space in the name)
    const { data, error } = await supabase
      .from('Water_ Monthly')
      .select('count')
      .limit(1);

    if (error) {
      console.error('Supabase connection test failed:', error);
      return {
        success: false,
        message: `Connection failed: ${error.message}`
      };
    }

    console.log('✅ Supabase connection successful!');
    return {
      success: true,
      message: 'Successfully connected to Supabase'
    };
  } catch (err) {
    console.error('Unexpected error during connection test:', err);
    return {
      success: false,
      message: `Unexpected error: ${err instanceof Error ? err.message : String(err)}`
    };
  }
};
