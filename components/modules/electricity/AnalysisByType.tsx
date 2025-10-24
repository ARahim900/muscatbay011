import React from 'react';
import Card from '../../ui/Card';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useDarkMode } from '../../../context/DarkModeContext';

// --- MOCK DATA ---
const filterChips = ['All', 'D Building', 'IRR', 'PS', 'Street Light', 'FP-Landscape Lights Z3', 'DB', 'Common Building', 'LS', 'Retail', 'Beach well'];

const monthlyTrendData = [
    { name: 'Apr-24', kWh: 85000 }, { name: 'May-24', kWh: 120000 }, { name: 'Jun-24', kWh: 115000 }, { name: 'Jul-24', kWh: 140000 },
    { name: 'Aug-24', kWh: 130000 }, { name: 'Sep-24', kWh: 125000 }, { name: 'Oct-24', kWh: 120000 }, { name: 'Nov-24', kWh: 110000 },
    { name: 'Dec-24', kWh: 100000 }, { name: 'Jan-25', kWh: 95000 }, { name: 'Feb-25', kWh: 75000 }, { name: 'Mar-25', kWh: 115000 },
    { name: 'Apr-25', kWh: 140000 }, { name: 'May-25', kWh: 160000 }, { name: 'Jun-25', kWh: 220000 },
];

const meterDetailsData = [
    { name: 'D Building 58', account: 'R54615', consumption: '25,915 kWh', cost: '647.88 OMR' },
    { name: 'Pumping Station 01', account: 'R52321', consumption: '27,373 kWh', cost: '684.33 OMR' },
    { name: 'Irrigation Tank 02', account: 'R52323', consumption: '15,911 kWh', cost: '397.78 OMR' },
    { name: 'Street Light FP 02', account: 'R51905', consumption: '29,017 kWh', cost: '725.43 OMR' },
    { name: 'Actuator DB 01 (DB)', account: 'R53196', consumption: '501 kWh', cost: '12.52 OMR' },
    { name: 'D Building 52', account: 'R53275', consumption: '20,032 kWh', cost: '500.80 OMR' },
    { name: 'D Building 17', account: 'R54626', consumption: '10,212 kWh', cost: '255.30 OMR' },
    { name: 'Pumping Station 03', account: 'R52329', consumption: '1,571 kWh', cost: '39.27 OMR' },
    { name: 'D Building 33', account: 'R52715', consumption: '22,395 kWh', cost: '559.88 OMR' },
    { name: 'D Building 50', account: 'R52717', consumption: '23,108 kWh', cost: '577.70 OMR' },
    { name: 'D Building 03', account: 'R54782', consumption: '18,674 kWh', cost: '466.85 OMR' },
    { name: 'Beachwell', account: 'R52332', consumption: '359,762 kWh', cost: '8994.05 OMR' },
];

const AnalysisByType: React.FC = () => {
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
            
            <div className="flex flex-wrap gap-2">
                {filterChips.map((chip, index) => (
                    <button key={chip} className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${index === 0 ? 'bg-accent text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}`}>
                        {chip}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="flex flex-col justify-center items-center text-center">
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">TOTAL CONSUMPTION</p>
                    <p className="text-4xl font-bold text-gray-800 dark:text-white my-2">1967.48 <span className="text-2xl">MWH</span></p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">1,967,482 kWh</p>
                </Card>
                 <Card className="flex flex-col justify-center items-center text-center">
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">TOTAL COST</p>
                    <p className="text-4xl font-bold text-gray-800 dark:text-white my-2">49187.05 <span className="text-2xl">OMR</span></p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">@ 0.025 OMR/kWh</p>
                </Card>
            </div>

            <Card>
                <h3 className="text-xl font-bold mb-4">Monthly trend for all (kWh)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyTrendData} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                         <defs>
                            <linearGradient id="analysisGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00D2B3" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#00D2B3" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} vertical={false} />
                        <XAxis dataKey="name" stroke={tickColor} dy={10} />
                        <YAxis stroke={tickColor} tickFormatter={(tick) => `${tick / 1000}k`} />
                        <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF', borderColor: isDarkMode ? '#374151' : '#E5E7EB' }} />
                        <Area type="monotone" dataKey="kWh" stroke="#00D2B3" strokeWidth={3} fill="url(#analysisGradient)" />
                    </AreaChart>
                </ResponsiveContainer>
            </Card>

            <Card>
                <h3 className="text-xl font-bold mb-4">Meter Details for all</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                {['Name', 'Account #', 'Consumption (Range)', 'Cost (Range)'].map(h => 
                                <th key={h} scope="col" className="px-6 py-3">{h}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {meterDetailsData.slice(0, 20).map((row, i) => (
                                <tr key={i} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{row.name}</th>
                                    <td className="px-6 py-4">{row.account}</td>
                                    <td className="px-6 py-4">{row.consumption}</td>
                                    <td className="px-6 py-4">{row.cost}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default AnalysisByType;
