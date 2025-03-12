'use client'
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/DataTable"
import { StatusChart } from "@/components/StatusChart"
import Sidebar from "@/components/Sidebar"
import Navbar from "@/components/Navbar";
import { Pencil, CirclePlus, CircleX } from "lucide-react"
import { useSession } from "next-auth/react";
import SolicitudesCards from "@/components/SolicitudesCards";
import ModalAgregarSolicitud from "@/components/ModalAgregarSolicitud";
import { useRouter, useSearchParams } from "next/navigation";
import { SolicitudBase } from '@/types/types';
import { formatDate } from '@/utils/formatDate';
import Footer from "@/components/Footer";
import { motion } from "motion/react"

interface Props {
  solicitudes: SolicitudBase[];
  totalSolicitudes: number;
  currentPage: number;
  limit: number;
  estatusCount: {
    Recibido: number;
    Pendiente: number;
    Cancelado: number;
    Concluido: number;
  };
}

export default function MainPage({ solicitudes, totalSolicitudes, currentPage, limit, estatusCount }: Props) {

  const formattedData = solicitudes.map((solicitud) => {
    const fecha = solicitud.fecha ? new Date(solicitud.fecha) : null;
    const updatedAt = solicitud.updatedAt ? new Date(solicitud.updatedAt) : null;
    return {
      id: solicitud.id,
      curp: solicitud.curp,
      nombre: solicitud.nombre,
      domicilio: solicitud.domicilio,
      telefono: solicitud.telefono,
      solicitud: solicitud.solicitud,
      apoyo_id: solicitud.apoyo_id,
      estatus_id: solicitud.estatus_id,
      fecha: formatDate(fecha, true),
      nota: solicitud.nota,
      updatedBy: solicitud.actualizador
        ? {
          id: solicitud.actualizador.id,
          name: solicitud.actualizador.name,
          departamento_id: solicitud.actualizador.departamento_id,
        }
        : null,
      updatedAt: formatDate(updatedAt, false),
    };
  });

  const { data: session } = useSession();
  const tienePermisos = session?.user?.permisos !== "Visualizacion";

  const totalAbsoluto = Object.values(estatusCount).reduce((acc, value) => acc + value, 0);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeModal = () => setIsModalOpen(false);
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const searchParams = useSearchParams();

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar isOpen={isOpen} />
      <div className="flex-1 overflow-auto"> {/* Contenedor principal */}
        <Navbar toggleSidebar={toggleSidebar} isOpen={isOpen} searchValue={searchValue}
          handleSearchChange={handleSearchChange} handleSearchSubmit={handleSearchSubmit} />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.1 }}
        >
          <div className="p-8 pt-0"> {/* Contenido principal */}
            <h1 className="text-2xl sm:text-3xl font-bold dark:text-white pl-3 py-6">Panel de Administración</h1>
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mb-6"> {/* Gráficas y estadísticas */}
              <div className="lg:col-span-4">{/* Gráficas */}
                {session ? (
                  <StatusChart statusCounts={estatusCount} />
                ) : (
                  <Card className="w-full h-[615px] flex items-center justify-center dark:bg-gray-800">
                    <p className="text-2xl">Cargando...</p>
                  </Card>
                )}
              </div>
              <SolicitudesCards totalSolicitudes={totalAbsoluto} estatusCount={estatusCount} />{/* Estadísticas */}
            </div>
            <Card className="dark:bg-gray-800 dark:text-white">{/* Tabla de solicitudes */}
              <CardHeader className="flex flex-row items-center">
                <CardTitle className="text-lg pl-2 pr-3">Tabla de Solicitudes</CardTitle>
                {session && tienePermisos ? (
                  <div className="flex justify-end space-x-2">
                    <button onClick={() => setIsModalOpen(!isOpen)} aria-label="Agregar solicitud"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full">
                      <CirclePlus />
                    </button>
                    <button onClick={() => setIsEditing(!isEditing)} aria-label="Editar solicitud"
                      className={`text-white font-bold py-3 px-4 rounded-full 
                      ${!isEditing ? "bg-blue-500 hover:bg-blue-700" : "bg-red-500 hover:bg-red-700"}`}>
                      {!isEditing ? <Pencil /> : <CircleX />}
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-end space-x-2 items-center">
                    <button className="bg-gray-200 text-black py-3 px-4 rounded-full">
                      <CirclePlus />
                    </button>
                    <button className="bg-gray-200 text-black py-3 px-4 rounded-full">
                      <Pencil />
                    </button>
                    <span className="pl-2 text-gray-600 dark:text-gray-200">Solicita permisos de Edición</span>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                {formattedData ? (
                  <DataTable data={formattedData} isEditing={isEditing} totalSolicitudes={totalSolicitudes}
                    currentPage={currentPage} limit={limit} />
                ) : (
                  <Card className="W-full h-[300px] flex items-center justify-center dark:bg-gray-800">
                    <p className="text-2xl">Cargando...</p>
                  </Card>
                )}
              </CardContent>
            </Card>
            <Footer />
          </div>
        </motion.div>
      </div>
      <ModalAgregarSolicitud isModalOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
}