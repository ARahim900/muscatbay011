import React, { useEffect, useMemo, useState, type ComponentType } from 'react';
import Card from '../../ui/Card';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import { useDarkMode } from '../../../context/DarkModeContext';
import {
  Droplets,
  TrendingDown,
  Target,
  ChevronsRight,
  Users,
  AlertTriangle,
  Loader2,
} from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface OverviewKpiCardProps {
  icon: ComponentType<{ className?: string }>;
  title: string;
  value: string;
  subtitle: string;
  iconColor: string;
  bgColor: string;
}

interface SupabaseWaterMonthlyKpiRow {
  title: string;
  value?: number | string | null;
  value_display?: number | string | null;
  subtitle?: string | null;
  unit?: string | null;
}

interface SupabaseWaterMonthlyAValuesRow {
  month_label?: string | null;
  month?: string | null;
  label?: string | null;
  a1_main_source?: number | string | null;
  a2_zone_distribution?: number | string | null;
  a3_individual?: number | string | null;
}

interface SupabaseWaterMonthlyLossRow {
  month_label?: string | null;
  month?: string | null;
  label?: string | null;
  total_loss?: number | string | null;
  stage_1_loss?: number | string | null;
  stage_2_loss?: number | string | null;
}

const defaultKpiCards: OverviewKpiCardProps[] = [
  {
    icon: Droplets,
    title: 'A1 - MAIN SOURCE',
    value: '383.1k m³',
    subtitle: '383,148 m³ total input',
    iconColor: 'text-yellow-500',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/50',
  },
  {
    icon: ChevronsRight,
    title: 'A2 - ZONE DISTRIBUTION',
    value: '355.9k m³',
    subtitle: 'L2 Zone Bulks + Direct Connections',
    iconColor: 'text-green-500',
    bgColor: 'bg-green-100 dark:bg-green-900/50',
  },
  {
    icon: Users,
    title: 'A3 - INDIVIDUAL',
    value: '290.5k m³',
    subtitle: 'L3 Villas + L4 Apartments + DC',
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-100 dark:bg-blue-900/50',
  },
  {
    icon: Target,
    title: 'SYSTEM EFFICIENCY',
    value: '75.8%',
    subtitle: 'Target: 85% minimum',
    iconColor: 'text-red-500',
    bgColor: 'bg-red-100 dark:bg-red-900/50',
  },
  {
    icon: TrendingDown,
    title: 'STAGE 1 LOSS',
    value: '27,224 m³',
    subtitle: 'Loss Rate: 7.1%',
    iconColor: 'text-purple-500',
    bgColor: 'bg-purple-100 dark:bg-purple-900/50',
  },
  {
    icon: TrendingDown,
    title: 'STAGE 2 LOSS',
    value: '65,376 m³',
    subtitle: 'Loss Rate: 18.4%',
    iconColor: 'text-teal-500',
    bgColor: 'bg-teal-100 dark:bg-teal-900/50',
  },
  {
    icon: AlertTriangle,
    title: 'TOTAL SYSTEM LOSS',
    value: '92,600 m³',
    subtitle: 'Loss Rate: 24.2%',
    iconColor: 'text-yellow-600',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/50',
  },
  {
    icon: ChevronsRight,
    title: 'A3 - BULK LEVEL',
    value: '283.6k m³',
    subtitle: 'All L3 meters + Direct Connections',
    iconColor: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/50',
  },
];

const defaultAValuesData = [
  { name: 'Jan-25', 'A1 - Main Source': 33000, 'A2 - Zone Distribution': 30000, 'A3 - Individual': 28000 },
  { name: 'Feb-25', 'A1 - Main Source': 44000, 'A2 - Zone Distribution': 35000, 'A3 - Individual': 31000 },
  { name: 'Mar-25', 'A1 - Main Source': 49000, 'A2 - Zone Distribution': 42000, 'A3 - Individual': 35000 },
  { name: 'Apr-25', 'A1 - Main Source': 58000, 'A2 - Zone Distribution': 46000, 'A3 - Individual': 42000 },
  { name: 'May-25', 'A1 - Main Source': 46000, 'A2 - Zone Distribution': 42000, 'A3 - Individual': 38000 },
  { name: 'Jun-25', 'A1 - Main Source': 42000, 'A2 - Zone Distribution': 37000, 'A3 - Individual': 29000 },
  { name: 'Jul-25', 'A1 - Main Source': 41000, 'A2 - Zone Distribution': 32000, 'A3 - Individual': 31000 },
  { name: 'Aug-25', 'A1 - Main Source': 42000, 'A2 - Zone Distribution': 39000, 'A3 - Individual': 32000 },
  { name: 'Sep-25', 'A1 - Main Source': 42000, 'A2 - Zone Distribution': 39000, 'A3 - Individual': 32000 },
];

