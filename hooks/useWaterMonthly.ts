import { useState, useEffect } from 'react';
import {
  fetchWaterMonthlyRecords,
  fetchWaterMonthlyByZone,
  fetchWaterMonthlyByType,
  searchWaterMonthlyByMeterLabel,
  getUniqueZones,
  getUniqueTypes,
  WaterMonthlyRecord,
} from '../lib/waterMonthlyService';

export function useWaterMonthly() {
  const [records, setRecords] = useState<WaterMonthlyRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zones, setZones] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);

  // Fetch all records on mount
  useEffect(() => {
    loadAllRecords();
    loadZones();
    loadTypes();
  }, []);

  const loadAllRecords = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWaterMonthlyRecords();
      setRecords(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load water monthly records');
      console.error('Error loading water monthly records:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadZones = async () => {
    try {
      const data = await getUniqueZones();
      setZones(data);
    } catch (err) {
      console.error('Error loading zones:', err);
    }
  };

  const loadTypes = async () => {
    try {
      const data = await getUniqueTypes();
      setTypes(data);
    } catch (err) {
      console.error('Error loading types:', err);
    }
  };

  const filterByZone = async (zone: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWaterMonthlyByZone(zone);
      setRecords(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to filter by zone');
      console.error('Error filtering by zone:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterByType = async (type: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWaterMonthlyByType(type);
      setRecords(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to filter by type');
      console.error('Error filtering by type:', err);
    } finally {
      setLoading(false);
    }
  };

  const search = async (searchTerm: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchWaterMonthlyByMeterLabel(searchTerm);
      setRecords(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search records');
      console.error('Error searching records:', err);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    loadAllRecords();
  };

  return {
    records,
    loading,
    error,
    zones,
    types,
    filterByZone,
    filterByType,
    search,
    reset,
  };
}
