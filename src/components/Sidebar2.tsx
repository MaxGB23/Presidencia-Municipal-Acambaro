'use client'
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, Users, BarChart, Settings, LogOut, Menu, SunMoon} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Moon } from "lucide-react";

export function Sidebar2() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div
      className={`bg-gray-100 dark:bg-gray-800 h-screen p-4 flex flex-col text-gray-900 dark:text-white transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"
        }`}
    >
      
      

      {/* Contenido de la sidebar */}
      <div className="flex items-center justify-between mb-6">
        {!isCollapsed && (
          <div className="flex items-center space-x-4">
            <Avatar>
              <Image src="/images/h.png" alt="@shadcn " width={50} height={50} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">Mario Mejía</h2>
              <p>Contralor</p>
              <Button
                onClick={toggleSidebar}
                className="mb-4 self-end text-gray-900 dark:text-white"
                variant="ghost"
              >
                <Menu></Menu>
              </Button>
              {/* <p className="text-sm text-gray-500">hijoto@admin.com</p> */}
              
            </div>
          </div>
        )}
        {isCollapsed && (
          <Avatar>
            <Image src="/images/h.png" alt="@shadcn " width={40} height={40} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        )}
      </div>
      <nav className="space-y-2 flex-grow">
        <Button variant="ghost" className="w-full justify-start text-gray-900 dark:text-white" asChild>
          <Link href="#">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            {!isCollapsed && "Dashboard"}
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-900 dark:text-white" asChild>
          <Link href="#">
            <FileText className="mr-2 h-4 w-4" />
            {!isCollapsed && "Solicitudes"}
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-900 dark:text-white" asChild>
          <Link href="#">
            <Users className="mr-2 h-4 w-4" />
            {!isCollapsed && "Usuarios"}
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-900 dark:text-white" asChild>
          <Link href="#">
            <BarChart className="mr-2 h-4 w-4" />
            {!isCollapsed && "Estadísticas"}
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-900 dark:text-white" asChild>
          <Link href="#">
            <Settings className="mr-2 h-4 w-4" />
            {!isCollapsed && "Configuración"}
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-900 dark:text-white" asChild>
          <Link href="#">
            <SunMoon className="mr-2 h-4 w-4" />
            {!isCollapsed && "Tema"}
          </Link>
        </Button>

      </nav>
      <Button variant="ghost" className="w-full justify-start mt-auto text-gray-900 dark:text-white">
        <LogOut className="mr-2 h-4 w-4" />
        {!isCollapsed && "Cerrar sesión"}
      </Button>
    </div>
  );
}
