import React, { useMemo, ComponentType, useState, useRef, useEffect } from 'react';
import Card from '../../ui/Card';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid, Legend } from 'recharts';
import { useDarkMode } from '../../../context/DarkModeContext';
import { Zap, DollarSign, MapPin, TrendingUp, Calendar } from 'lucide-react';
import { ElectricityMeterRaw } from '../../../data/electricityFullData';

const OMR_PER_KWH = 0.025;
const barColors = ['#8884d8', '#82ca9d', '#ffc658', '#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface OverviewProps {
    allData: ElectricityMeterRaw[];
    availableMonths: string[];
    startMonth: string;
    endMonth: string;
    setStartMonth: (month: string) => void;
    setEndMonth: (month: string) => void;
    monthsOrder: string[];
}

interface ElectricityKpiCardProps {
    icon: ComponentType<{ className?: string }>;
    title: string;
    value: string;
    subValue: string;
    color: string;
    bgColor: string;
}

const MonthRangePicker: React.FC<{
    startMonth: string;
    endMonth: string;
    setStartMonth: (month: string) => void;
    setEndMonth: (month: string) => void;
    availableMonths: string[];
    monthsOrder: string[];
}> = ({ startMonth, endMonth, setStartMonth, setEndMonth, availableMonths, monthsOrder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectingStart, setSelectingStart] = useState(true);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const years = useMemo(() => {
        const grouped: { [year: string]: string[] } = {};
        availableMonths.forEach(month => {
            const year = `20${month.split('-')[1]}`;
            if (!grouped[year]) {
                grouped[year] = [];
            }
            grouped[year].push(month);
        });
        return Object.entries(grouped).sort(([yearA], [yearB]) => yearA.localeCompare(yearB));
    }, [availableMonths]);

    const handleMonthClick = (month: string) => {
        if (selectingStart) {
            setStartMonth(month);
            setEndMonth(month);
            setSelectingStart(false);
        } else {
            const startIndex = monthsOrder.indexOf(startMonth);
            const clickedIndex = monthsOrder.indexOf(month);
            if (clickedIndex < startIndex) {
                setStartMonth(month);
                setEndMonth(month);
                setSelectingStart(false);
            } else {
                setEndMonth(month);
                setSelectingStart(true);
                setIsOpen(false);
            }
        }
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSelectingStart(true);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const getMonthClass = (month: string) => {
        const base = "w-full text-center rounded-md py-2 cursor-pointer transition-colors text-sm";
        const startIndex = monthsOrder.indexOf(startMonth);
        const endIndex = monthsOrder.indexOf(endMonth);
        const currentIndex = monthsOrder.indexOf(month);
        
        const isInRange = currentIndex >= startIndex && currentIndex <= endIndex;

        if (isInRange) {
            if (startIndex === endIndex) return `${base} bg-accent text-white`;
            if (currentIndex === startIndex) return `${base} bg-accent text-white rounded-r-none`;
            if (currentIndex === endIndex) return `${base} bg-accent text-white rounded-l-none`;
            return `${base} bg-accent/20 text-accent dark:text-accent rounded-none`;
        }
        return `${base} hover:bg-gray-200 dark:hover:bg-gray-600`;
    };

    return (
        <div className="relative" ref={wrapperRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full sm:w-64 flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-accent"
            >
                <span className="font-medium">{startMonth} &ndash; {endMonth}</span>
                <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
            {isOpen && (
                <div className="absolute z-20 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl p-3">
                    {years.map(([year, months]) => (
                        <div key={year}>
                            <h4 className="font-bold text-center my-2 text-gray-700 dark:text-gray-300">{year}</h4>
                            <div className="grid grid-cols-4 gap-1">
                                {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((monthName) => {
                                    const monthFullName = months.find(m => m.startsWith(monthName));
                                    return monthFullName ? (
                                        <button 
                                            key={monthFullName}
                                            onClick={() => handleMonthClick(monthFullName)}
                                            className={getMonthClass(monthFullName)}
                                        >
                                            {monthName}
                                        </button>
                                    ) : (
                                        <div key={monthName} className="w-full text-center rounded-md py-2 text-sm text-gray-300 dark:text-gray-600 cursor-not-allowed">{monthName}</div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


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

const Overview: React.FC<OverviewProps> = ({ allData, availableMonths, startMonth, endMonth, setStartMonth, setEndMonth, monthsOrder }) => {
    const { isDarkMode } = useDarkMode();
    const tickColor = isDarkMode ? '#A1A1AA' : '#6B7280';

    const { 
        kpiData, 
        monthlyConsumptionData, 
        consumptionByTypeData 
    } = useMemo(() => {
        const startIndex = monthsOrder.indexOf(startMonth);
        const endIndex = monthsOrder.indexOf(endMonth);

        if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
            return { kpiData: [], monthlyConsumptionData: [], consumptionByTypeData: [] };
        }

        const selectedMonths = monthsOrder.slice(startIndex, endIndex + 1);
        const monthSet = new Set(selectedMonths);

        let totalConsumptionKwh = 0;
        const meterConsumption: { [key: string]: number } = {};
        const typeConsumption: { [key: string]: number } = {};
        const monthlyTotals: { [key: string]: number } = {};
        selectedMonths.forEach(m => monthlyTotals[m] = 0);

        allData.forEach(meter => {
            let meterTotal = 0;
            meter.readings.forEach(reading => {
                if (monthSet.has(reading.month)) {
                    totalConsumptionKwh += reading.consumption;
                    meterTotal += reading.consumption;
                    typeConsumption[meter.type] = (typeConsumption[meter.type] || 0) + reading.consumption;
                    monthlyTotals[reading.month] = (monthlyTotals[reading.month] || 0) + reading.consumption;
                }
            });
            meterConsumption[meter.name] = meterTotal;
        });

        const highestConsumer = Object.entries(meterConsumption).reduce((max, entry) => entry[1] > max[1] ? entry : max, ["", 0]);

        const calculatedKpiData = [
            { icon: Zap, title: "TOTAL CONSUMPTION", value: `${(totalConsumptionKwh / 1000000).toFixed(2)} MWH`, subValue: `${totalConsumptionKwh.toLocaleString('en-US', {maximumFractionDigits: 0})} kWh`, color: "text-yellow-500", bgColor: "bg-yellow-100 dark:bg-yellow-900/50" },
            { icon: DollarSign, title: "TOTAL COST", value: `${(totalConsumptionKwh * OMR_PER_KWH).toLocaleString('en-US', {maximumFractionDigits: 2})} OMR`, subValue: `@ ${OMR_PER_KWH} OMR/kWh`, color: "text-green-500", bgColor: "bg-green-100 dark:bg-green-900/50" },
            { icon: MapPin, title: "METER COUNT", value: allData.length.toString(), subValue: "type: all", color: "text-blue-500", bgColor: "bg-blue-100 dark:bg-blue-900/50" },
            { icon: TrendingUp, title: "HIGHEST CONSUMER", value: highestConsumer[0], subValue: `${highestConsumer[1].toLocaleString('en-US', {maximumFractionDigits: 0})} kWh`, color: "text-pink-500", bgColor: "bg-pink-100 dark:bg-pink-900/50" },
        ];
        
        const calculatedMonthlyData = selectedMonths.map(month => ({
            name: month,
            kWh: monthlyTotals[month] || 0
        }));

        const calculatedTypeData = Object.entries(typeConsumption)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => a.value - b.value);

        return { kpiData: calculatedKpiData, monthlyConsumptionData: calculatedMonthlyData, consumptionByTypeData: calculatedTypeData };
    }, [allData, startMonth, endMonth, monthsOrder]);

    const handleReset = () => {
        setStartMonth(availableMonths[0]);
        setEndMonth(availableMonths[availableMonths.length - 1]);
    };
    
    return (
        <div className="space-y-6">
             <Card className="!p-4">
                 <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4">
                        <MonthRangePicker
                            startMonth={startMonth}
                            endMonth={endMonth}
                            setStartMonth={setStartMonth}
                            setEndMonth={setEndMonth}
                            availableMonths={availableMonths}
                            monthsOrder={monthsOrder}
                        />
                    </div>
                    <button onClick={handleReset} className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors">
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
                            <XAxis dataKey="name" stroke={tickColor} dy={10} tick={{ fontSize: 12 }} />
                            <YAxis stroke={tickColor} tickFormatter={(tick) => `${tick / 1000}k`} />
                            <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF', borderColor: isDarkMode ? '#374151' : '#E5E7EB' }} />
                            <Legend />
                            <Area type="monotone" name="Consumption" dataKey="kWh" stroke="#FFC107" strokeWidth={3} fill="url(#consumptionGradient)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </Card>

                 <Card className="lg:col-span-2">
                    <h3 className="text-xl font-bold mb-4">Consumption by Type</h3>
                     <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={consumptionByTypeData} layout="vertical" margin={{ top: 10, right: 30, left: 30, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} horizontal={false} />
                            <XAxis type="number" stroke={tickColor} tickFormatter={(tick) => `${tick / 1000}k`} />
                            <YAxis type="category" dataKey="name" stroke={tickColor} width={100} tick={{ fontSize: 12 }} />
                            <Tooltip 
                                cursor={{fill: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}}
                                contentStyle={{ backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF', borderColor: isDarkMode ? '#374151' : '#E5E7EB' }} 
                            />
                            <Legend />
                            <Bar dataKey="value" name="Consumption (kWh)" barSize={15}>
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