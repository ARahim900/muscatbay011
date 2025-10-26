import { supabase } from './supabase';

export interface WaterMonthlyRecord {
  'Meter Label': string;
  'Acct #'?: string;
  'Label'?: string;
  'Zone'?: string;
  'Parent Meter'?: string;
  'Type'?: string;
  'Jan-25'?: number;
  'Feb-25'?: number;
  'Mar-25'?: number;
  'Apr-25'?: number;
  'May-25'?: number;
  'Jun-25'?: number;
  'Jul-25'?: number;
  'Aug-25'?: number;
  'Sep-25'?: number;
}

/**
 * Fetch all water monthly records from Supabase
 */
export async function fetchWaterMonthlyRecords(): Promise<WaterMonthlyRecord[]> {
  try {
    const { data, error } = await supabase
      .from('Water_System')
      .select('*')
      .order('Meter Label', { ascending: true });

    if (error) {
      console.error('Error fetching water monthly records:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch water monthly records:', error);
    return [];
  }
}

/**
 * Fetch water monthly records filtered by zone
 */
export async function fetchWaterMonthlyByZone(zone: string): Promise<WaterMonthlyRecord[]> {
  try {
    const { data, error } = await supabase
      .from('Water_System')
      .select('*')
      .eq('Zone', zone)
      .order('Meter Label', { ascending: true });

    if (error) {
      console.error('Error fetching water monthly records by zone:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch water monthly records by zone:', error);
    return [];
  }
}

/**
 * Fetch water monthly records filtered by type
 */
export async function fetchWaterMonthlyByType(type: string): Promise<WaterMonthlyRecord[]> {
  try {
    const { data, error } = await supabase
      .from('Water System')
      .select('*')
      .eq('Type', type)
      .order('Meter Label', { ascending: true });

    if (error) {
      console.error('Error fetching water monthly records by type:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch water monthly records by type:', error);
    return [];
  }
}

/**
 * Search water monthly records by meter label
 */
export async function searchWaterMonthlyByMeterLabel(searchTerm: string): Promise<WaterMonthlyRecord[]> {
  try {
    const { data, error } = await supabase
      .from('Water System')
      .select('*')
      .ilike('Meter Label', `%${searchTerm}%`)
      .order('Meter Label', { ascending: true });

    if (error) {
      console.error('Error searching water monthly records:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Failed to search water monthly records:', error);
    return [];
  }
}

/**
 * Get unique zones from water monthly records
 */
export async function getUniqueZones(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('Water System')
      .select('Zone')
      .not('Zone', 'is', null);

    if (error) {
      console.error('Error fetching unique zones:', error);
      throw error;
    }

    const zones = [...new Set(data?.map(record => record.Zone) || [])];
    return zones.sort();
  } catch (error) {
    console.error('Failed to fetch unique zones:', error);
    return [];
  }
}

/**
 * Get unique types from water monthly records
 */
export async function getUniqueTypes(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('Water System')
      .select('Type')
      .not('Type', 'is', null);

    if (error) {
      console.error('Error fetching unique types:', error);
      throw error;
    }

    const types = [...new Set(data?.map(record => record.Type) || [])];
    return types.sort();
  } catch (error) {
    console.error('Failed to fetch unique types:', error);
    return [];
  }
}
