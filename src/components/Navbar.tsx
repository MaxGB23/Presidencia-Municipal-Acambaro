import React from 'react'
import { ModeToggle } from "@/components/ThemeToggle";
import SearchBar from "@/components/SearchBar";
import { Menu } from "lucide-react";

interface NavbarProps {
  toggleSidebar: () => void;
  isOpen: boolean;
  searchValue: string;
  handleSearchChange: (value: string) => void;
  handleSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Navbar: React.FC<NavbarProps> = React.memo(({ toggleSidebar, isOpen, searchValue, handleSearchChange, handleSearchSubmit }) => {
  
  return (
    <nav className="shadow sm:shadow-md dark:shadow-slate-950 space-x-4 items-center flex sticky top-0 z-50 p-5 bg-gray-50 dark:bg-gray-900">
      <button
        aria-label="Toggle Sidebar"
        onClick={toggleSidebar}
        className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none pl-2"
      >
        <Menu className={`w-6 h-6 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <SearchBar modelValue={searchValue} onChange={handleSearchChange} handleSearchSubmit={handleSearchSubmit}  />
      <ModeToggle />
    </nav>
  );
});

export default Navbar;