const defaultWaterLossData = [
  { name: 'Jan-25', 'Total Loss': 7000, 'Stage 1 Loss': 5000, 'Stage 2 Loss': -2000 },
  { name: 'Feb-25', 'Total Loss': 16000, 'Stage 1 Loss': 9000, 'Stage 2 Loss': 7000 },
  { name: 'Mar-25', 'Total Loss': 3000, 'Stage 1 Loss': 7000, 'Stage 2 Loss': -4000 },
  { name: 'Apr-25', 'Total Loss': 8000, 'Stage 1 Loss': 1000, 'Stage 2 Loss': 7000 },
  { name: 'May-25', 'Total Loss': 17000, 'Stage 1 Loss': 12000, 'Stage 2 Loss': 5000 },
  { name: 'Jun-25', 'Total Loss': 11000, 'Stage 1 Loss': 13000, 'Stage 2 Loss': 2000 },
  { name: 'Jul-25', 'Total Loss': 10000, 'Stage 1 Loss': 6000, 'Stage 2 Loss': 4000 },
  { name: 'Aug-25', 'Total Loss': 10000, 'Stage 1 Loss': 7000, 'Stage 2 Loss': 3000 },
  { name: 'Sep-25', 'Total Loss': 10000, 'Stage 1 Loss': 7000, 'Stage 2 Loss': 3000 },
];

const KPI_CARD_META = defaultKpiCards.reduce<Record<string, OverviewKpiCardProps & { defaultSubtitle: string }>>(
  (acc, card) => {
    acc[card.title] = { ...card, defaultSubtitle: card.subtitle };
    return acc;
  },
  {}
);

const DEFAULT_KPI_META: OverviewKpiCardProps & { defaultSubtitle: string } = {
  icon: Droplets,
  title: 'Water Metric',
  value: '—',
  subtitle: '',
  iconColor: 'text-blue-500',
  bgColor: 'bg-blue-100 dark:bg-blue-900/50',
  defaultSubtitle: '',
};

const KPI_VIEW_CANDIDATES = ['water_monthly_dashboard_kpis', 'water_monthly_kpis'];
const A_VALUES_VIEW_CANDIDATES = ['water_monthly_dashboard_a_values', 'water_monthly_a_values'];
const LOSS_VIEW_CANDIDATES = ['water_monthly_dashboard_losses', 'water_monthly_losses'];

const monthFormatter = new Intl.DateTimeFormat('en', { month: 'short', year: '2-digit' });

