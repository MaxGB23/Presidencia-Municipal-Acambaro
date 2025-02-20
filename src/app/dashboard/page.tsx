'use client'
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/DataTable"
import { StatusChart } from "@/components/StatusChart"
import Sidebar3 from "@/components/Sidebar3"
import { mockData, UserData } from "@/utils/data"
import Navbar from "@/components/Navbar";
import { Pencil, CirclePlus, CircleX } from "lucide-react"
import { useSession } from "next-auth/react";
import SolicitudesCards from "@/components/SolicitudesCards";
import ModalAgregarSolicitud from "@/components/ModalAgregarSolicitud";
import { deleteSolicitud } from "@/actions/actions";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {  
  // const [isOpen, setIsOpen] = useState(false);
  // const toggleSidebar = () => setIsOpen(!isOpen);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isEditing, setIsEditing] = useState(false); // Estado para controlar la edición
  // const [solicitudes, setSolicitudes] = useState<UserData[]>([]);


  // const openModal = () => setIsModalOpen(true);
  // const closeModal = () => setIsModalOpen(false); 

  // const totalSolicitudes = mockData.length;
  // const solicitudesRecibidas = mockData.filter(item => item.estatus === 'Recibido').length;
  // const solicitudesPendientes = mockData.filter(item => item.estatus === 'Pendiente').length;
  // const solicitudesCanceladas = mockData.filter(item => item.estatus === 'Cancelado').length;
  // const solicitudesConcluidas = mockData.filter(item => item.estatus === 'Concluido').length;

  // const [searchValue, setSearchValue] = useState('');
  // const filteredData = mockData.filter(item =>
  //   item.nombre.toLowerCase().includes(searchValue.toLowerCase()) ||
  //   item.curp.toLowerCase().includes(searchValue.toLowerCase()) ||
  //   item.solicitud.toLowerCase().includes(searchValue.toLowerCase()) ||
  //   item.telefono.toLowerCase().includes(searchValue.toLowerCase())
  // );

  // const handleSearchChange = (value: React.SetStateAction<string>) => {
  //   setSearchValue(value);
  // };
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [solicitudes, setSolicitudes] = useState<UserData[]>([]);
  const { toast } = useToast()  

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const data = await mockData();
        setSolicitudes(data);
      } catch (error) {
        console.error('Error al cargar solicitudes:', error);
      }
    };  

    fetchSolicitudes();
  }, []);

  const handleAdd = async () => {
    const data = await mockData();
    setSolicitudes(data);       
    toast({
      title: "Solicitud Agregada",
      description: "La solicitud ha sido agregada con éxito",
      variant: "success", 
    });
  };

  const handleEdit = async (updatedRow: UserData) => {
    setSolicitudes((prev) =>
      prev.map((s) => (s.id === updatedRow.id ? updatedRow : s))
    );
    toast({
      title: "Solicitud Actualizada",
      description: "La solicitud ha sido actualizada con éxito",
      variant: "success", 
    });
  };  

  const handleDelete = async (rowId: number) => {
    const userConfirmed = confirm("¿Estás seguro de eliminar esta solicitud?");

    if (userConfirmed) {
      await deleteSolicitud(rowId);
      setSolicitudes((prev) => prev.filter((s) => s.id !== rowId));
      toast({
        title: "Solicitud Eliminada",
        description: "La solicitud ha sido eliminada con éxito",
        variant: "destructive",
      });
    }
  };

  const totalSolicitudes = solicitudes.length;
  const solicitudesRecibidas = solicitudes.filter(item => item.estatus === 'Recibido').length;
  const solicitudesPendientes = solicitudes.filter(item => item.estatus === 'Pendiente').length;
  const solicitudesCanceladas = solicitudes.filter(item => item.estatus === 'Cancelado').length;
  const solicitudesConcluidas = solicitudes.filter(item => item.estatus === 'Concluido').length;

  const filteredData = solicitudes.filter(item =>
    item.nombre.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.curp.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.solicitud?.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.telefono?.toLowerCase().includes(searchValue.toLowerCase())
  );

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeModal = () => setIsModalOpen(false);
  const handleSearchChange = (value: string) => setSearchValue(value);
  
  const { data: session, status } = useSession();
  const tienePermisos = session?.user?.permisos !== "Visualizacion";
  // imprimir sesion del usuario
  // console.log("Usuario autenticado:", session);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar3 isOpen={isOpen} />
      {/* Contenedor principal */}
      <div className="flex-1 overflow-auto">
        {/* Navbar con posición sticky */}
        <Navbar toggleSidebar={toggleSidebar} isOpen={isOpen} searchValue={searchValue} handleSearchChange={handleSearchChange}/>
        {/* Contenido principal */}
        <div className="p-8 pt-0">
          <h1 className="text-3xl font-bold dark:text-white pl-3 py-6">Panel de Administración</h1>       
          {/* Gráficos y estadísticas */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mb-6">
            {/* Gráfico de estado */}
            <div className="lg:col-span-4">
              <StatusChart data={solicitudes} />
            </div>
            {/* Estadísticas */}
            <SolicitudesCards
              totalSolicitudes={totalSolicitudes}
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
                      <Pencil/>
                    </button>
                    <span className="pl-2 text-gray-600 dark:text-gray-200">Solicita permisos de Edición</span>
                  </div>
              )}
            </CardHeader>
            <CardContent>
              <DataTable data={filteredData} isEditing={isEditing} onEdit={handleEdit} onDelete={handleDelete} />
            </CardContent>
          </Card>
        </div>
      </div>
      <ModalAgregarSolicitud isModalOpen={isModalOpen} closeModal={closeModal} onAdd={handleAdd} />    </div>
  );
}