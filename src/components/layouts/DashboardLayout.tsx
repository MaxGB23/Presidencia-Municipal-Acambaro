// components/layouts/DashboardLayout.tsx
"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { useSidebarStore } from "@/store/sidebarStore";
import { useRouter, useSearchParams } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearchChange = (value: string) => setSearchValue(value);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900">
      {/* Sidebar fijo a la izquierda, altura completa */}
      <div className="sticky top-0 h-screen">
        <Sidebar isOpen={isOpen} />
      </div>

      {/* Contenedor principal con scroll */}
      <div className="flex-1 flex flex-col  ">
        <div className=" sticky top-0 z-50">
          <Navbar
            toggleSidebar={toggleSidebar}
            isOpen={isOpen}
            searchValue={searchValue}
            handleSearchChange={handleSearchChange}
            handleSearchSubmit={handleSearchSubmit}
          />
        </div>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