const parseNumericValue = (value?: number | string | null): number | null => {
  if (value === null || value === undefined) {
    return null;
  }
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === 'string') {
    const cleaned = value.replace(/[^0-9.+-]/g, '');
    if (!cleaned) {
      return null;
    }
    const parsed = Number(cleaned);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const formatVolumeValue = (value: number, unit?: string | null) => {
  const finalUnit = unit?.trim() || 'm³';
  if (Math.abs(value) >= 1000) {
    return `${(value / 1000).toFixed(1)}k ${finalUnit}`;
  }
  return `${value.toLocaleString(undefined, { maximumFractionDigits: 0 })} ${finalUnit}`;
};

const formatPercentValue = (value: number) => `${value.toFixed(1)}%`;

const formatKpiValue = (row: SupabaseWaterMonthlyKpiRow, fallback: string) => {
  if (row.value_display !== null && row.value_display !== undefined) {
    return String(row.value_display);
  }
  const numericValue = parseNumericValue(row.value);
  if (numericValue === null) {
    return fallback;
  }
  const unit = row.unit?.toLowerCase();
  const isPercent = unit?.includes('%') || /percent|rate|efficiency/i.test(row.title);
  return isPercent ? formatPercentValue(numericValue) : formatVolumeValue(numericValue, row.unit ?? undefined);
};

const formatMonthLabel = (rawLabel?: string | null) => {
  if (!rawLabel) {
    return 'Unknown';
  }
  const trimmed = rawLabel.trim();
  const isoLike = /^\d{4}-\d{2}(-\d{2})?$/;
  if (isoLike.test(trimmed)) {
    const [year, month] = trimmed.split('-');
    const date = new Date(Number(year), Number(month) - 1, 1);
    if (!Number.isNaN(date.getTime())) {
      return monthFormatter.format(date);
    }
  }
  const parsed = Date.parse(trimmed);
  if (!Number.isNaN(parsed)) {
    return monthFormatter.format(new Date(parsed));
  }
  return trimmed;
};

const formatTooltipValue = (value: number | string) => {
  const numeric = parseNumericValue(value);
  if (numeric === null) {
    return value;
  }
  if (Math.abs(numeric) >= 1000) {
    return `${(numeric / 1000).toFixed(1)}k`;
  }
  return numeric.toLocaleString(undefined, { maximumFractionDigits: 0 });
};

const formatAxisTick = (value: number) => {
  if (!Number.isFinite(value)) {
    return value;
  }
  if (Math.abs(value) >= 1000) {
    return `${(value / 1000).toFixed(0)}k`;
  }
  return value.toLocaleString(undefined, { maximumFractionDigits: 0 });
};

async function fetchFromViews<T>(views: string[]) {
  let lastError: string | null = null;
  for (const view of views) {
    const { data, error } = await supabase.from(view).select('*');
    if (error) {
      lastError = error.message || error.details || error.hint || 'Unknown Supabase error';
      continue;
    }
    if (Array.isArray(data)) {
      return { rows: data as T[], source: view, error: null };
    }
  }
  return { rows: [] as T[], source: null, error: lastError };
}

const mapKpiRowsToCards = (rows: SupabaseWaterMonthlyKpiRow[]) =>
  rows.map<OverviewKpiCardProps>((row) => {
    const meta = KPI_CARD_META[row.title] ?? DEFAULT_KPI_META;
    return {
      icon: meta.icon,
      title: row.title,
      value: formatKpiValue(row, meta.value),
      subtitle: row.subtitle ?? meta.defaultSubtitle,
      iconColor: meta.iconColor,
      bgColor: meta.bgColor,
    };
  });

const mapAValuesRows = (rows: SupabaseWaterMonthlyAValuesRow[]) =>
  rows.map((row) => ({
    name: formatMonthLabel(row.month_label ?? row.month ?? row.label),
    'A1 - Main Source': parseNumericValue(row.a1_main_source) ?? 0,
    'A2 - Zone Distribution': parseNumericValue(row.a2_zone_distribution) ?? 0,
    'A3 - Individual': parseNumericValue(row.a3_individual) ?? 0,
  }));

const mapLossRows = (rows: SupabaseWaterMonthlyLossRow[]) =>
  rows.map((row) => ({
    name: formatMonthLabel(row.month_label ?? row.month ?? row.label),
    'Total Loss': parseNumericValue(row.total_loss) ?? 0,
    'Stage 1 Loss': parseNumericValue(row.stage_1_loss) ?? 0,
    'Stage 2 Loss': parseNumericValue(row.stage_2_loss) ?? 0,
  }));

const Overview: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const tickColor = isDarkMode ? '#A1A1AA' : '#6B7280';
  const [activeAValuesTab, setActiveAValuesTab] = useState('All');
  const [activeLossTab, setActiveLossTab] = useState('All Stages');
  const [kpiCards, setKpiCards] = useState(defaultKpiCards);
  const [aValuesData, setAValuesData] = useState(defaultAValuesData);
  const [waterLossData, setWaterLossData] = useState(defaultWaterLossData);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isSubscribed = true;
    const loadData = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      const [kpiResult, aValueResult, lossResult] = await Promise.all([
        fetchFromViews<SupabaseWaterMonthlyKpiRow>(KPI_VIEW_CANDIDATES),
        fetchFromViews<SupabaseWaterMonthlyAValuesRow>(A_VALUES_VIEW_CANDIDATES),
        fetchFromViews<SupabaseWaterMonthlyLossRow>(LOSS_VIEW_CANDIDATES),
      ]);

      if (!isSubscribed) {
        return;
      }

      const anyLoaded = Boolean(kpiResult.rows.length || aValueResult.rows.length || lossResult.rows.length);
      const errors = [kpiResult.error, aValueResult.error, lossResult.error].filter(Boolean);

      if (!anyLoaded && errors.length) {
        setErrorMessage('Unable to load live data from Supabase. Showing demo data.');
      } else if (errors.length) {
        setErrorMessage('Loaded live data with partial results. Some cards may show demo values.');
      }

      if (kpiResult.rows.length) {
        setKpiCards(mapKpiRowsToCards(kpiResult.rows));
      }
      if (aValueResult.rows.length) {
        setAValuesData(mapAValuesRows(aValueResult.rows));
      }
      if (lossResult.rows.length) {
        setWaterLossData(mapLossRows(lossResult.rows));
      }

      setIsLoading(false);
    };

    loadData().catch((error) => {
      console.error('Failed to load water overview data from Supabase:', error);
      if (isSubscribed) {
        setErrorMessage('Unexpected error loading Supabase data. Showing demo values.');
        setIsLoading(false);
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, []);

  const filteredAValuesData = useMemo(() => {
    if (activeAValuesTab === 'All') {
      return aValuesData;
    }
    const allowedKeys: Record<string, Array<'A1 - Main Source' | 'A2 - Zone Distribution' | 'A3 - Individual'>> = {
      'A1 Only': ['A1 - Main Source'],
      'A2 Only': ['A2 - Zone Distribution'],
      'A3 Individual': ['A3 - Individual'],
    };
    const keep = allowedKeys[activeAValuesTab] ?? [];
    if (!keep.length) {
      return aValuesData;
    }
    return aValuesData.map((entry) => ({
      ...entry,
      'A1 - Main Source': keep.includes('A1 - Main Source') ? entry['A1 - Main Source'] : 0,
      'A2 - Zone Distribution': keep.includes('A2 - Zone Distribution') ? entry['A2 - Zone Distribution'] : 0,
      'A3 - Individual': keep.includes('A3 - Individual') ? entry['A3 - Individual'] : 0,
    }));
  }, [activeAValuesTab, aValuesData]);

  const filteredWaterLossData = useMemo(() => {
    switch (activeLossTab) {
      case 'Total Only':
        return waterLossData.map((entry) => ({
          ...entry,
          'Stage 1 Loss': 0,
          'Stage 2 Loss': 0,
        }));
      case 'Stage 1 & 2':
        return waterLossData.map((entry) => ({
          ...entry,
          'Total Loss': 0,
        }));
      default:
        return waterLossData;
    }
  }, [activeLossTab, waterLossData]);

  const tooltipProps = {
    formatter: (value: number | string) => formatTooltipValue(value),
    contentStyle: {
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderColor: isDarkMode ? '#374151' : '#E5E7EB',
      borderRadius: '0.5rem',
    },
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Water System Analysis</h2>
            <p className="text-gray-500 dark:text-gray-400">Monthly trends and KPI analysis</p>
          </div>
          <div className="flex space-x-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <button className="px-4 py-2 text-sm font-semibold rounded-md bg-accent text-white">Monthly Dashboard</button>
            <button className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">Daily Analysis</button>
            <button className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">Water Hierarchy</button>
          </div>
        </div>
        {(isLoading || errorMessage) && (
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            {isLoading && (
              <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Loader2 className="w-4 h-4 animate-spin" />
                Syncing data with Supabase…
              </span>
            )}
            {errorMessage && (
              <span className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="w-4 h-4" />
                {errorMessage}
              </span>
            )}
          </div>
        )}
      </Card>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <input
              type="text"
              value="January 2025"
              readOnly
              className="w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 focus:outline-none"
            />
            <span className="text-gray-500">to</span>
            <input
              type="text"
              value="September 2025"
              readOnly
              className="w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 focus:outline-none"
            />
          </div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Jan-25 - Sep-25</p>
          <button className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors">Reset Range</button>
        </div>
        <div className="relative pt-2">
          <input
            type="range"
            min="0"
            max="8"
            defaultValue="8"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-accent"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi) => (
          <OverviewKpiCard key={kpi.title} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
            <h3 className="text-xl font-bold">Water System A-Values Distribution</h3>
            <div className="flex space-x-4 text-sm font-medium">
              {['All', 'A1 Only', 'A2 Only', 'A3 Individual'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveAValuesTab(tab)}
                  className={`${
                    activeAValuesTab === tab
                      ? 'text-accent border-b-2 border-accent'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={filteredAValuesData}>
              <defs>
                <linearGradient id="colorA1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorA2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
              <XAxis dataKey="name" stroke={tickColor} />
              <YAxis stroke={tickColor} tickFormatter={formatAxisTick} />
              <Tooltip {...tooltipProps} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Area type="monotone" dataKey="A1 - Main Source" stroke="#3b82f6" fillOpacity={1} fill="url(#colorA1)" />
              <Area type="monotone" dataKey="A2 - Zone Distribution" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorA2)" />
              <Area type="monotone" dataKey="A3 - Individual" stroke="#60a5fa" fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
            <h3 className="text-xl font-bold">Water Loss Analysis</h3>
            <div className="flex space-x-4 text-sm font-medium">
              {['All Stages', 'Total Only', 'Stage 1 & 2'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveLossTab(tab)}
                  className={`${
                    activeLossTab === tab
                      ? 'text-accent border-b-2 border-accent'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredWaterLossData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
              <XAxis dataKey="name" stroke={tickColor} />
              <YAxis stroke={tickColor} tickFormatter={formatAxisTick} />
              <Tooltip {...tooltipProps} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="Total Loss" stroke="#ef4444" strokeWidth={2} />
              <Line type="monotone" dataKey="Stage 1 Loss" stroke="#f87171" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="Stage 2 Loss" stroke="#fb923c" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

const OverviewKpiCard: React.FC<OverviewKpiCardProps> = ({ icon: Icon, title, value, subtitle, iconColor, bgColor }) => (
  <Card className="!p-4">
    <div className="flex items-start space-x-4">
      <div className={`p-3 rounded-lg ${bgColor}`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">{title}</p>
        <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{value}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
      </div>
    </div>
  </Card>
);

export default Overview;
