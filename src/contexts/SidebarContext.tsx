"use client"; // Necesario para usar estado en Next.js App Router

import { createContext, useState } from "react";

export const SidebarContext = createContext({
  isOpen: true,
  toggleSidebar: () => { },
});

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
