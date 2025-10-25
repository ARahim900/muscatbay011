import { supabase } from './supabase';

/**
 * STP Plant Database Record Type
 */
export interface StpPlantRecord {
  J361: string | null;
  'Number of Tankers Discharged:': number | null;
  'Expected Tanker Volume (m³) (20 m3)': number | null;
  'Direct In line Sewage (MB)': number | null;
  'Total Inlet Sewage Received from (MB+Tnk) -m³': number | null;
  'Total Treated Water Produced - m³': number | null;
  'H430:J443': number | null;
  'Income from Tankers (OMR)': number | null;
  'Saving from TSE (OMR)': number | null;
  'Total Saving & Income (OMR)': number | null;
}

/**
 * Calculated STP Statistics
 */
export interface StpStatistics {
  totalInletSewage: number;
  totalTreatedWater: number;
  totalTankerTrips: number;
  totalTankerIncome: number;
  totalWaterSavings: number;
  totalEconomicImpact: number;
  treatmentEfficiency: number;
  averageDailyInlet: number;
  recordCount: number;
}

/**
 * Fetch all STP Plant records from Supabase
 */
export const fetchAllStpRecords = async (): Promise<StpPlantRecord[]> => {
  try {
    console.log('Fetching STP records from Supabase...');
    const { data, error } = await supabase
      .from('STP_Plant_Database')
      .select('*')
      .order('J361', { ascending: true });

    if (error) {
      console.error('Error fetching STP records:', error);
      throw error;
    }

    console.log('STP records fetched:', data?.length || 0, 'records');
    console.log('Sample record:', data?.[0]);
    return data || [];
  } catch (err) {
    console.error('Failed to fetch STP records:', err);
    return [];
  }
};

/**
 * Calculate statistics from STP records
 */
export const calculateStpStatistics = (records: StpPlantRecord[]): StpStatistics => {
  if (!records || records.length === 0) {
    return {
      totalInletSewage: 0,
      totalTreatedWater: 0,
      totalTankerTrips: 0,
      totalTankerIncome: 0,
      totalWaterSavings: 0,
      totalEconomicImpact: 0,
      treatmentEfficiency: 0,
      averageDailyInlet: 0,
      recordCount: 0,
    };
  }

  // Log first record to debug column names
  console.log('First record keys:', Object.keys(records[0]));
  console.log('First record values:', records[0]);

  const stats = records.reduce(
    (acc, record, index) => {
      const inletSewage = record['Total Inlet Sewage Received from (MB+Tnk) -m³'] || 0;
      const treatedWater = record['Total Treated Water Produced - m³'] || 0;
      const tankerTrips = record['Number of Tankers Discharged:'] || 0;
      const tankerIncome = record['Income from Tankers (OMR)'] || 0;
      const waterSavings = record['Saving from TSE (OMR)'] || 0;
      const totalImpact = record['Total Saving & Income (OMR)'] || 0;

      // Debug first record
      if (index === 0) {
        console.log('Sample values extracted:');
        console.log('  inletSewage:', inletSewage);
        console.log('  treatedWater:', treatedWater);
        console.log('  tankerTrips:', tankerTrips);
        console.log('  tankerIncome:', tankerIncome);
        console.log('  waterSavings:', waterSavings);
        console.log('  totalImpact:', totalImpact);
      }

      return {
        totalInletSewage: acc.totalInletSewage + inletSewage,
        totalTreatedWater: acc.totalTreatedWater + treatedWater,
        totalTankerTrips: acc.totalTankerTrips + tankerTrips,
        totalTankerIncome: acc.totalTankerIncome + tankerIncome,
        totalWaterSavings: acc.totalWaterSavings + waterSavings,
        totalEconomicImpact: acc.totalEconomicImpact + totalImpact,
      };
    },
    {
      totalInletSewage: 0,
      totalTreatedWater: 0,
      totalTankerTrips: 0,
      totalTankerIncome: 0,
      totalWaterSavings: 0,
      totalEconomicImpact: 0,
    }
  );

  console.log('Final calculated stats:', stats);

  const treatmentEfficiency = stats.totalInletSewage > 0
    ? (stats.totalTreatedWater / stats.totalInletSewage) * 100
    : 0;

  const averageDailyInlet = records.length > 0
    ? stats.totalInletSewage / records.length
    : 0;

  return {
    ...stats,
    treatmentEfficiency,
    averageDailyInlet,
    recordCount: records.length,
  };
};

/**
 * Get monthly aggregated data for charts
 */
export const getMonthlyData = (records: StpPlantRecord[]) => {
  // Group records by month from J361 field (assuming it contains date info)
  const monthlyMap = new Map<string, {
    inlet: number;
    output: number;
    trips: number;
    impact: number;
  }>();

  records.forEach(record => {
    const dateKey = record.J361 || 'Unknown';
    const existing = monthlyMap.get(dateKey) || { inlet: 0, output: 0, trips: 0, impact: 0 };

    monthlyMap.set(dateKey, {
      inlet: existing.inlet + (record['Total Inlet Sewage Received from (MB+Tnk) -m³'] || 0),
      output: existing.output + (record['Total Treated Water Produced - m³'] || 0),
      trips: existing.trips + (record['Number of Tankers Discharged:'] || 0),
      impact: existing.impact + (record['Total Saving & Income (OMR)'] || 0),
    });
  });

  return Array.from(monthlyMap.entries()).map(([name, data]) => ({
    name,
    ...data,
  }));
};

/**
 * Filter records by date range
 */
export const filterByDateRange = (
  records: StpPlantRecord[],
  startDate?: string,
  endDate?: string
): StpPlantRecord[] => {
  if (!startDate && !endDate) return records;

  return records.filter(record => {
    const recordDate = record.J361;
    if (!recordDate) return false;

    if (startDate && recordDate < startDate) return false;
    if (endDate && recordDate > endDate) return false;

    return true;
  });
};
