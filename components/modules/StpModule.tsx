import React, { useState } from 'react';
import { BarChart2, ClipboardList } from 'lucide-react';
import Dashboard from './stp/Dashboard';
import DetailsData from './stp/DetailsData';

const STP_TABS = [
    { name: 'Dashboard', icon: BarChart2 },
    { name: 'Details Data', icon: ClipboardList }
];

const StpModule: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Dashboard');

    const renderContent = () => {
        switch (activeTab) {
            case 'Dashboard':
                return <Dashboard />;
            case 'Details Data':
                return <DetailsData />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <div className="border-b border-gray-200 dark:border-gray-700">
                    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    {STP_TABS.map((tab) => (
                        <button
                        key={tab.name}
                        onClick={() => setActiveTab(tab.name)}
                        className={`${
                            activeTab === tab.name
                            ? 'border-accent text-accent'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500'
                        } flex items-center gap-2 whitespace-nowrap py-3 px-1 border-b-2 font-medium text-base transition-colors duration-200`}
                        >
                        <tab.icon size={18} />
                        {tab.name}
                        </button>
                    ))}
                    </nav>
                </div>
            </div>

            <div>
                {renderContent()}
            </div>
        </div>
    );
};

export default StpModule;