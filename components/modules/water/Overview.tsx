
import React, { useState, type ComponentType } from 'react';
import Card from '../../ui/Card';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, Brush } from 'recharts';
import { useDarkMode } from '../../../context/DarkModeContext';
import { Droplets, TrendingDown, Target, ChevronsRight, Users, AlertTriangle } from 'lucide-react';

// --- MOCK DATA ---
const kpiData = [
  { icon: Droplets, title: 'A1 - MAIN SOURCE', value: '383.1k m³', subtitle: '383,148 m³ total input', iconColor: 'text-yellow-500', bgColor: 'bg-yellow-100 dark:bg-yellow-900/50' },
  { icon: ChevronsRight, title: 'A2 - ZONE DISTRIBUTION', value: '355.9k m³', subtitle: 'L2 Zone Bulks + Direct Connections', iconColor: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-900/50' },
  { icon: Users, title: 'A3 - INDIVIDUAL', value: '290.5k m³', subtitle: 'L3 Villas + L4 Apartments + DC', iconColor: 'text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-900/50' },
  { icon: Target, title: 'SYSTEM EFFICIENCY', value: '75.8%', subtitle: 'Target: 85% minimum', iconColor: 'text-red-500', bgColor: 'bg-red-100 dark:bg-red-900/50' },
  { icon: TrendingDown, title: 'STAGE 1 LOSS', value: '27,224 m³', subtitle: 'Loss Rate: 7.1%', iconColor: 'text-purple-500', bgColor: 'bg-purple-100 dark:bg-purple-900/50' },
  { icon: TrendingDown, title: 'STAGE 2 LOSS', value: '65,376 m³', subtitle: 'Loss Rate: 18.4%', iconColor: 'text-teal-500', bgColor: 'bg-teal-100 dark:bg-teal-900/50' },
  { icon: AlertTriangle, title: 'TOTAL SYSTEM LOSS', value: '92,600 m³', subtitle: 'Loss Rate: 24.2%', iconColor: 'text-yellow-600', bgColor: 'bg-yellow-100 dark:bg-yellow-900/50' },
  { icon: ChevronsRight, title: 'A3 - BULK LEVEL', value: '283.6k m³', subtitle: 'All L3 meters + Direct Connections', iconColor: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/50' },
];

const aValuesData = [
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

const waterLossData = [
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

// --- COMPONENTS ---
interface OverviewKpiCardProps {
    icon: ComponentType<{ className?: string }>;
    title: string;
    value: string;
    subtitle: string;
    iconColor: string;
    bgColor: string;
}

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

const Overview: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    const tickColor = isDarkMode ? '#A1A1AA' : '#6B7280';
    const [activeAValuesTab, setActiveAValuesTab] = useState('All');
    const [activeLossTab, setActiveLossTab] = useState('All Stages');

    const tooltipProps = {
        formatter: (value: number) => `${(value / 1000).toFixed(0)}k`,
        contentStyle: {
            backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
            borderColor: isDarkMode ? '#374151' : '#E5E7EB',
            borderRadius: '0.5rem'
        }
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
            </Card>

            <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <input type="text" value="January 2025" readOnly className="w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 focus:outline-none"/>
                        <span className="text-gray-500">to</span>
                        <input type="text" value="September 2025" readOnly className="w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 focus:outline-none"/>
                    </div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Jan-25 - Sep-25</p>
                    <button className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors">
                        Reset Range
                    </button>
                </div>
                <div className="relative pt-2">
                     <input type="range" min="0" max="8" defaultValue="8" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-accent" />
                     <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map(m => <span key={m}>{m}</span>)}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData.map(kpi => <OverviewKpiCard key={kpi.title} {...kpi} />)}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                        <h3 className="text-xl font-bold">Water System A-Values Distribution</h3>
                        <div className="flex space-x-4 text-sm font-medium">
                            {['All', 'A1 Only', 'A2 Only', 'A3 Individual'].map(tab => (
                                <button key={tab} onClick={() => setActiveAValuesTab(tab)} className={`${activeAValuesTab === tab ? 'text-accent border-b-2 border-accent' : 'text-gray-500 dark:text-gray-400'}`}>
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={aValuesData}>
                            <defs>
                                <linearGradient id="colorA1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                                <linearGradient id="colorA2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/><stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
                            <XAxis dataKey="name" stroke={tickColor} />
                            <YAxis stroke={tickColor} tickFormatter={(tick) => `${tick / 1000}k`} />
                            <Tooltip {...tooltipProps} />
                            <Legend wrapperStyle={{fontSize: '12px'}} />
                            <Area type="monotone" dataKey="A1 - Main Source" stroke="#3b82f6" fillOpacity={1} fill="url(#colorA1)" />
                            <Area type="monotone" dataKey="A2 - Zone Distribution" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorA2)" />
                            <Area type="monotone" dataKey="A3 - Individual" stroke="#60a5fa" fill="transparent" />
                            <Brush dataKey="name" height={30} stroke="#00D2B3" fill={isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'} />
                        </AreaChart>
                    </ResponsiveContainer>
                </Card>

                <Card>
                    <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                        <h3 className="text-xl font-bold">Water Loss Analysis</h3>
                         <div className="flex space-x-4 text-sm font-medium">
                            {['All Stages', 'Total Only', 'Stage 1 & 2'].map(tab => (
                                <button key={tab} onClick={() => setActiveLossTab(tab)} className={`${activeLossTab === tab ? 'text-accent border-b-2 border-accent' : 'text-gray-500 dark:text-gray-400'}`}>
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={waterLossData}>
                            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
                            <XAxis dataKey="name" stroke={tickColor} />
                            <YAxis stroke={tickColor} tickFormatter={(tick) => `${tick / 1000}k`} />
                            <Tooltip {...tooltipProps} />
                            <Legend wrapperStyle={{fontSize: '12px'}}/>
                            <Line type="monotone" dataKey="Total Loss" stroke="#ef4444" strokeWidth={2} />
                            <Line type="monotone" dataKey="Stage 1 Loss" stroke="#f87171" strokeDasharray="5 5" />
                            <Line type="monotone" dataKey="Stage 2 Loss" stroke="#fb923c" strokeDasharray="5 5" />
                            <Brush dataKey="name" height={30} stroke="#00D2B3" fill={isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'} />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>
            </div>
        </div>
    );
};

export default Overview;
