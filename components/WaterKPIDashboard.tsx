/**
 * Water KPI Dashboard Component
 *
 * Displays water distribution system KPIs including:
 * - A1, A2, A3 metrics (Main Source, Zone Distribution, Individual consumption)
 * - System Efficiency
 * - Stage losses (Stage 1, Stage 2, Stage 3, Total)
 * - Performance indicators with color-coded ratings
 */

import React, { useEffect, useState } from 'react';
import { calculateWaterKPIs, WaterKPIMetrics } from '../lib/waterHierarchyService';

/**
 * KPI Card Component
 */
interface KPICardProps {
  title: string;
  value: number;
  unit?: string;
  subtitle?: string;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'red' | 'yellow' | 'orange' | 'gray';
  trend?: {
    value: number;
    label: string;
  };
  status?: 'excellent' | 'good' | 'average' | 'poor';
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  unit = 'm³',
  subtitle,
  icon,
  color,
  trend,
  status
}) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    orange: 'bg-orange-500',
    gray: 'bg-gray-500'
  };

  const statusEmojis = {
    excellent: '🟢',
    good: '🟡',
    average: '🟠',
    poor: '🔴'
  };

  const formatValue = (val: number): string => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
    return val.toFixed(1);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <div className="flex items-baseline">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatValue(value)}
            </p>
            <span className="ml-2 text-lg text-gray-500 dark:text-gray-400">
              {unit}
            </span>
          </div>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
          {trend && (
            <div className="mt-2 flex items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                {trend.label}: {trend.value.toFixed(1)}%
              </span>
            </div>
          )}
          {status && (
            <div className="mt-2">
              <span className="text-sm">
                {statusEmojis[status]} {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>
          )}
        </div>
        <div className={`flex-shrink-0 ${colorClasses[color]} rounded-lg p-3`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

/**
 * Get performance status based on percentage
 */
const getEfficiencyStatus = (efficiency: number): 'excellent' | 'good' | 'average' | 'poor' => {
  if (efficiency >= 85) return 'excellent';
  if (efficiency >= 75) return 'good';
  if (efficiency >= 65) return 'average';
  return 'poor';
};

const getLossStatus = (lossPercentage: number): 'excellent' | 'good' | 'average' | 'poor' => {
  if (lossPercentage < 10) return 'excellent';
  if (lossPercentage < 20) return 'good';
  if (lossPercentage < 30) return 'average';
  return 'poor';
};

/**
 * Main Water KPI Dashboard Component
 */
export const WaterKPIDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<WaterKPIMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await calculateWaterKPIs();

      if (fetchError) {
        throw fetchError;
      }

      setMetrics(data);
    } catch (err) {
      console.error('Error loading KPI metrics:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading KPI metrics...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !metrics) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error loading KPI data</h3>
            <p className="mt-2 text-sm text-red-700 dark:text-red-300">
              {error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={loadMetrics}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Water Distribution KPIs
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            System performance metrics and loss analysis
          </p>
        </div>
        <button
          onClick={loadMetrics}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Refresh</span>
        </button>
      </div>

      {/* Row 1: Main KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="A1 - Main Source"
          value={metrics.A1_MainSource}
          subtitle="L1: Total system input"
          color="blue"
          icon={
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          }
        />

        <KPICard
          title="A2 - Zone Distribution"
          value={metrics.A2_ZoneDistribution}
          subtitle="L2 + DC: Zones + Direct Connections"
          color="green"
          trend={{
            value: metrics.A1_MainSource > 0 ? (metrics.A2_ZoneDistribution / metrics.A1_MainSource) * 100 : 0,
            label: 'of A1'
          }}
          icon={
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        />

        <KPICard
          title="A3 - Individual Properties"
          value={metrics.A3_Individual}
          subtitle="L3: 146 meters (125 Villas + 21 Bulks)"
          color="purple"
          trend={{
            value: metrics.A1_MainSource > 0 ? (metrics.A3_Individual / metrics.A1_MainSource) * 100 : 0,
            label: 'of A1'
          }}
          icon={
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          }
        />

        <KPICard
          title="System Efficiency"
          value={metrics.systemEfficiency}
          unit="%"
          subtitle="A3 / A1 (Target: ≥85%)"
          color={getEfficiencyStatus(metrics.systemEfficiency) === 'excellent' ? 'green' :
                 getEfficiencyStatus(metrics.systemEfficiency) === 'good' ? 'yellow' :
                 getEfficiencyStatus(metrics.systemEfficiency) === 'average' ? 'orange' : 'red'}
          status={getEfficiencyStatus(metrics.systemEfficiency)}
          icon={
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
        />
      </div>

      {/* Row 2: Loss Cards (3 cards only) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPICard
          title="Stage 1 Loss"
          value={metrics.stage1Loss}
          subtitle="Main line losses (A1 - A2)"
          color={getLossStatus(metrics.stage1LossPercentage) === 'excellent' ? 'green' :
                 getLossStatus(metrics.stage1LossPercentage) === 'good' ? 'yellow' :
                 getLossStatus(metrics.stage1LossPercentage) === 'average' ? 'orange' : 'red'}
          trend={{
            value: metrics.stage1LossPercentage,
            label: 'Loss rate'
          }}
          status={getLossStatus(metrics.stage1LossPercentage)}
          icon={
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          }
        />

        <KPICard
          title="Stage 2 Loss"
          value={metrics.stage2Loss}
          subtitle="Network losses (A2 - A3)"
          color={getLossStatus(metrics.stage2LossPercentage) === 'excellent' ? 'green' :
                 getLossStatus(metrics.stage2LossPercentage) === 'good' ? 'yellow' :
                 getLossStatus(metrics.stage2LossPercentage) === 'average' ? 'orange' : 'red'}
          trend={{
            value: metrics.stage2LossPercentage,
            label: 'Loss rate'
          }}
          status={getLossStatus(metrics.stage2LossPercentage)}
          icon={
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          }
        />

        <KPICard
          title="Total System Loss"
          value={metrics.totalSystemLoss}
          subtitle="Stage 1 + Stage 2"
          color={getLossStatus(metrics.totalSystemLossPercentage) === 'excellent' ? 'green' :
                 getLossStatus(metrics.totalSystemLossPercentage) === 'good' ? 'yellow' :
                 getLossStatus(metrics.totalSystemLossPercentage) === 'average' ? 'orange' : 'red'}
          trend={{
            value: metrics.totalSystemLossPercentage,
            label: 'Total loss rate'
          }}
          status={getLossStatus(metrics.totalSystemLossPercentage)}
          icon={
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          }
        />
      </div>

      {/* Meter Count Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Meter Distribution
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-3xl font-bold text-blue-600">{metrics.meterCounts.L1}</p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">L1 Main Bulk</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Source</p>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-3xl font-bold text-green-600">{metrics.meterCounts.L2}</p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">L2 Zone Bulks</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Distribution</p>
          </div>
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="text-3xl font-bold text-purple-600">{metrics.meterCounts.L3_Villas}</p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">L3 Villas</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Target: 125</p>
          </div>
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="text-3xl font-bold text-purple-600">{metrics.meterCounts.L3_BuildingBulks}</p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">L3 Building Bulks</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Target: 21</p>
          </div>
          <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <p className="text-3xl font-bold text-orange-600">{metrics.meterCounts.DirectConnections}</p>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Direct Connections</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Special</p>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total L3 Properties: <span className="font-bold text-purple-600">{metrics.meterCounts.L3_Villas + metrics.meterCounts.L3_BuildingBulks}</span> / 146 (Target)
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Total System Meters: <span className="font-semibold text-gray-900 dark:text-white">{metrics.meterCounts.total}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterKPIDashboard;
