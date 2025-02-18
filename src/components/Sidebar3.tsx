// 'use client'
import React, { useState } from "react";
import { Home, User, PieChart, LogOut, HeartHandshake } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = React.memo( ({ isOpen }) => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.permisos === "Admin";
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Evita la pantalla de confirmación
    router.push("/auth/login"); // Redirige manualmente al login
  };
  // imprimir sesion del usuario
  console.log("hola", session);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);   
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // setTimeout(() => {
    //   setIsHovered(false);
    // }, 100);
  };

  const menuItems = [
    { name: "Inicio", icon: <Home />, link: "/dashboard" },
    { name: "Apoyos", icon: <HeartHandshake />, link: "/$" },
    { name: "Estadísticas", icon: <PieChart />, link: "/estadisticas" },
    ...(isAdmin ? [{ name: "Usuarios", icon: <User />, link: "/auth/register" }] : []),
  ];

  

  const sidebarOpen = isOpen || isHovered;

  // const session = await getServerSession(authOptions);
  // console.log(session);

  return (
    <div
      className={`shadow-md flex h-screen transition-all duration-200 overflow-hidden ${sidebarOpen ? "w-60" : "w-20"}`}
      aria-hidden={!sidebarOpen}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    > 
      <div className="relative flex flex-col w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
        {/* Header */}
        <div className="flex items-center shadow-md p-4 pl-5">
          <div className={`flex items-center ${sidebarOpen ? "space-x-4" : ""}`}>
            <Image src="/images/User.png" alt="Usuario" width={40} height={40} />
            <div
              className={`overflow-hidden transition-[width,opacity] ${sidebarOpen ? "w-32 opacity-100 duration-500" : "w-0 opacity-0 duration-0"}`}
            >
              {session ? (
                <>
                  <h2 className="text-lg font-semibold whitespace-nowrap">{session.user?.name}</h2>
                  <p className="text-[13px] mb-[0.5px] text-gray-500 dark:text-gray-400 whitespace-nowrap">{session.user?.departamento_id || "Usuario"}</p>
                </>
              ) : (
                <h2 className="mb-5 text-lg font-semibold whitespace-nowrap">Cargando...</h2>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 flex-1">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link href={item.link} className="p-4 flex items-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                  <span>{item.icon}</span>
                  <div
                    className={`overflow-hidden transition-[width,opacity] ${sidebarOpen ? "ml-4 w-32 opacity-100 duration-300" : "w-0 opacity-0 duration-0"
                      }`}
                  >
                    <span className="whitespace-nowrap">{item.name}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div>
          <Link href="#" onClick={handleLogout} className="p-3 space-y-4 flex items-center bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-gray-700">
            <LogOut className="ml-4" />
            <div
            
              className={`pb-3 overflow-hidden transition-[width,opacity] ${sidebarOpen ? "ml-4 w-32 opacity-300" : "w-0 opacity-0 duration-0"
                }`}
            >
              <span className="whitespace-nowrap">Cerrar Sesión</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
});

export default Sidebar;