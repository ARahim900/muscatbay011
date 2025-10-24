/**
 * useWaterMonthly Hook
 *
 * Custom React hook for managing Water Monthly data from Supabase.
 * Provides state management, filtering, searching, and data fetching capabilities.
 */

import { useState, useEffect, useCallback } from 'react';
import {
  fetchAllWaterMonthly,
  fetchWaterMonthlyByZone,
  fetchWaterMonthlyByType,
  searchWaterMonthlyByMeterLabel,
  getUniqueZones,
  getUniqueMeterTypes,
  WaterMonthlyRecord
} from '../lib/waterMonthlyService';

/**
 * Hook configuration options
 */
interface UseWaterMonthlyOptions {
  autoFetch?: boolean; // Automatically fetch data on mount (default: true)
}

/**
 * Hook return type
 */
interface UseWaterMonthlyReturn {
  // State
  data: WaterMonthlyRecord[];
  zones: string[];
  meterTypes: string[];
  loading: boolean;
  error: any;

  // Methods
  refetch: () => Promise<void>;
  filterByZone: (zone: string) => Promise<void>;
  filterByType: (type: string) => Promise<void>;
  searchByMeterLabel: (searchTerm: string) => Promise<void>;
  resetFilters: () => Promise<void>;
}

/**
 * Custom hook for managing Water Monthly data
 *
 * @param {UseWaterMonthlyOptions} options - Configuration options
 * @returns {UseWaterMonthlyReturn} Hook state and methods
 *
 * @example
 * const { data, loading, error, filterByZone } = useWaterMonthly();
 *
 * // Filter by zone
 * await filterByZone('Zone A');
 */
export const useWaterMonthly = (options: UseWaterMonthlyOptions = {}): UseWaterMonthlyReturn => {
  const { autoFetch = true } = options;

  // State management
  const [data, setData] = useState<WaterMonthlyRecord[]>([]);
  const [zones, setZones] = useState<string[]>([]);
  const [meterTypes, setMeterTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  /**
   * Fetch all data and populate zones and types
   */
  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch all data
      const { data: records, error: fetchError } = await fetchAllWaterMonthly();

      if (fetchError) {
        throw fetchError;
      }

      setData(records || []);

      // Fetch unique zones
      const { data: zonesData, error: zonesError } = await getUniqueZones();
      if (zonesError) {
        console.error('Error fetching zones:', zonesError);
      } else {
        setZones(zonesData || []);
      }

      // Fetch unique meter types
      const { data: typesData, error: typesError } = await getUniqueMeterTypes();
      if (typesError) {
        console.error('Error fetching meter types:', typesError);
      } else {
        setMeterTypes(typesData || []);
      }

      console.log('✅ Data refreshed successfully');
    } catch (err) {
      console.error('❌ Error refreshing data:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Filter data by zone
   *
   * @param {string} zone - Zone name to filter by
   */
  const filterByZone = useCallback(async (zone: string) => {
    if (!zone) {
      await refetch();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data: records, error: fetchError } = await fetchWaterMonthlyByZone(zone);

      if (fetchError) {
        throw fetchError;
      }

      setData(records || []);
      console.log(`✅ Filtered by zone: ${zone}`);
    } catch (err) {
      console.error('❌ Error filtering by zone:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [refetch]);

  /**
   * Filter data by meter type
   *
   * @param {string} type - Meter type to filter by
   */
  const filterByType = useCallback(async (type: string) => {
    if (!type) {
      await refetch();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data: records, error: fetchError } = await fetchWaterMonthlyByType(type);

      if (fetchError) {
        throw fetchError;
      }

      setData(records || []);
      console.log(`✅ Filtered by type: ${type}`);
    } catch (err) {
      console.error('❌ Error filtering by type:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [refetch]);

  /**
   * Search data by meter label
   *
   * @param {string} searchTerm - Search term to match against meter labels
   */
  const searchByMeterLabel = useCallback(async (searchTerm: string) => {
    if (!searchTerm || searchTerm.trim() === '') {
      await refetch();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data: records, error: fetchError } = await searchWaterMonthlyByMeterLabel(searchTerm);

      if (fetchError) {
        throw fetchError;
      }

      setData(records || []);
      console.log(`✅ Searched by meter label: ${searchTerm}`);
    } catch (err) {
      console.error('❌ Error searching by meter label:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [refetch]);

  /**
   * Reset all filters and fetch all data
   */
  const resetFilters = useCallback(async () => {
    console.log('🔄 Resetting all filters...');
    await refetch();
  }, [refetch]);

  // Auto-fetch data on mount if enabled
  useEffect(() => {
    if (autoFetch) {
      refetch();
    }
  }, [autoFetch, refetch]);

  return {
    // State
    data,
    zones,
    meterTypes,
    loading,
    error,

    // Methods
    refetch,
    filterByZone,
    filterByType,
    searchByMeterLabel,
    resetFilters
  };
};

export default useWaterMonthly;
