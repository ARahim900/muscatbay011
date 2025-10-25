import React, { useState, useMemo, useEffect } from 'react';
import Card from '../../ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Line } from 'recharts';
import { useDarkMode } from '../../../context/DarkModeContext';
import { RefreshCw, ChevronDown, Plus, Search, MoreVertical, ArrowUpDown } from 'lucide-react';

// --- MOCK DATA ---
const doughnutData = {
  bulk: { value: 1966, percentage: 100.0 },
  individual: { value: 2186, percentage: 100.0 },
  loss: { value: 220, percentage: 11.2 },
};

const zoneConsumptionTrendData = [
  { name: 'Jan-25', 'Zone Bulk': 1800, 'Individual Total': 2100, Loss: 300 },
  { name: 'Feb-25', 'Zone Bulk': 2000, 'Individual Total': 2200, Loss: 200 },
  { name: 'Mar-25', 'Zone Bulk': 1900, 'Individual Total': 2150, Loss: 250 },
  { name: 'Apr-25', 'Zone Bulk': 2100, 'Individual Total': 2300, Loss: 200 },
  { name: 'May-25', 'Zone Bulk': 2250, 'Individual Total': 2400, Loss: 150 },
  { name: 'Jun-25', 'Zone Bulk': 2100, 'Individual Total': 2200, Loss: 100 },
  { name: 'Jul-25', 'Zone Bulk': 2050, 'Individual Total': 2150, Loss: 100 },
  { name: 'Aug-25', 'Zone Bulk': 2150, 'Individual Total': 2250, Loss: 100 },
  { name: 'Sep-25', 'Zone Bulk': 2000, 'Individual Total': 2100, Loss: 100 },
];


const individualMetersData = [
    { label: 'Building CIF/CB', account: '4300324', type: 'Building Bulk', may: 284, jun: 241, jul: 443, aug: 731, sep: 484, total: 2183, status: 'Active' },
    { label: 'Building B1', account: '4300300', type: 'Building Bulk', may: 233, jun: 144, jul: 229, aug: 298, sep: 256, total: 1160, status: 'Active' },
    { label: 'Building B8', account: '4300307', type: 'Building Bulk', may: 413, jun: 213, jul: 62, aug: 84, sep: 371, total: 1143, status: 'Active' },
    { label: 'Building B6', account: '4300305', type: 'Building Bulk', may: 214, jun: 194, jul: 196, aug: 210, sep: 210, total: 1024, status: 'Active' },
    { label: 'Building B2', account: '4300301', type: 'Building Bulk', may: 199, jun: 171, jul: 191, aug: 240, sep: 212, total: 1013, status: 'Active' },
    { label: 'Building B7', account: '4300306', type: 'Building Bulk', may: 200, jun: 154, jul: 192, aug: 155, sep: 158, total: 859, status: 'Active' },
    { label: 'Building B4', account: '4300303', type: 'Building Bulk', may: 121, jun: 149, jul: 159, aug: 179, sep: 201, total: 809, status: 'Active' },
    { label: 'Building B3', account: '4300302', type: 'Building Bulk', may: 160, jun: 131, jul: 170, aug: 149, sep: 156, total: 766, status: 'Active' },
    { label: 'Building B5', account: '4300304', type: 'Building Bulk', may: 0, jun: 179, jul: 62, aug: 54, sep: 39, total: 334, status: 'Active' },
    { label: 'Cabinet FM (CONTRACTORS OFFICE)', account: '4300337', type: 'Building Bulk', may: 51, jun: 49, jul: 56, aug: 49, sep: 39, total: 244, status: 'Active' },
    { label: 'Building B9', account: '4300308', type: 'Building Bulk', may: 150, jun: 160, jul: 170, aug: 180, sep: 190, total: 850, status: 'Active' },
    { label: 'Building B10', account: '4300309', type: 'Building Bulk', may: 110, jun: 120, jul: 130, aug: 140, sep: 150, total: 650, status: 'Active' },
    { label: 'Building B11', account: '4300310', type: 'Building Bulk', may: 210, jun: 220, jul: 230, aug: 240, sep: 250, total: 1150, status: 'Active' },
    { label: 'Building B12', account: '4300311', type: 'Building Bulk', may: 310, jun: 320, jul: 330, aug: 340, sep: 350, total: 1650, status: 'Inactive' },
    { label: 'Building C1', account: '4300401', type: 'Villa', may: 50, jun: 55, jul: 60, aug: 65, sep: 70, total: 300, status: 'Active' },
    { label: 'Building C2', account: '4300402', type: 'Villa', may: 40, jun: 45, jul: 50, aug: 55, sep: 60, total: 250, status: 'Active' },
    { label: 'Building C3', account: '4300403', type: 'Villa', may: 70, jun: 75, jul: 80, aug: 85, sep: 90, total: 400, status: 'Active' },
];

