import React from "react";
import {
  Home,
  User,
  MessageCircle,
  PieChart,
  Folder,
  ShoppingCart,
  Heart,
  Settings,
  LogOut,
  HeartHandshake,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { name: "Inicio", icon: <Home /> },
    { name: "Usuarios", icon: <User /> },
    { name: "Apoyos", icon: <HeartHandshake /> },
    { name: "Estadísticas", icon: <PieChart /> },
      // { name: "File Manager", icon: <Folder /> },
      // { name: "Orders", icon: <ShoppingCart /> },
      // { name: "Saved", icon: <Heart /> },
  ];

  return (
    <div
      className={`border flex h-screen transition-all duration-300 overflow-hidden ${isOpen ? "w-64" : "w-20"} bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
      aria-hidden={!isOpen}
    >
      <div className="relative flex flex-col w-full ">
        {/* Header */}
        <div className="flex items-center justify-between p-4 shadow-md mt-2">
          <div className={`flex items-center ${isOpen ? "space-x-4" : "space-x-2"}`}>
            <Avatar>
              <Image
                src="/images/User.png"
                alt="User Avatar"
                width={isOpen ? 50 : 40}
                height={isOpen ? 50 : 40}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div
              className={`overflow-hidden transition-[width,opacity]  ${isOpen ? "w-32 opacity-100 duration-500" : "w-0 opacity-0 duration-0"
                }`}
            >
              <h2 className="text-lg font-semibold whitespace-nowrap">Mario Mejía</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Contralor</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="pl-4 flex-1 mt-6">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="flex items-center p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
                >
                  <span className="w-6 h-6">{item.icon}</span>
                  <div
                    className={`overflow-hidden transition-[width,opacity]  ${isOpen ? "ml-4 w-32 opacity-100 duration-300" : "w-0 opacity-0 duration-0"
                      }`}
                  >
                    <span className="whitespace-nowrap">{item.name}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="mt-auto p-4 space-y-4">
          <a
            href="#"
            className="flex items-center p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
          >
            <LogOut className="w-6 h-6" />
            <div
              className={`overflow-hidden transition-[width,opacity]  ${isOpen ? "ml-4 w-32 opacity-100 duration-300" : "w-0 opacity-0 duration-0"
                }`}
            >
              <span className="whitespace-nowrap">Cerrar Sesión</span>
            </div>
          </a>
        </div>
      </div>
    </div>

  );
};

export default Sidebar;
