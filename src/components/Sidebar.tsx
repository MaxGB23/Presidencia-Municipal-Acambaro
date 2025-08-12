"use client";
import React from "react";
import {
  Home,
  User,
  PieChart,
  LogOut,
  HeartHandshake,
  FileOutput,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSidebarStore } from "@/store/sidebarStore";

const Sidebar = React.memo(() => {
  const sidebarOpen = useSidebarStore((s) => s.isOpen);
  const { data: session } = useSession();
  const isAdmin = session?.user?.permisos === "Admin";
  const isEditor = session?.user?.permisos === "Edicion";
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/auth/login");
  };

  const menuItems = [
    { name: "Inicio", icon: <Home />, link: "/dashboard" },
    { name: "Apoyos", icon: <HeartHandshake />, link: "/solicitudes" },
    { name: "Estadísticas", icon: <PieChart />, link: "/estadisticas" },
    ...(isEditor || isAdmin
      ? [
          {
            name: "Documento PDF",
            icon: <FileOutput />,
            link: "/documento-pdf",
          },
        ]
      : []),
    ...(isAdmin
      ? [{ name: "Usuarios", icon: <User />, link: "/usuarios/view" }]
      : []),
  ];

  return (
    <>
      <div
        className={`fixed sm:static shadow-md flex h-screen z-50 transition-all duration-200
          ${
            sidebarOpen ? "w-60" : "w-0 sm:w-20 sm:hover:w-60"
          } overflow-hidden`}
      >
        <div className="relative flex flex-col w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white group">
          {/* Header */}
          <div className="flex items-center sm:shadow-md p-4 pl-5">
            <Image
              src="/images/User.png"
              alt="Usuario"
              width={40}
              height={40}
              priority
            />
            <div className="ml-4 w-32 opacity-0 sm:group-hover:opacity-100 sm:group-hover:block transition-opacity duration-300">
              {session ? (
                <>
                  <h2 className="text-lg font-semibold whitespace-nowrap">
                    {session.user?.name}
                  </h2>
                  <p className="text-[13px] mb-[0.5px] text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {session.user?.departamento_id || "Usuario"}
                  </p>
                </>
              ) : (
                <h2 className="mb-5 text-lg font-semibold whitespace-nowrap">
                  Cargando...
                </h2>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-3 flex-1">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.link}
                    className="p-4 flex items-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <span>{item.icon}</span>
                    <div className="ml-4 w-32 opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                      <span className="whitespace-nowrap">{item.name}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div>
            <button
              onClick={handleLogout}
              className="w-full p-3 py-[23px] flex items-center gap-4 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <LogOut className="ml-4" />
              <div className="w-32 opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex items-center">
                <span className="whitespace-nowrap">Cerrar Sesión</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 sm:hidden z-40"
          onClick={() => useSidebarStore.getState().setIsOpen(false)}
        />
      )}
    </>
  );
});

export default Sidebar;
