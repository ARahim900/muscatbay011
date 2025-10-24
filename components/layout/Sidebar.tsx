import React from 'react';
import { NavItemType } from '../../types';
import { NAV_ITEMS } from '../../constants';
import { useWindowSize } from '../../hooks/useWindowSize';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

interface SidebarProps {
  activeView: NavItemType;
  onNavItemClick: (view: NavItemType) => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
    activeView, 
    onNavItemClick, 
    isMobileMenuOpen, 
    setMobileMenuOpen,
    isSidebarCollapsed,
    toggleSidebar 
}) => {
    const { width } = useWindowSize();
    const isMobile = width < 1024;

    const navClasses = (isActive: boolean, isCollapsed: boolean) => 
        `flex items-center my-1 text-lg font-medium transition-colors duration-200 transform rounded-lg ${
            isCollapsed ? 'justify-center px-3 py-3' : 'px-6 py-4'
        } ${
            isActive 
            ? 'bg-accent text-white' 
            : 'text-gray-200 hover:bg-white/10'
        }`;

    const sidebarNavContent = (isCollapsed: boolean) => (
        <nav className="px-4">
            {NAV_ITEMS.map((item) => (
                <a 
                    key={item.name} 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); onNavItemClick(item.name); }} 
                    className={navClasses(activeView === item.name, isCollapsed)}
                    title={isCollapsed ? item.name : undefined}
                >
                    <item.icon className="w-6 h-6" />
                    {!isCollapsed && <span className="ml-4">{item.name}</span>}
                </a>
            ))}
        </nav>
    );

    if (isMobile) {
        return (
            <>
                <div 
                  className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                  onClick={() => setMobileMenuOpen(false)}
                ></div>
                <div className={`fixed top-0 left-0 h-full w-72 bg-primary z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex items-center justify-center mt-8">
                        <span className="text-2xl font-semibold text-white">Dashboard</span>
                    </div>
                    <div className="flex flex-col justify-between flex-1 mt-6">
                        {sidebarNavContent(false)}
                    </div>
                </div>
            </>
        );
    }

    return (
        <aside className={`hidden lg:flex flex-col bg-primary shadow-lg transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-24' : 'w-72'}`}>
             <div className="flex items-center justify-center mt-8 h-10">
                <span className="text-2xl font-semibold text-white transition-opacity duration-300">
                    {isSidebarCollapsed ? 'MB' : 'Dashboard'}
                </span>
            </div>
            <div className="flex flex-col justify-between flex-1 mt-6">
                {sidebarNavContent(isSidebarCollapsed)}

                <div className="px-4 pb-4 mt-auto">
                    <button 
                        onClick={toggleSidebar} 
                        className="w-full flex items-center justify-center p-3 rounded-lg text-gray-200 hover:bg-white/10 transition-colors duration-200"
                        aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                       {isSidebarCollapsed ? <ChevronsRight size={24} /> : <ChevronsLeft size={24} />}
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;