import React, { useState } from 'react';
import PlaceholderModule from './PlaceholderModule';
import ZoneAnalysis from './water/ZoneAnalysis';
import ConsumptionByType from './water/ConsumptionByType';
import Overview from './water/Overview';
import Database from './water/Database';

const WATER_TABS = ['Overview', 'Performance KPIs', 'Zone Analysis', 'Consumption by Type', 'Main Database'];

const WaterModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  
  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <Overview />;
      case 'Zone Analysis':
        return <ZoneAnalysis />;
      case 'Consumption by Type':
        return <ConsumptionByType />;
      case 'Main Database':
        return <Database />;
      default:
        return <PlaceholderModule title={`${activeTab} - Water`} />;
    }
  };

  return (
    <div>
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
        <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
          {WATER_TABS.map((tab) => (
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

export default WaterModule;