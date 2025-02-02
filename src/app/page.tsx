'use client'
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/DataTable"
import { StatusChart } from "@/components/StatusChart"
import Sidebar3 from "@/components/Sidebar3"
import { mockData } from "../utils/data"
import Navbar from "@/components/Navbar";

export default function Dashboard() {
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

  const handleSearchChange = (value: React.SetStateAction<string>) => {
    setSearchValue(value);
    // console.log('Nuevo valor de búsqueda:', value);
  };

  return (    
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar3 isOpen={isOpen} toggleSidebar={toggleSidebar} />

        {/* Contenedor principal */}
        <div className="flex-1 overflow-auto">
          
        {/* Navbar con posición sticky */}
          <Navbar
            toggleSidebar={toggleSidebar}
            isOpen={isOpen}
            searchValue={searchValue}
            handleSearchChange={handleSearchChange}
          />   

          {/* Contenido principal */}
          <div className="p-8 pt-0">
            <h1 className="text-3xl font-bold dark:text-white pl-3 py-6">Panel de Administración</h1>   

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

            {/* Tabla de solicitudes */}
            <Card className="dark:bg-gray-800 dark:text-white">
              <CardHeader>
                <CardTitle>Tabla de Solicitudes</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable data={filteredData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  )
}

