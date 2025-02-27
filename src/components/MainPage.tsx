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
import { deleteSolicitud } from "@/actions/actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";

type Status = "Recibido" | "Pendiente" | "Cancelado" | "Concluido";

interface Solicitud {
  id: number;
  curp: string;
  nombre: string;
  domicilio: string;
  telefono: string | null;
  solicitud: string | null;
  apoyo_id: string | null;
  fecha: string | null;
  estatus_id: Status;
  nota: string | null;
  updatedBy: string | null;
  updatedAt: Date | null;
  actualizador: { id: string; name: string; departamento_id: string } | null;
}

interface Props {
  solicitudes: Solicitud[];
  totalSolicitudes: number;
  currentPage: number;
  limit: number;
  solicitudesRecibidas: number;
  solicitudesPendientes: number;
  solicitudesCanceladas: number;
  solicitudesConcluidas: number;
}

export default function MainPage({ solicitudes, totalSolicitudes, currentPage, limit, solicitudesRecibidas, 
  solicitudesPendientes, solicitudesCanceladas, solicitudesConcluidas }: Props) {

  function formatDate(isoDate: Date | null, includeTime: boolean = true) {
    if (!isoDate) return null;
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    if (!includeTime) {
      return `${day} ${month} ${year}`;
    }
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day} ${month} ${year} ${hours}:${minutes}`;
  }

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
      apoyo: solicitud.apoyo_id,
      estatus: solicitud.estatus_id,
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

  const totalAbsoluto = solicitudesRecibidas + solicitudesPendientes + solicitudesCanceladas + solicitudesConcluidas;

  const chartData = {
    Recibido: solicitudesRecibidas,
    Pendiente: solicitudesPendientes,
    Cancelado: solicitudesCanceladas,
    Concluido: solicitudesConcluidas,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchValue, setSearchValue] = useState('');  
  const { toast } = useToast()
  const router = useRouter();

  const handleAdd = async () => {
    router.refresh()
    toast({
      title: "Solicitud Agregada",
      description: "La solicitud ha sido agregada con éxito",
      variant: "success",
    });
  };

  const handleEdit = async () => {
    router.refresh()
    toast({
      title: "Solicitud Actualizada",
      description: "La solicitud ha sido actualizada con éxito",
      variant: "updated",
    });
  };

  const handleDelete = async (rowId: number) => {
    const userConfirmed = confirm("¿Estás seguro de eliminar esta solicitud?");
    if (userConfirmed) {
      await deleteSolicitud(rowId);
      router.refresh()
      toast({
        title: "Solicitud Eliminada",
        description: "La solicitud ha sido eliminada con éxito",
        variant: "destructive",
      });
    }
  };

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeModal = () => setIsModalOpen(false);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set('search', value);
    params.set('page', '1'); // Reiniciar la paginación al buscar
    router.replace(`?${params.toString()}`);
  };
  const searchParams = useSearchParams();

  const { data: session, status } = useSession();
  const tienePermisos = session?.user?.permisos !== "Visualizacion";
  // imprimir sesion del usuario
  // console.log("Usuario autenticado:", session);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar isOpen={isOpen} />
      {/* Contenedor principal */}
      <div className="flex-1 overflow-auto">
        {/* Navbar con posición sticky */}
        <Navbar toggleSidebar={toggleSidebar} isOpen={isOpen} searchValue={searchValue} handleSearchChange={handleSearchChange} />
        {/* Contenido principal */}
        <div className="p-8 pt-0">
          <h1 className="text-3xl font-bold dark:text-white pl-3 py-6">Panel de Administración</h1>
          {/* Gráficos y estadísticas */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mb-6">
            {/* Gráfico de estado */}
            <div className="lg:col-span-4">
              {session ? (
                <StatusChart statusCounts={chartData} />
              ) : (
                <Card className="w-full h-[615px] flex items-center justify-center dark:bg-gray-800">
                  <p className="text-2xl">Cargando...</p>
                </Card>
              )}
            </div>

            {/* Estadísticas */}
            <SolicitudesCards
              totalSolicitudes={totalAbsoluto}
              solicitudesRecibidas={solicitudesRecibidas}
              solicitudesPendientes={solicitudesPendientes}
              solicitudesCanceladas={solicitudesCanceladas}
              solicitudesConcluidas={solicitudesConcluidas}
            />
          </div>

          {/* Tabla de solicitudes */}
          <Card className="dark:bg-gray-800 dark:text-white">
            <CardHeader className="flex flex-row items-center">
              <CardTitle className="text-lg pl-2 pr-3">Tabla de Solicitudes</CardTitle>
              {session && tienePermisos ? (
                <>
                  <div className="flex justify-end space-x-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full"
                      onClick={() => setIsModalOpen(!isOpen)}
                    >
                      <CirclePlus />
                    </button>
                    <button
                      className={`text-white font-bold py-3 px-4 rounded-full ${!isEditing
                        ? "bg-blue-500 hover:bg-blue-700"
                        : "bg-red-500 hover:bg-red-700"
                        }`}
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {!isEditing ? <Pencil className="" /> : <CircleX className="" />}
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex justify-end space-x-2 items-center">
                  <button
                    className="bg-gray-200 text-black py-3 px-4 rounded-full"
                  >
                    <CirclePlus />
                  </button>
                  <button
                    className="bg-gray-200 text-black py-3 px-4 rounded-full">
                    <Pencil />
                  </button>
                  <span className="pl-2 text-gray-600 dark:text-gray-200">Solicita permisos de Edición</span>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {formattedData ? (
                <DataTable data={formattedData} isEditing={isEditing} onEdit={handleEdit} onDelete={handleDelete} totalSolicitudes={totalSolicitudes} currentPage={currentPage} limit={limit} />
              ) : (
                <Card className="W-full h-[300px] flex items-center justify-center dark:bg-gray-800">
                  <p className="text-2xl">Cargando...</p>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <ModalAgregarSolicitud isModalOpen={isModalOpen} closeModal={closeModal} onAdd={handleAdd} />    
    </div>
  );
}