import { useState, useEffect } from 'react';
import {
  fetchAllStpRecords,
  calculateStpStatistics,
  getMonthlyData,
  filterByDateRange,
  type StpPlantRecord,
  type StpStatistics,
} from '../lib/stpPlantService';

export interface UseStpPlantReturn {
  records: StpPlantRecord[];
  statistics: StpStatistics;
  monthlyData: Array<{ name: string; inlet: number; output: number; trips: number; impact: number }>;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  filterRecords: (startDate?: string, endDate?: string) => void;
}

/**
 * React hook for managing STP Plant data
 */
export const useStpPlant = (): UseStpPlantReturn => {
  const [records, setRecords] = useState<StpPlantRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<StpPlantRecord[]>([]);
  const [statistics, setStatistics] = useState<StpStatistics>({
    totalInletSewage: 0,
    totalTreatedWater: 0,
    totalTankerTrips: 0,
    totalTankerIncome: 0,
    totalWaterSavings: 0,
    totalEconomicImpact: 0,
    treatmentEfficiency: 0,
    averageDailyInlet: 0,
    recordCount: 0,
  });
  const [monthlyData, setMonthlyData] = useState<Array<{
    name: string;
    inlet: number;
    output: number;
    trips: number;
    impact: number;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('useStpPlant: Starting data fetch...');
      const data = await fetchAllStpRecords();
      console.log('useStpPlant: Received data:', data.length, 'records');

      setRecords(data);
      setFilteredRecords(data);

      const stats = calculateStpStatistics(data);
      console.log('useStpPlant: Calculated stats:', stats);
      setStatistics(stats);

      const monthly = getMonthlyData(data);
      console.log('useStpPlant: Monthly data:', monthly);
      setMonthlyData(monthly);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch STP data';
      console.error('Error in useStpPlant:', err);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const filterRecords = (startDate?: string, endDate?: string) => {
    const filtered = filterByDateRange(records, startDate, endDate);
    setFilteredRecords(filtered);

    const stats = calculateStpStatistics(filtered);
    setStatistics(stats);

    const monthly = getMonthlyData(filtered);
    setMonthlyData(monthly);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    records: filteredRecords,
    statistics,
    monthlyData,
    loading,
    error,
    refetch: fetchData,
    filterRecords,
  };
};
