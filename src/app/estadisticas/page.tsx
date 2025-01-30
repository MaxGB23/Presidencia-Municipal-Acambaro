'use client'
import Navbar from "@/components/Navbar";
import Sidebar3 from "@/components/Sidebar3";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react";
import { mockData } from "../../utils/data"
import { StatusChart } from "@/components/StatusChart";



export default function Estadisticas() {

  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

    const totalSolicitudes = mockData.length;
    const solicitudesRecibidas = mockData.filter(item => item.estatus === 'Recibido').length;
    const solicitudesPendientes = mockData.filter(item => item.estatus === 'Pendiente').length;
    const solicitudesCanceladas = mockData.filter(item => item.estatus === 'Cancelado').length;
    const solicitudesConcluidas = mockData.filter(item => item.estatus === 'Concluido').length;

  const [searchValue, setSearchValue] = useState('');
  const filteredData = mockData.filter(item =>
    item.nombre.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.curp.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.solicitud.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.telefono.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    console.log("Nuevo valor de búsqueda:", value);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar3 isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 overflow-auto">
        <Navbar
          toggleSidebar={toggleSidebar}
          isOpen={isOpen}
          searchValue={searchValue}
          handleSearchChange={handleSearchChange}
        />
        <div className="p-6">
            {/* Gráficos y estadísticas */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
              <div className="lg:col-span-3">
                <StatusChart data={mockData} />
              </div>

              <Card className="dark:bg-gray-800 dark:text-white lg:col-span-1">
                <CardHeader>
                  <CardTitle>Estadísticas Generales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p>Total de solicitudes: {totalSolicitudes}</p>
                  <p>
                    Solicitudes recibidas: {solicitudesRecibidas} (
                    {((solicitudesRecibidas / totalSolicitudes) * 100).toFixed(2)}%)
                  </p>
                  <p>
                    Solicitudes pendientes: {solicitudesPendientes} (
                    {((solicitudesPendientes / totalSolicitudes) * 100).toFixed(2)}%)
                  </p>
                  <p>
                    Solicitudes canceladas: {solicitudesCanceladas} (
                    {((solicitudesCanceladas / totalSolicitudes) * 100).toFixed(2)}%)
                  </p>
                  <p>
                    Solicitudes concluidas: {solicitudesConcluidas} (
                    {((solicitudesConcluidas / totalSolicitudes) * 100).toFixed(2)}%)
                  </p>
                </CardContent>
              </Card>
            </div>
        </div>
      </div>
    </div>

  )
}

