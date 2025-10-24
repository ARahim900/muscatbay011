import React, { useState, useCallback } from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import WaterModule from './components/modules/WaterModule';
import ElectricityModule from './components/modules/ElectricityModule';
import StpModule from './components/modules/StpModule';
import PlaceholderModule from './components/modules/PlaceholderModule';
import { useDarkMode } from './context/DarkModeContext';
import { NavItemType } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<NavItemType>('Water');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isDarkMode } = useDarkMode();

  const handleNavItemClick = useCallback((view: NavItemType) => {
    setActiveView(view);
    setMobileMenuOpen(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(prevState => !prevState);
  }, []);

  const renderActiveView = () => {
    switch (activeView) {
      case 'Water':
        return <WaterModule />;
      case 'Electricity':
        return <ElectricityModule />;
      case 'HVAC':
        return <PlaceholderModule title="HVAC" />;
      case 'Firefighting':
        return <PlaceholderModule title="Firefighting" />;
      case 'STP Plant':
        return <StpModule />;
      default:
        return <WaterModule />;
    }
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <Sidebar 
          activeView={activeView} 
          onNavItemClick={handleNavItemClick} 
          isMobileMenuOpen={isMobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          isSidebarCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            onMenuClick={() => setMobileMenuOpen(!isMobileMenuOpen)} 
            isMobileMenuOpen={isMobileMenuOpen}
          />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6 sm:p-8 lg:p-10">
            {renderActiveView()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;