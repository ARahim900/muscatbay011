import React, { ComponentType } from 'react';
import Card from '../../ui/Card';
// Fix: Import CartesianGrid to resolve 'Cannot find name 'CartesianGrid''.
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { useDarkMode } from '../../../context/DarkModeContext';
import { Zap, DollarSign, MapPin, TrendingUp } from 'lucide-react';

// --- MOCK DATA ---
const kpiData = [
    { icon: Zap, title: "TOTAL CONSUMPTION", value: "1967.48 MWH", subValue: "1,967,482 kWh", color: "text-yellow-500", bgColor: "bg-yellow-100 dark:bg-yellow-900/50" },
    { icon: DollarSign, title: "TOTAL COST", value: "49187.05 OMR", subValue: "@ 0.025 OMR/kWh", color: "text-green-500", bgColor: "bg-green-100 dark:bg-green-900/50" },
    { icon: MapPin, title: "METER COUNT", value: "56", subValue: "type: all", color: "text-blue-500", bgColor: "bg-blue-100 dark:bg-blue-900/50" },
    { icon: TrendingUp, title: "HIGHEST CONSUMER", value: "Beachwell", subValue: "359,762 kWh", color: "text-pink-500", bgColor: "bg-pink-100 dark:bg-pink-900/50" },
];

const monthlyConsumptionData = [
    { name: 'Apr-24', kWh: 85000 },
    { name: 'May-24', kWh: 120000 },
    { name: 'Jun-24', kWh: 115000 },
    { name: 'Jul-24', kWh: 140000 },
    { name: 'Aug-24', kWh: 130000 },
    { name: 'Sep-24', kWh: 125000 },
    { name: 'Oct-24', kWh: 120000 },
    { name: 'Nov-24', kWh: 110000 },
    { name: 'Dec-24', kWh: 100000 },
    { name: 'Jan-25', kWh: 95000 },
    { name: 'Feb-25', kWh: 75000 },
    { name: 'Mar-25', kWh: 115000 },
    { name: 'Apr-25', kWh: 140000 },
    { name: 'May-25', kWh: 160000 },
    { name: 'Jun-25', kWh: 220000 },
];

const consumptionByTypeData = [
    { name: 'FP-Landscape Lights Z3', value: 50000 },
    { name: 'LS', value: 80000 },
    { name: 'PS', value: 120000 },
    { name: 'Retail', value: 200000 },
    { name: 'Common Building', value: 350000 },
    { name: 'D_Building', value: 480000 },
];
const barColors = ['#8884d8', '#82ca9d', '#ffc658', '#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


// --- COMPONENTS ---
interface ElectricityKpiCardProps {
    icon: ComponentType<{ className?: string }>;
    title: string;
    value: string;
    subValue: string;
    color: string;
    bgColor: string;
}

const ElectricityKpiCard: React.FC<ElectricityKpiCardProps> = ({ icon: Icon, title, value, subValue, color, bgColor }) => (
    <Card className="!p-5">
        <div className="flex items-center">
            <div className={`p-3 rounded-lg mr-4 ${bgColor}`}>
                <Icon className={`w-6 h-6 ${color}`} />
            </div>
            <div>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 tracking-wider">{title}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{subValue}</p>
            </div>
        </div>
    </Card>
);

const Overview: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    const tickColor = isDarkMode ? '#A1A1AA' : '#6B7280';
    
    return (
        <div className="space-y-6">
             <Card className="!p-4">
                 <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <input type="text" value="April 2024" readOnly className="w-40 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 focus:outline-none"/>
                        <span className="text-gray-500">to</span>
                        <input type="text" value="June 2025" readOnly className="w-40 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 focus:outline-none"/>
                    </div>
                    <button className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors">
                        Reset Range
                    </button>
                </div>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData.map(kpi => <ElectricityKpiCard key={kpi.title} {...kpi} />)}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <Card className="lg:col-span-3">
                    <h3 className="text-xl font-bold mb-4">Monthly Consumption Trend (kWh)</h3>
                    <ResponsiveContainer width="100%" height={350}>
                        <AreaChart data={monthlyConsumptionData} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="consumptionGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#FFC107" stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor="#FFC107" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} vertical={false} />
                            <XAxis dataKey="name" stroke={tickColor} dy={10} />
                            <YAxis stroke={tickColor} tickFormatter={(tick) => `${tick / 1000}k`} />
                            <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF', borderColor: isDarkMode ? '#374151' : '#E5E7EB' }} />
                            <Area type="monotone" dataKey="kWh" stroke="#FFC107" strokeWidth={3} fill="url(#consumptionGradient)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </Card>

                 <Card className="lg:col-span-2">
                    <h3 className="text-xl font-bold mb-4">Consumption by Type</h3>
                     <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={consumptionByTypeData} layout="vertical" margin={{ top: 10, right: 30, left: 30, bottom: 0 }}>
                            <XAxis type="number" stroke={tickColor} tickFormatter={(tick) => `${tick / 1000}k`} />
                            <YAxis type="category" dataKey="name" stroke={tickColor} width={100} tick={{ fontSize: 12 }} />
                            <Tooltip 
                                cursor={{fill: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}}
                                contentStyle={{ backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF', borderColor: isDarkMode ? '#374151' : '#E5E7EB' }} 
                            />
                            <Bar dataKey="value" barSize={15}>
                                {consumptionByTypeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </div>
        </div>
    );
};

export default Overview;