interface SimpleDoughnutCardProps {
  title: string;
  value: number;
  percentage: number;
  color: string;
  darkColor: string;
  footer: string;
}

const SimpleDoughnutCard: React.FC<SimpleDoughnutCardProps> = ({ title, value, percentage, color, darkColor, footer }) => {
    const { isDarkMode } = useDarkMode();
    const chartColor = isDarkMode ? darkColor : color;
    const data = [{ name: 'value', value: percentage }, { name: 'remaining', value: 100 - percentage }];
    
    const isLoss = title.includes('Loss');
    const endAngle = isLoss ? 90 - (360 * (percentage/100)) : -270;

    return (
        <Card className="!p-6 text-center">
            <h4 className="text-base font-semibold text-gray-600 dark:text-gray-400">{title}</h4>
            <div className="relative w-40 h-40 mx-auto my-4">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={data} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={65} startAngle={90} endAngle={endAngle} paddingAngle={0} stroke="none">
                            <Cell fill={chartColor} cornerRadius={isLoss ? 50 : 0} />
                            <Cell fill={isDarkMode ? '#374151' : '#E5E7EB'} />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-3xl font-bold text-gray-800 dark:text-white">{value.toLocaleString()}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-300">m³</span>
                    {percentage && <span className="text-sm font-semibold mt-1" style={{color: chartColor}}>{percentage.toFixed(1)}%</span>}
                </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{footer}</p>
        </Card>
    );
};

