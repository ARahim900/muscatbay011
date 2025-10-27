
import React, { useState, useMemo, useRef, useEffect } from 'react';
import Card from '../../ui/Card';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Brush } from 'recharts';
import { useDarkMode } from '../../../context/DarkModeContext';
import { ElectricityMeterRaw } from '../../../data/electricityFullData';
import { Calendar } from 'lucide-react';

const OMR_PER_KWH = 0.025;

const filterChips = ['All', 'D_Building', 'IRR', 'PS', 'Street Light', 'FP-Landscape Lights Z3', 'DB', 'Common Building', 'LS', 'Retail', 'Beach well'];

interface AnalysisByTypeProps {
    allData: ElectricityMeterRaw[];
    availableMonths: string[];
    startMonth: string;
    endMonth: string;
    setStartMonth: (month: string) => void;
    setEndMonth: (month: string) => void;
    monthsOrder: string[];
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


const AnalysisByType: React.FC<AnalysisByTypeProps> = ({ allData, availableMonths, startMonth, endMonth, setStartMonth, setEndMonth, monthsOrder }) => {
    const { isDarkMode } = useDarkMode();
    const tickColor = isDarkMode ? '#A1A1AA' : '#6B7280';
    const [activeChip, setActiveChip] = useState('All');

    const {
        totalConsumption,
        monthlyTrendData,
        meterDetailsData
    } = useMemo(() => {
        const startIndex = monthsOrder.indexOf(startMonth);
        const endIndex = monthsOrder.indexOf(endMonth);

        if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
            return { totalConsumption: 0, monthlyTrendData: [], meterDetailsData: [] };
        }

        const selectedMonths = monthsOrder.slice(startIndex, endIndex + 1);
        const monthSet = new Set(selectedMonths);

        const filteredMetersByType = activeChip === 'All'
            ? allData
            : allData.filter(meter => meter.type === activeChip);
        
        const monthlyTotals: { [key: string]: number } = {};
        selectedMonths.forEach(m => monthlyTotals[m] = 0);
        
        let consumptionSum = 0;

        const details = filteredMetersByType.map(meter => {
            let meterTotalInRange = 0;
            meter.readings.forEach(reading => {
                if(monthSet.has(reading.month)) {
                    meterTotalInRange += reading.consumption;
                    monthlyTotals[reading.month] = (monthlyTotals[reading.month] || 0) + reading.consumption;
                }
            });
            consumptionSum += meterTotalInRange;
            return {
                id: meter.id,
                name: meter.name,
                account: meter.account,
                consumption: meterTotalInRange,
                cost: meterTotalInRange * OMR_PER_KWH,
            };
        });
        
        const trend = selectedMonths.map(month => ({
            name: month,
            kWh: monthlyTotals[month] || 0
        }));

        return {
            totalConsumption: consumptionSum,
            monthlyTrendData: trend,
            meterDetailsData: details,
        };

    }, [allData, startMonth, endMonth, activeChip, monthsOrder]);

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="flex flex-col justify-center items-center text-center">
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">TOTAL CONSUMPTION ({activeChip})</p>
                    <p className="text-4xl font-bold text-gray-800 dark:text-white my-2">{(totalConsumption / 1000000).toFixed(2)} <span className="text-2xl">MWH</span></p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{totalConsumption.toLocaleString('en-US', {maximumFractionDigits: 0})} kWh</p>
                </Card>
                 <Card className="flex flex-col justify-center items-center text-center">
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">TOTAL COST ({activeChip})</p>
                    <p className="text-4xl font-bold text-gray-800 dark:text-white my-2">{(totalConsumption * OMR_PER_KWH).toLocaleString('en-US', {maximumFractionDigits: 2})} <span className="text-2xl">OMR</span></p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">@ {OMR_PER_KWH} OMR/kWh</p>
                </Card>
            </div>

            <Card>
                <h3 className="text-xl font-bold mb-4">Monthly trend for {activeChip} (kWh)</h3>
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
                        <Brush dataKey="name" height={30} stroke="#00D2B3" fill={isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'} />
                    </AreaChart>
                </ResponsiveContainer>
            </Card>

            <Card>
                <h3 className="text-xl font-bold mb-4">Meter Details for {activeChip}</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                {['Name', 'Account #', 'Consumption (Range)', 'Cost (Range)'].map(h => 
                                <th key={h} scope="col" className="px-6 py-3">{h}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {meterDetailsData.length > 0 ? meterDetailsData.map((row) => (
                                <tr key={row.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{row.name}</th>
                                    <td className="px-6 py-4">{row.account}</td>
                                    <td className="px-6 py-4">{row.consumption.toLocaleString('en-US', {maximumFractionDigits: 0})} kWh</td>
                                    <td className="px-6 py-4">{row.cost.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} OMR</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="text-center py-10 text-gray-500 dark:text-gray-400">
                                        No meters found for the selected type and date range.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default AnalysisByType;
