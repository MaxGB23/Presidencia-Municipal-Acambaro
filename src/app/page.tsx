'use client'
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/DataTable"
import { StatusChart } from "@/components/StatusChart"
import { Sidebar } from "@/components/Sidebar"
import { Sidebar2 } from "@/components/Sidebar2"
import Sidebar3 from "@/components/Sidebar3"
import { mockData } from "../utils/data"
import { ThemeProvider } from "../contexts/ThemeContext"
import { LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";


export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const totalSolicitudes = mockData.length;
  const solicitudesRecibidas = mockData.filter(item => item.estatus === 'Recibido').length;
  const solicitudesPendientes = mockData.filter(item => item.estatus === 'Pendiente').length;
  const solicitudesCanceladas = mockData.filter(item => item.estatus === 'Cancelado').length;
  const solicitudesConcluidas = mockData.filter(item => item.estatus === 'Concluido').length;

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar3 isOpen={isOpen} toggleSidebar={toggleSidebar} />

        <div className="flex-1 overflow-auto p-8">
          {/* Encabezado con el botón de toggle */}
          <div className="flex items-center space-x-4 mb-6">
            <button
              aria-label="Toggle Sidebar"
              onClick={toggleSidebar}
              className="focus:outline-none transition-all pl-2"
            >
              <LogOut className={`w-6 h-6 ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <h1 className="text-3xl font-bold dark:text-white">Panel de Administración</h1>
            <ThemeToggle />            
          </div>

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
              <DataTable data={mockData} />
            </CardContent>
          </Card>
        </div>
      </div>

    </ThemeProvider>
  )
}

