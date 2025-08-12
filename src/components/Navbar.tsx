// components/Navbar.tsx
'use client';

import React from 'react';
import { Menu } from 'lucide-react';
import { ModeToggle } from '@/components/ThemeToggle';
import SearchBar from '@/components/SearchBar';

interface NavbarProps {
  toggleSidebar: () => void;
  isOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isOpen }) => {
  return (
    <nav className="shadow-md dark:shadow-slate-950 flex items-center space-x-4 sticky top-0 z-50 p-5 bg-gray-50 dark:bg-gray-900">
      <button
        aria-label="Toggle Sidebar"
        onClick={toggleSidebar}
        className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none"
      >
        <Menu className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className="flex-grow">
        <SearchBar />
      </div>
      <ModeToggle />
    </nav>
  );
};

export default React.memo(Navbar);
