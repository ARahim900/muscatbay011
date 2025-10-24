import React, { useState, type ComponentType } from 'react';
import Card from '../../ui/Card';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDarkMode } from '../../../context/DarkModeContext';
import { Droplets, Recycle, Truck, DollarSign, TrendingUp, BarChart2, Percent, Droplets as DropletsIcon, Plus, ChevronDown } from 'lucide-react';

// --- MOCK DATA ---
const kpiData = [
  { icon: Droplets, title: 'INLET SEWAGE', value: '248,371 m³', subtitle: 'Range: Jul-24 - Sep-25', iconColor: 'text-yellow-500', bgColor: 'bg-yellow-100 dark:bg-yellow-900/50' },
  { icon: Recycle, title: 'TSE FOR IRRIGATION', value: '237,514 m³', subtitle: 'Recycled water output', iconColor: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-900/50' },
  { icon: Truck, title: 'TANKER TRIPS', value: '4,292 trips', subtitle: '@ 4.50 OMR/Trip', iconColor: 'text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-900/50' },
  { icon: DollarSign, title: 'GENERATED INCOME', value: '19314.00 OMR', subtitle: 'Tanker discharge fees', iconColor: 'text-red-500', bgColor: 'bg-red-100 dark:bg-red-900/50' },
  { icon: TrendingUp, title: 'WATER SAVINGS', value: '313503.04 OMR', subtitle: '@ 1.32 OMR per m³ TSE', iconColor: 'text-purple-500', bgColor: 'bg-purple-100 dark:bg-purple-900/50' },
  { icon: BarChart2, title: 'TOTAL ECONOMIC IMPACT', value: '332817.04 OMR', subtitle: 'Income + Savings', iconColor: 'text-teal-500', bgColor: 'bg-teal-100 dark:bg-teal-900/50' },
  { icon: Percent, title: 'TREATMENT EFFICIENCY', value: '95.6%', subtitle: 'TSE output vs inlet ratio', iconColor: 'text-orange-500', bgColor: 'bg-orange-100 dark:bg-orange-900/50' },
  { icon: DropletsIcon, title: 'DAILY AVERAGE INLET', value: '543 m³', subtitle: 'Average daily input', iconColor: 'text-lime-500', bgColor: 'bg-lime-100 dark:bg-lime-900/50' },
];

const waterVolumesData = Array.from({ length: 15 }, (_, i) => ({ name: new Date(2024, 6 + i, 1).toLocaleString('default', { month: 'short', year: '2-digit' }).replace(' ', '-'), inlet: 15000 + Math.random() * 2000, output: 14000 + Math.random() * 2000 }));
const economicImpactData = Array.from({ length: 15 }, (_, i) => ({ name: new Date(2024, 6 + i, 1).toLocaleString('default', { month: 'short', year: '2-digit' }).replace(' ', '-'), impact: 15000 + Math.random() * 12000 }));
const tankerOperationsData = Array.from({ length: 15 }, (_, i) => ({ name: new Date(2024, 6 + i, 1).toLocaleString('default', { month: 'short', year: '2-digit' }).replace(' ', '-'), trips: 150 + Math.random() * 300 }));

const dailyOperationsData = Array.from({ length: 30 }, (_, i) => {
    const inlet = 300 + Math.random() * 400;
    const output = inlet * (0.8 + Math.random() * 0.25);
    const trips = Math.floor(Math.random() * 20);
    const income = trips * 4.5;
    const savings = output * 1.32;
    return {
        date: `0${i + 1}/09/2025`.slice(-10),
        inlet: Math.round(inlet),
        tseOutput: Math.round(output),
        efficiency: (output / inlet) * 100,
        tankerTrips: trips,
        income: income.toFixed(2),
        savings: savings.toFixed(2),
        totalImpact: (income + savings).toFixed(2),
    };
});


// --- COMPONENTS ---
interface StpKpiCardProps {
    icon: ComponentType<{ className?: string }>;
    title: string;
    value: string;
    subtitle: string;
    iconColor: string;
    bgColor: string;
}

const StpKpiCard: React.FC<StpKpiCardProps> = ({ icon: Icon, title, value, subtitle, iconColor, bgColor }) => (
    <Card className="!p-4">
        <div className="flex items-start space-x-3">
            <div className={`p-3 rounded-lg ${bgColor}`}>
                <Icon className={`w-6 h-6 ${iconColor}`} />
            </div>
            <div>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 tracking-wider">{title}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
            </div>
        </div>
    </Card>
);

const EfficiencyPill: React.FC<{ value: number }> = ({ value }) => {
    let colorClasses = '';
    if (value >= 100) colorClasses = 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300';
    else if (value >= 90) colorClasses = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    else if (value >= 80) colorClasses = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    else colorClasses = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';

    return <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${colorClasses}`}>{value.toFixed(1)}%</span>
};

const Dashboard: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    const tickColor = isDarkMode ? '#A1A1AA' : '#6B7280';
    
    return (
        <div className="space-y-6">
            <Card className="!p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <input type="text" value="July 2024" readOnly className="w-40 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 focus:outline-none"/>
                        <span className="text-gray-500">to</span>
                        <input type="text" value="September 2025" readOnly className="w-40 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 focus:outline-none"/>
                    </div>
                     <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Jul-24 - Sep-25</p>
                    <button className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors">
                        Reset Range
                    </button>
                </div>
                <div className="relative pt-4">
                     <input type="range" min="0" max="14" defaultValue="[0, 14]" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-accent" />
                     <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {['Jul', 'Sep', 'Nov', 'Jan', 'Mar', 'May', 'Jul', 'Sep'].map((m, i) => <span key={i}>{m}</span>)}
                    </div>
                </div>
            </Card>

            <Card className="!p-4 bg-gray-50 dark:bg-gray-800/50">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    Current STP economic rates applied when missing in records: <span className="font-semibold text-gray-800 dark:text-white">Discharge Fee = 4.50 OMR/trip</span>, <span className="font-semibold text-gray-800 dark:text-white">TSE Saving = 1.32 OMR per m³.</span>
                    <span className="text-xs ml-2 text-gray-400">Tip: Update rates in data if they change; page auto-computes totals accordingly.</span>
                </p>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData.map(kpi => <StpKpiCard key={kpi.title} {...kpi} />)}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
                 <button className="absolute -top-3 -right-3 z-10 w-12 h-12 bg-primary rounded-full text-white flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all">
                    <Plus size={24} />
                </button>
                <Card className="lg:col-span-2">
                    <h3 className="text-xl font-bold">Monthly Water Treatment Volumes (m³)</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Sewage inlet vs TSE output comparison</p>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={waterVolumesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="inletGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#82ca9d" stopOpacity={0.6}/><stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/></linearGradient>
                                <linearGradient id="outputGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ffc658" stopOpacity={0.6}/><stop offset="95%" stopColor="#ffc658" stopOpacity={0}/></linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
                            <XAxis dataKey="name" stroke={tickColor} />
                            <YAxis stroke={tickColor} tickFormatter={(v) => `${v/1000}k`} />
                            <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF', borderColor: isDarkMode ? '#374151' : '#E5E7EB' }} />
                            <Area type="monotone" dataKey="inlet" stackId="1" stroke="#82ca9d" fill="url(#inletGradient)" />
                            <Area type="monotone" dataKey="output" stackId="1" stroke="#ffc658" fill="url(#outputGradient)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </Card>
                
                <Card>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><DollarSign size={20} className="text-green-500"/> Monthly Economic Impact (OMR)</h3>
                     <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={economicImpactData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} vertical={false}/>
                            <XAxis dataKey="name" stroke={tickColor} tick={{ fontSize: 12 }} />
                            <YAxis stroke={tickColor} tickFormatter={(v) => `${v/1000}k`} />
                            <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF', borderColor: isDarkMode ? '#374151' : '#E5E7EB' }} />
                            <Bar dataKey="impact" fill="#00D2B3" barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                <Card>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Truck size={20} className="text-orange-500"/> Monthly Tanker Operations</h3>
                     <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={tankerOperationsData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
                            <XAxis dataKey="name" stroke={tickColor} tick={{ fontSize: 12 }} />
                            <YAxis stroke={tickColor} />
                            <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF', borderColor: isDarkMode ? '#374151' : '#E5E7EB' }} />
                            <Line type="monotone" dataKey="trips" stroke="#ff7300" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            <Card className="relative">
                <button className="absolute top-6 right-6 z-10 w-12 h-12 bg-primary rounded-full text-white flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all">
                    <Plus size={24} />
                </button>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div>
                        <h3 className="text-xl font-bold">Daily Operations Log</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Detailed daily STP operation records</p>
                    </div>
                    <div className="relative">
                        <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1 text-right">Select Month for Daily View</label>
                        <select defaultValue="September 2025" className="appearance-none w-48 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-accent">
                            <option>September 2025</option>
                            <option>August 2025</option>
                        </select>
                        <ChevronDown className="w-4 h-4 absolute right-3 bottom-2.5 pointer-events-none" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                {['Date', 'Inlet (m³)', 'TSE Output (m³)', 'Efficiency %', 'Tanker Trips', 'Income (OMR)', 'Savings (OMR)', 'Total Impact (OMR)'].map(h => 
                                <th key={h} scope="col" className="px-4 py-3">{h}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {dailyOperationsData.map((row, i) => (
                                <tr key={i} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-4 py-3">{row.date}</td>
                                    <td className="px-4 py-3">{row.inlet}</td>
                                    <td className="px-4 py-3">{row.tseOutput}</td>
                                    <td className="px-4 py-3"><EfficiencyPill value={row.efficiency} /></td>
                                    <td className="px-4 py-3">{row.tankerTrips}</td>
                                    <td className="px-4 py-3 text-green-600 dark:text-green-400 font-medium">{row.income}</td>
                                    <td className="px-4 py-3 text-blue-600 dark:text-blue-400 font-medium">{row.savings}</td>
                                    <td className="px-4 py-3 text-purple-600 dark:text-purple-400 font-bold">{row.totalImpact}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

        </div>
    );
};

export default Dashboard;