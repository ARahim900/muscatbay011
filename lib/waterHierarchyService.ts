/**
 * Water Meter Hierarchy Service
 *
 * This service calculates water distribution metrics based on a hierarchical meter structure:
 * L1 (Main Source) → L2 (Zone Distribution + DC) → L3 (Villas + Building Bulks)
 *
 * Implements calculations for:
 * - A1 = L1 (Main Source)
 * - A2 = L2 + DC (Zone Distribution)
 * - A3 = L3 (All 146 meters: 125 Villas + 21 Building Bulks)
 * - System efficiency
 * - Stage losses (Stage 1: A1-A2, Stage 2: A2-A3)
 */

import { supabase } from './supabase';
import { WaterMonthlyRecord } from './waterMonthlyService';

/**
 * Monthly column names in the database
 */
const MONTHLY_COLUMNS = [
  'Jan-25', 'Feb-25', 'Mar-25', 'Apr-25', 'May-25',
  'Jun-25', 'Jul-25', 'Aug-25', 'Sep-25'
] as const;

/**
 * Meter type classifications for hierarchical levels
 * L1 = Main Source
 * L2 = Zone Distribution
 * L3 = Individual Properties (125 Villas + 21 Building Bulks = 146 total)
 * DC = Direct Connections (counted in A2)
 */
export const METER_TYPES = {
  L1_MAIN_BULK: ['Main', 'Main_Bulk', 'L1', 'NAMA'],
  L2_ZONE_BULK: ['Zone_Bulk', 'Zone Bulk', 'L2', 'Zone'],
  L3_VILLA: ['Villa', 'L3_Villa', 'L3'],
  L3_BUILDING_BULK: ['Building_Bulk', 'Building Bulk', 'L3_Building', 'Building'],
  DIRECT_CONNECTION: ['Direct_Connection', 'Direct Connection', 'DC', 'Direct']
};

/**
 * KPI Metrics Interface
 * Simplified structure: A1 (L1) → A2 (L2+DC) → A3 (L3)
 */
export interface WaterKPIMetrics {
  // Main metrics
  A1_MainSource: number;           // L1: Total water input from main bulk meter
  A2_ZoneDistribution: number;     // L2 + DC: Zone Bulks + Direct Connections
  A3_Individual: number;           // L3: All individual properties (146 meters: 125 Villas + 21 Building Bulks)

  // Efficiency
  systemEfficiency: number;        // (A3 / A1) * 100

  // Losses
  stage1Loss: number;              // A1 - A2 (Main line losses)
  stage1LossPercentage: number;
  stage2Loss: number;              // A2 - A3 (Distribution network losses)
  stage2LossPercentage: number;
  totalSystemLoss: number;         // Stage1 + Stage2
  totalSystemLossPercentage: number;

  // Meter counts
  meterCounts: {
    L1: number;                    // Main bulk meter (should be 1)
    L2: number;                    // Zone bulk meters
    L3_Villas: number;             // Villa meters (target: 125)
    L3_BuildingBulks: number;      // Building bulk meters (target: 21)
    DirectConnections: number;     // Direct connections
    total: number;                 // Total meters
  };
}

/**
 * Breakdown by level
 */
export interface LevelBreakdown {
  level: string;
  consumption: number;
  meterCount: number;
  percentage: number;
}

/**
 * Calculate total consumption for a meter record (sum of all monthly columns)
 */
const calculateMeterTotal = (record: WaterMonthlyRecord): number => {
  return MONTHLY_COLUMNS.reduce((sum, month) => {
    return sum + (record[month] || 0);
  }, 0);
};

/**
 * Check if a meter matches a type category
 */
const matchesMeterType = (meterType: string | null, categories: readonly string[]): boolean => {
  if (!meterType) return false;
  const normalizedType = meterType.trim().toLowerCase();
  return categories.some(cat => normalizedType.includes(cat.toLowerCase()));
};

