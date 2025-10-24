import React from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useDarkMode } from '../../context/DarkModeContext';

interface HeaderProps {
  onMenuClick: () => void;
  isMobileMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, isMobileMenuOpen }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="flex items-center justify-between px-6 py-5 bg-primary text-white shadow-lg z-20">
      <div className="flex items-center">
        <button onClick={onMenuClick} className="text-gray-300 hover:bg-white/20 rounded-full focus:outline-none lg:hidden mr-4 h-[44px] w-[44px] flex items-center justify-center">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="text-xl font-semibold text-gray-200 hidden sm:block">
          Muscat Bay Utilities
        </h1>
      </div>
      <div className="flex items-center">
        <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-white/20 focus:outline-none h-[44px] w-[44px] flex items-center justify-center">
          {isDarkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-300" />}
        </button>
      </div>
    </header>
  );
};

export default Header;