const ZoneAnalysis: React.FC = () => {
    const { isDarkMode } = useDarkMode();
    const tickColor = isDarkMode ? '#A1A1AA' : '#6B7280';

    const [selectedMonth, setSelectedMonth] = useState('Sep-25');
    const [selectedZone, setSelectedZone] = useState('Zone 01 (FM)');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [typeFilter, setTypeFilter] = useState('All Types');
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const filteredData = useMemo(() => {
        return individualMetersData.filter(meter => {
            const statusMatch = statusFilter === 'All Status' || meter.status === statusFilter;
            const typeMatch = typeFilter === 'All Types' || meter.type === typeFilter;
            const searchMatch = searchTerm === '' ||
                meter.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                meter.account.toLowerCase().includes(searchTerm.toLowerCase());
            return statusMatch && typeMatch && searchMatch;
        });
    }, [statusFilter, typeFilter, searchTerm]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [filteredData]);

    const paginatedData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handleReset = () => {
        setSelectedMonth('Sep-25');
        setSelectedZone('Zone 01 (FM)');
        setStatusFilter('All Status');
        setTypeFilter('All Types');
        setSearchTerm('');
    };


    return (
        <div className="space-y-8">
            <Card>
                 <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="relative">
                            <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Select Month</label>
                            <select 
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="appearance-none w-40 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-accent">
                                <option>Sep-25</option>
                                <option>Aug-25</option>
                                <option>Jul-25</option>
                            </select>
                            <ChevronDown className="w-4 h-4 absolute right-3 bottom-2.5 pointer-events-none" />
                        </div>
                         <div className="relative">
                            <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Filter by Zone</label>
                            <select 
                                value={selectedZone}
                                onChange={(e) => setSelectedZone(e.target.value)}
                                className="appearance-none w-40 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-accent">
                                <option>Zone 01 (FM)</option>
                                <option>Zone 02 (RM)</option>
                            </select>
                             <ChevronDown className="w-4 h-4 absolute right-3 bottom-2.5 pointer-events-none" />
                        </div>
                    </div>
                    <div className="self-end">
                        <button 
                            onClick={handleReset}
                            className="flex items-center gap-2 bg-accent text-white py-2 px-4 rounded-md hover:bg-accent/90 transition-colors">
                            <RefreshCw className="w-4 h-4" />
                            Reset Filters
                        </button>
                    </div>
                </div>
            </Card>

            <div className="text-center">
                <h2 className="text-2xl font-bold">{selectedZone} Analysis for {selectedMonth}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Zone Bulk = L2 only • L3/L4 Total = L3 + L4 (included for this zone) • Difference = L2 – (L3 + L4)</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SimpleDoughnutCard title="Zone Bulk Meter Total" value={doughnutData.bulk.value} percentage={doughnutData.bulk.percentage} color="#3b82f6" darkColor="#60a5fa" footer={`Total input for ${selectedZone} • ${selectedMonth}`} />
                <SimpleDoughnutCard title="Individual Meters Sum Total" value={doughnutData.individual.value} percentage={doughnutData.individual.percentage} color="#00D2B3" darkColor="#00D2B3" footer="Recorded by individual meters (100.0%)" />
                <SimpleDoughnutCard title="Water Loss Distribution" value={doughnutData.loss.value} percentage={doughnutData.loss.percentage} color="#ef4444" darkColor="#f87171" footer="Unaccounted for water" />
            </div>

            <Card>
                <h3 className="text-xl font-bold">Zone Consumption Trend</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Monthly comparison of L2 (bulk) vs L3 + L4 totals</p>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={zoneConsumptionTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="consumptionGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#A2D0C8" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#A2D0C8" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
                        <XAxis dataKey="name" stroke={tickColor} />
                        <YAxis stroke={tickColor} />
                        <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF', borderColor: isDarkMode ? '#374151' : '#E5E7EB' }} />
                        <Legend wrapperStyle={{ color: tickColor, paddingTop: '10px' }} />
                        <Area type="monotone" dataKey="Individual Total" stroke="none" fill="url(#consumptionGradient)" />
                        <Line type="monotone" dataKey="Zone Bulk" stroke="#3b82f6" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="Individual Total" stroke="#00D2B3" strokeWidth={2} dot={false} />
                    </AreaChart>
                </ResponsiveContainer>
            </Card>

            <Card className="relative">
                <button className="absolute top-6 right-6 z-10 w-12 h-12 bg-primary rounded-full text-white flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all">
                    <Plus size={24} />
                </button>
                <div className="mb-4">
                    <h3 className="text-xl font-bold">Individual Meters - {selectedZone}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">All individual meters (L3 Villas + L3 Building Bulk) in this zone</p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div className="relative flex-grow max-w-sm">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search meters or accounts..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-accent" />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                             <select 
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="appearance-none w-32 bg-gray-100 dark:bg-gray-700 border border-transparent rounded-md py-2 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-accent">
                                <option>All Status</option>
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>
                            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                         <div className="relative">
                             <select 
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                className="appearance-none w-32 bg-gray-100 dark:bg-gray-700 border border-transparent rounded-md py-2 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-accent">
                                <option>All Types</option>
                                <option>Building Bulk</option>
                                <option>Villa</option>
                            </select>
                            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                {['Meter Label', 'Account #', 'Type', 'May-25', 'Jun-25', 'Jul-25', 'Aug-25', 'Sep-25'].map(h => <th key={h} scope="col" className="px-6 py-3">{h}</th>)}
                                <th scope="col" className="px-6 py-3">
                                    <div className="flex items-center gap-1 cursor-pointer">
                                        Total <ArrowUpDown size={14} />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((row, i) => (
                                <tr key={i} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 bg-white dark:bg-gray-800">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{row.label}</th>
                                    <td className="px-6 py-4">{row.account}</td>
                                    <td className="px-6 py-4"><span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">{row.type}</span></td>
                                    <td className="px-6 py-4">{row.may}</td>
                                    <td className="px-6 py-4">{row.jun}</td>
                                    <td className="px-6 py-4">{row.jul}</td>
                                    <td className="px-6 py-4">{row.aug}</td>
                                    <td className="px-6 py-4">{row.sep}</td>
                                    <td className="px-6 py-4 font-bold text-gray-800 dark:text-white">{row.total.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${row.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4"><button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"><MoreVertical size={20} /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                 <div className="flex flex-wrap items-center justify-between pt-4 text-sm text-gray-500 dark:text-gray-400">
                    <p>Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, filteredData.length)} of {filteredData.length} results</p>
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50">Previous</button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                             <button key={page} onClick={() => setCurrentPage(page)} className={`px-3 py-1 border rounded-md ${currentPage === page ? 'bg-accent text-white border-accent' : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>{page}</button>
                        ))}
                        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50">Next</button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ZoneAnalysis;