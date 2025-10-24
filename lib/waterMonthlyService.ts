/**
 * Water Monthly Service
 *
 * This service provides functions to interact with the "Water_ Monthly" table in Supabase.
 * Note: The table name has a space after the underscore: "Water_ Monthly"
 */

import { supabase } from './supabase';

/**
 * Type definition for Water Monthly record
 */
export interface WaterMonthlyRecord {
  'Meter Label': string;
  'Acct #': string;
  Label: string;
  Zone: string;
  'Parent Meter': string;
  Type: string;
  'Jan-25': number;
  'Feb-25': number;
  'Mar-25': number;
  'Apr-25': number;
  'May-25': number;
  'Jun-25': number;
  'Jul-25': number;
  'Aug-25': number;
  'Sep-25': number;
}

/**
 * Response type for service functions
 */
export interface ServiceResponse<T> {
  data: T | null;
  error: any;
}

/**
 * Fetch all records from the Water_ Monthly table
 *
 * @returns {Promise<ServiceResponse<WaterMonthlyRecord[]>>} All water monthly records
 *
 * @example
 * const { data, error } = await fetchAllWaterMonthly();
 * if (error) console.error(error);
 * else console.log(data);
 */
export const fetchAllWaterMonthly = async (): Promise<ServiceResponse<WaterMonthlyRecord[]>> => {
  try {
    console.log('📊 Fetching all Water Monthly records...');

    const { data, error } = await supabase
      .from('Water_ Monthly')
      .select('*')
      .order('Zone', { ascending: true });

    if (error) {
      console.error('❌ Error fetching Water Monthly records:', error);
      return { data: null, error };
    }

    console.log(`✅ Successfully fetched ${data?.length || 0} records`);
    return { data: data as WaterMonthlyRecord[], error: null };
  } catch (err) {
    console.error('❌ Unexpected error in fetchAllWaterMonthly:', err);
    return { data: null, error: err };
  }
};

/**
 * Fetch Water Monthly records filtered by zone
 *
 * @param {string} zoneName - The zone to filter by
 * @returns {Promise<ServiceResponse<WaterMonthlyRecord[]>>} Filtered water monthly records
 *
 * @example
 * const { data, error } = await fetchWaterMonthlyByZone('Zone A');
 */
export const fetchWaterMonthlyByZone = async (zoneName: string): Promise<ServiceResponse<WaterMonthlyRecord[]>> => {
  try {
    console.log(`📊 Fetching Water Monthly records for zone: ${zoneName}`);

    const { data, error } = await supabase
      .from('Water_ Monthly')
      .select('*')
      .eq('Zone', zoneName)
      .order('Meter Label', { ascending: true });

    if (error) {
      console.error('❌ Error fetching by zone:', error);
      return { data: null, error };
    }

    console.log(`✅ Found ${data?.length || 0} records for zone: ${zoneName}`);
    return { data: data as WaterMonthlyRecord[], error: null };
  } catch (err) {
    console.error('❌ Unexpected error in fetchWaterMonthlyByZone:', err);
    return { data: null, error: err };
  }
};

/**
 * Fetch Water Monthly records filtered by meter type
 *
 * @param {string} meterType - The meter type to filter by
 * @returns {Promise<ServiceResponse<WaterMonthlyRecord[]>>} Filtered water monthly records
 *
 * @example
 * const { data, error } = await fetchWaterMonthlyByType('Residential');
 */
export const fetchWaterMonthlyByType = async (meterType: string): Promise<ServiceResponse<WaterMonthlyRecord[]>> => {
  try {
    console.log(`📊 Fetching Water Monthly records for type: ${meterType}`);

    const { data, error } = await supabase
      .from('Water_ Monthly')
      .select('*')
      .eq('Type', meterType)
      .order('Meter Label', { ascending: true });

    if (error) {
      console.error('❌ Error fetching by type:', error);
      return { data: null, error };
    }

    console.log(`✅ Found ${data?.length || 0} records for type: ${meterType}`);
    return { data: data as WaterMonthlyRecord[], error: null };
  } catch (err) {
    console.error('❌ Unexpected error in fetchWaterMonthlyByType:', err);
    return { data: null, error: err };
  }
};

/**
 * Search Water Monthly records by meter label (case-insensitive partial match)
 *
 * @param {string} searchTerm - The search term to match against meter labels
 * @returns {Promise<ServiceResponse<WaterMonthlyRecord[]>>} Matching water monthly records
 *
 * @example
 * const { data, error } = await searchWaterMonthlyByMeterLabel('WM-');
 */
export const searchWaterMonthlyByMeterLabel = async (searchTerm: string): Promise<ServiceResponse<WaterMonthlyRecord[]>> => {
  try {
    console.log(`🔍 Searching Water Monthly records for: ${searchTerm}`);

    const { data, error } = await supabase
      .from('Water_ Monthly')
      .select('*')
      .ilike('Meter Label', `%${searchTerm}%`)
      .order('Meter Label', { ascending: true });

    if (error) {
      console.error('❌ Error searching by meter label:', error);
      return { data: null, error };
    }

    console.log(`✅ Found ${data?.length || 0} records matching: ${searchTerm}`);
    return { data: data as WaterMonthlyRecord[], error: null };
  } catch (err) {
    console.error('❌ Unexpected error in searchWaterMonthlyByMeterLabel:', err);
    return { data: null, error: err };
  }
};

/**
 * Get list of unique zones from the Water_ Monthly table
 *
 * @returns {Promise<ServiceResponse<string[]>>} Array of unique zone names
 *
 * @example
 * const { data, error } = await getUniqueZones();
 */
export const getUniqueZones = async (): Promise<ServiceResponse<string[]>> => {
  try {
    console.log('📊 Fetching unique zones...');

    const { data, error } = await supabase
      .from('Water_ Monthly')
      .select('Zone')
      .order('Zone', { ascending: true });

    if (error) {
      console.error('❌ Error fetching unique zones:', error);
      return { data: null, error };
    }

    // Extract unique zones
    const uniqueZones = [...new Set(data.map(item => item.Zone))].filter(Boolean);

    console.log(`✅ Found ${uniqueZones.length} unique zones`);
    return { data: uniqueZones, error: null };
  } catch (err) {
    console.error('❌ Unexpected error in getUniqueZones:', err);
    return { data: null, error: err };
  }
};

/**
 * Get list of unique meter types from the Water_ Monthly table
 *
 * @returns {Promise<ServiceResponse<string[]>>} Array of unique meter types
 *
 * @example
 * const { data, error } = await getUniqueMeterTypes();
 */
export const getUniqueMeterTypes = async (): Promise<ServiceResponse<string[]>> => {
  try {
    console.log('📊 Fetching unique meter types...');

    const { data, error } = await supabase
      .from('Water_ Monthly')
      .select('Type')
      .order('Type', { ascending: true });

    if (error) {
      console.error('❌ Error fetching unique meter types:', error);
      return { data: null, error };
    }

    // Extract unique types
    const uniqueTypes = [...new Set(data.map(item => item.Type))].filter(Boolean);

    console.log(`✅ Found ${uniqueTypes.length} unique meter types`);
    return { data: uniqueTypes, error: null };
  } catch (err) {
    console.error('❌ Unexpected error in getUniqueMeterTypes:', err);
    return { data: null, error: err };
  }
};