/**
 * Classify a meter into hierarchical levels
 * Simplified: L1 (Main) → L2 (Zones) → L3 (Properties) + DC (Direct Connections)
 */
export const classifyMeter = (record: WaterMonthlyRecord): {
  level: 'L1' | 'L2' | 'L3' | 'DC' | 'UNKNOWN';
  subType: string;
} => {
  const meterType = record.Type;
  const meterLabel = record['Meter Label'];

  // L1 - Main Source (NAMA bulk meter)
  if (matchesMeterType(meterType, METER_TYPES.L1_MAIN_BULK) ||
      meterLabel?.includes('NAMA') ||
      meterLabel?.includes('C43659')) {
    return { level: 'L1', subType: 'Main_Bulk' };
  }

  // L2 - Zone Bulks
  if (matchesMeterType(meterType, METER_TYPES.L2_ZONE_BULK)) {
    return { level: 'L2', subType: 'Zone_Bulk' };
  }

  // Direct Connections (counted in A2)
  if (matchesMeterType(meterType, METER_TYPES.DIRECT_CONNECTION)) {
    return { level: 'DC', subType: 'Direct_Connection' };
  }

  // L3 - Villas (125 meters)
  if (matchesMeterType(meterType, METER_TYPES.L3_VILLA)) {
    return { level: 'L3', subType: 'Villa' };
  }

  // L3 - Building Bulks (21 meters)
  if (matchesMeterType(meterType, METER_TYPES.L3_BUILDING_BULK)) {
    return { level: 'L3', subType: 'Building_Bulk' };
  }

  return { level: 'UNKNOWN', subType: 'Unknown' };
};

/**
 * Fetch all water monthly records and calculate KPI metrics
 */
