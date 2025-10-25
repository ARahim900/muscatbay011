import React, { useState, useMemo } from 'react';
import Overview from './electricity/Overview';
import AnalysisByType from './electricity/AnalysisByType';
import Database from './electricity/Database';
import PlaceholderModule from './PlaceholderModule';
import { electricityFullData, monthsOrder } from '../../data/electricityFullData';

const ELECTRICITY_TABS = ['Overview', 'Analysis by Type', 'Database'];

const ElectricityModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  
  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    electricityFullData.forEach(meter => {
      meter.readings.forEach(reading => {
        months.add(reading.month);
      });
    });
    return Array.from(months).sort((a, b) => monthsOrder.indexOf(a) - monthsOrder.indexOf(b));
  }, []);

  const [startMonth, setStartMonth] = useState(availableMonths[0]);
  const [endMonth, setEndMonth] = useState(availableMonths[availableMonths.length - 1]);

  const renderContent = () => {
    const props = {
      allData: electricityFullData,
      availableMonths,
      startMonth,
      endMonth,
      setStartMonth,
      setEndMonth,
      monthsOrder
    };

    switch (activeTab) {
      case 'Overview':
        return <Overview {...props} />;
      case 'Analysis by Type':
        return <AnalysisByType {...props} />;
      case 'Database':
        return <Database />;
      default:
        return <PlaceholderModule title={`${activeTab} - Electricity`} />;
    }
  };

  return (
    <div>
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {ELECTRICITY_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? 'border-accent text-accent'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500'
              } whitespace-nowrap py-4 px-2 border-b-2 font-medium text-base transition-colors duration-200`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div>
        {renderContent()}
      </div>
    </div>
  );
};

export default ElectricityModule;
