"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useSidebarStore } from "@/store/sidebarStore";
import type { ReactNode } from "react";

export default function DashboardShell({ children }: { children: ReactNode }) {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Navbar toggleSidebar={toggleSidebar} isOpen={isOpen} />
        <main>{children}</main>
      </div>
    </div>
  );
}
