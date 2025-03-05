'use client'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { Card, CardTitle, CardContent, CardHeader } from '@/components/ui/card';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'

export default function Estadisticas() {

  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const router = useRouter();

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar isOpen={isOpen} />
      {/* Contenedor principal */}
      <div className="flex-1 overflow-auto">
        {/* Navbar con posición sticky */}
        {/* <Navbar toggleSidebar={toggleSidebar} isOpen={isOpen} searchValue={searchValue} handleSearchChange={handleSearchChange} handleSearchSubmit={handleSearchSubmit} /> */}
        <div className='p-8'>
          <Card>
            <CardHeader>
              <h1 className='text-2xl'>Página de prueba de Solicitudes</h1>
            </CardHeader>
            <CardContent>
              {/* Gráficos y estadísticas */}
              <div className="grid grid-cols-1 gap-6 mb-6">
                <div className="lg:col-span-3">
                  {/* Tarta de porcentajes */}
                  <div className="h-40 w-full bg-gray-200 rounded-md">
                    {/* Código de la torta */}
                  </div>
                </div>
                <div className="lg:col-span-3">
                  {/* Gráfico de líneas */}
                  <div className="h-40 w-full bg-gray-200 rounded-md">
                    {/* Código del gráfico de líneas */}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}