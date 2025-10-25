import React, { type ComponentType, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import Card from '../../ui/Card';
import { useDarkMode } from '../../../context/DarkModeContext';
import { Calendar, Droplets, Users, TrendingUp, Database, SlidersHorizontal, ChevronDown } from 'lucide-react';

// --- MOCK DATA ---
const consumptionByTypeData = [
  { name: 'D_Building_Common', value: 25000 },
  { name: 'MB_Common', value: 50000 },
  { name: 'D_Building_Bulk', value: 80000 },
  { name: 'Residential (Villa)', value: 180000 },
  { name: 'Residential (Apart)', value: 250000,},
  { name: 'Retail', value: 380000 },
];

const kpiData = [
  { icon: Droplets, title: 'TOTAL CONSUMPTION', value: '840,672 m³', subtitle: 'Selected range', iconColor: 'text-yellow-500', bgColor: 'bg-yellow-100 dark:bg-yellow-900/50' },
  { icon: Users, title: 'METER COUNT', value: '350', subtitle: 'Type: all', iconColor: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-900/50' },
  { icon: TrendingUp, title: 'HIGHEST CONSUMER', value: 'Main Bulk (NAMA)', subtitle: '383,148 m³', iconColor: 'text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-900/50' },
  { icon: Database, title: 'ACTIVE TYPES', value: '10', subtitle: 'Across selected range', iconColor: 'text-red-500', bgColor: 'bg-red-100 dark:bg-red-900/50' },
];

const meterDetailsData = [
  { label: 'Z3-42 (Villa)', account: '4300002', level: 'L3', zone: 'Zone_03_(A)', parent: 'ZONE 3A (BULK ZONE 3A)', type: 'Residential (Villa)', jul: 53, aug: 65, sep: 44 },
  { label: 'Z3-049(4) (Building)', account: '4300010', level: 'L4', zone: 'Zone_03_(A)', parent: 'D-49 Building Bulk Meter', type: 'Residential (Apart)', jul: '-', aug: 2, sep: 1 },
  { label: 'Z8-11', account: '4300023', level: 'L3', zone: 'Zone_08', parent: 'BULK ZONE 8', type: 'Residential (Villa)', jul: '-', aug: '-', sep: 13 },
  { label: 'Z3-50(3) (Building)', account: '4300047', level: 'L4', zone: 'Zone_03_(A)', parent: 'D-50 Building Bulk Meter', type: 'Residential (Apart)', jul: '-', aug: '-', sep: '-' },
  { label: 'Z3-33 (Villa)', account: '4300082', level: 'L3', zone: 'Zone_03_(A)', parent: 'ZONE 3A (BULK ZONE 3A)', type: 'Residential (Villa)', jul: '-', aug: 48, sep: 44 },
  { label: 'Z3-3 (Villa)', account: '4300088', level: 'L3', zone: 'Zone_03_(B)', parent: 'ZONE 3B (BULK ZONE 3B)', type: 'Residential (Villa)', jul: 136, aug: 118, sep: 106 },
  { label: 'Z3-49(1) (Building)', account: '4300107', level: 'L4', zone: 'Zone_03_(A)', parent: 'D-49 Building Bulk Meter', type: 'Residential (Apart)', jul: 8, aug: 4, sep: 2 },
  { label: 'Z3-51(4) (Building)', account: '4300127', level: 'L4', zone: 'Zone_03_(A)', parent: 'D-51 Building Bulk Meter', type: 'Residential (Apart)', jul: 24, aug: 16, sep: 13 },
  { label: 'D 49-Building Common Meter', account: '4300140', level: 'L4', zone: 'Zone_03_(A)', parent: 'D-49 Building Bulk Meter', type: 'D_Building_Common', jul: 1, aug: 1, sep: 2 },
  { label: 'D 48-Building Common Meter', account: '4300141', level: 'L4', zone: 'Zone_03_(A)', parent: 'D-48 Building Bulk Meter', type: 'D_Building_Common', jul: 1, aug: 1, sep: 1 },
];

const filterChips = ['All', 'Residential (Villa)', 'Residential (Apart)', 'D Building Common', 'Retail', 'D Building Bulk', 'IRR Servies', 'Zone Bulk', 'MB Common', 'Main BULK', 'Building'];

// --- COMPONENTS ---
interface AnalysisKpiCardProps {
    icon: ComponentType<{ className?: string }>;
    title: string;
    value: string;
    subtitle: string;
    iconColor: string;
    bgColor: string;
}

const AnalysisKpiCard: React.FC<AnalysisKpiCardProps> = ({ icon: Icon, title, value, subtitle, iconColor, bgColor }) => (
    <Card className="!p-4">
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className={`w-7 h-7 ${iconColor}`} />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider">{title}</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{value}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>
      </div>
    </Card>
);

const LevelTag: React.FC<{ level: string }> = ({ level }) => {
    const color = level === 'L3' ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200' : 'bg-purple-200 text-purple-800 dark:bg-purple-700 dark:text-purple-200';
    return <span className={`px-2 py-1 text-xs font-medium rounded-md ${color}`}>{level}</span>;
}

const ConsumptionByType: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    const tickColor = isDarkMode ? '#A1A1AA' : '#6B7280';
    const barColors = ['#00D2B3', '#8884d8', '#FFBB28', '#FF8042', '#0088FE', '#00C49F'];
    const [activeChip, setActiveChip] = useState('All');

    return (
        <div className="space-y-6">
            {/* Top Filters */}
            <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <input type="text" value="January 2025" readOnly className="w-48 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 pr-10 focus:outline-none"/>
                            <Calendar className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                        <span className="text-gray-500">to</span>
                        <div className="relative">
                            <input type="text" value="September 2025" readOnly className="w-48 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 pr-10 focus:outline-none"/>
                             <Calendar className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                    <button className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors">
                        Reset Range
                    </button>
                </div>
                <div className="relative pt-2">
                     <input type="range" min="0" max="8" defaultValue="8" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-accent" />
                     <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span>
                    </div>
                </div>
            </div>

            {/* Chip Filters */}
            <div className="flex flex-wrap gap-2">
                {filterChips.map((chip) => (
                    <button 
                        key={chip} 
                        onClick={() => setActiveChip(chip)}
                        className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                            activeChip === chip 
                            ? 'bg-accent text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}`
                        }
                    >
                        {chip}
                    </button>
                ))}
            </div>
            
            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData.map(kpi => <AnalysisKpiCard key={kpi.title} {...kpi} />)}
            </div>

            {/* Consumption Chart */}
            <Card>
                <h3 className="text-xl font-bold">Consumption by Type (m³)</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Aggregated for Jan 2025 - Sep 2025</p>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={consumptionByTypeData} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
                        <XAxis type="number" stroke={tickColor} />
                        <YAxis type="category" dataKey="name" stroke={tickColor} width={150} tick={{ fontSize: 12 }}/>
                        <Tooltip 
                            cursor={{fill: 'transparent'}}
                            contentStyle={{ backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF', borderColor: isDarkMode ? '#374151' : '#E5E7EB' }} 
                        />
                        <Bar dataKey="value" barSize={20}>
                            {consumptionByTypeData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Card>

             {/* Meter Details Table */}
            <Card>
                <h3 className="text-xl font-bold mb-4">Meter Details</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                {['Meter Label', 'Account #', 'Level', 'Zone', 'Parent Meter', 'Type', 'Jul-25', 'Aug-25', 'Sep-25'].map(h => <th key={h} scope="col" className="px-6 py-3">{h}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                           {meterDetailsData.map((row, i) => (
                                <tr key={i} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{row.label}</th>
                                    <td className="px-6 py-4">{row.account}</td>
                                    <td className="px-6 py-4"><LevelTag level={row.level} /></td>
                                    <td className="px-6 py-4">{row.zone}</td>
                                    <td className="px-6 py-4">{row.parent}</td>
                                    <td className="px-6 py-4">{row.type}</td>
                                    <td className="px-6 py-4">{row.jul}</td>
                                    <td className="px-6 py-4">{row.aug}</td>
                                    <td className="px-6 py-4">{row.sep}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default ConsumptionByType;