export const calculateWaterKPIs = async (): Promise<{
  data: WaterKPIMetrics | null;
  error: any;
}> => {
  try {
    console.log('📊 Calculating Water KPI Metrics...');

    // Fetch all records
    const { data: records, error } = await supabase
      .from('Water_ Monthly')
      .select('*');

    if (error) {
      console.error('❌ Error fetching water monthly records:', error);
      return { data: null, error };
    }

    if (!records || records.length === 0) {
      console.warn('⚠️ No records found in Water_ Monthly table');
      return { data: null, error: 'No records found' };
    }

    // Initialize accumulators
    let A1 = 0;  // L1 Main Source
    let L2_Total = 0;  // L2 Zone Bulks
    let DC_Total = 0;  // Direct Connections
    let L3_Total = 0;  // All L3 (Villas + Building Bulks)

    // Meter counts
    const counts = {
      L1: 0,
      L2: 0,
      L3_Villas: 0,
      L3_BuildingBulks: 0,
      DirectConnections: 0,
      Unknown: 0
    };

    // Process each meter
    records.forEach((record: WaterMonthlyRecord) => {
      const total = calculateMeterTotal(record);
      const { level, subType } = classifyMeter(record);

      switch (level) {
        case 'L1':
          A1 += total;
          counts.L1++;
          break;

        case 'L2':
          L2_Total += total;
          counts.L2++;
          break;

        case 'L3':
          L3_Total += total;
          if (subType === 'Villa') {
            counts.L3_Villas++;
          } else if (subType === 'Building_Bulk') {
            counts.L3_BuildingBulks++;
          }
          break;

        case 'DC':
          DC_Total += total;
          counts.DirectConnections++;
          break;

        default:
          counts.Unknown++;
          console.warn(`⚠️ Unknown meter type: ${record.Type} - ${record['Meter Label']}`);
      }
    });

    // Calculate KPIs according to simplified formulas
    // A1 = L1 (Main Source)
    // A2 = L2 + DC (Zone Distribution + Direct Connections)
    // A3 = L3 (All 146 individual properties: 125 Villas + 21 Building Bulks)
    const A2_ZoneDistribution = L2_Total + DC_Total;
    const A3_Individual = L3_Total;  // Simplified: A3 = L3 only

    // System Efficiency: (A3 / A1) * 100
    const systemEfficiency = A1 > 0 ? (A3_Individual / A1) * 100 : 0;

    // Losses
    // Stage 1 Loss: A1 - A2 (Main line losses before zone distribution)
    const stage1Loss = A1 - A2_ZoneDistribution;
    const stage1LossPercentage = A1 > 0 ? (stage1Loss / A1) * 100 : 0;

    // Stage 2 Loss: A2 - A3 (Distribution network losses from zones to properties)
    const stage2Loss = A2_ZoneDistribution - A3_Individual;
    const stage2LossPercentage = A2_ZoneDistribution > 0 ? (stage2Loss / A2_ZoneDistribution) * 100 : 0;

    // Total System Loss: Stage 1 + Stage 2
    const totalSystemLoss = stage1Loss + stage2Loss;
    const totalSystemLossPercentage = A1 > 0 ? (totalSystemLoss / A1) * 100 : 0;

    const metrics: WaterKPIMetrics = {
      A1_MainSource: A1,
      A2_ZoneDistribution: A2_ZoneDistribution,
      A3_Individual: A3_Individual,
      systemEfficiency,
      stage1Loss,
      stage1LossPercentage,
      stage2Loss,
      stage2LossPercentage,
      totalSystemLoss,
      totalSystemLossPercentage,
      meterCounts: {
        L1: counts.L1,
        L2: counts.L2,
        L3_Villas: counts.L3_Villas,
        L3_BuildingBulks: counts.L3_BuildingBulks,
        DirectConnections: counts.DirectConnections,
        total: records.length
      }
    };

    console.log('✅ KPI Metrics calculated:', metrics);

    // Warnings for data quality
    if (counts.Unknown > 0) {
      console.warn(`⚠️ ${counts.Unknown} meters with unknown type`);
    }

    if (counts.L3_Villas !== 125) {
      console.warn(`⚠️ Expected 125 Villa meters, found ${counts.L3_Villas}`);
    }

    if (counts.L3_BuildingBulks !== 21) {
      console.warn(`⚠️ Expected 21 Building Bulk meters, found ${counts.L3_BuildingBulks}`);
    }

    return { data: metrics, error: null };

  } catch (err) {
    console.error('❌ Error calculating KPIs:', err);
    return { data: null, error: err };
  }
};

/**
 * Get consumption breakdown by hierarchical level
 * Simplified structure: L1 → L2+DC → L3
 */
export const getConsumptionByLevel = async (): Promise<{
  data: LevelBreakdown[] | null;
  error: any;
}> => {
  try {
    const { data: metrics, error } = await calculateWaterKPIs();

    if (error || !metrics) {
      return { data: null, error };
    }

    const breakdown: LevelBreakdown[] = [
      {
        level: 'L1 - Main Source',
        consumption: metrics.A1_MainSource,
        meterCount: metrics.meterCounts.L1,
        percentage: 100
      },
      {
        level: 'L2 - Zone Distribution + DC',
        consumption: metrics.A2_ZoneDistribution,
        meterCount: metrics.meterCounts.L2 + metrics.meterCounts.DirectConnections,
        percentage: metrics.A1_MainSource > 0 ? (metrics.A2_ZoneDistribution / metrics.A1_MainSource) * 100 : 0
      },
      {
        level: 'L3 - Individual Properties (146 meters)',
        consumption: metrics.A3_Individual,
        meterCount: metrics.meterCounts.L3_Villas + metrics.meterCounts.L3_BuildingBulks,
        percentage: metrics.A1_MainSource > 0 ? (metrics.A3_Individual / metrics.A1_MainSource) * 100 : 0
      }
    ];

    return { data: breakdown, error: null };
  } catch (err) {
    console.error('❌ Error getting consumption breakdown:', err);
    return { data: null, error: err };
  }
};
