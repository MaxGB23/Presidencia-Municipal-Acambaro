'use client'
import Navbar from "@/components/Navbar";
import Sidebar3 from "@/components/Sidebar3";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react";
import { mockData } from "../../utils/data"
import { DataTable } from "@/components/DataTable";



export default function Apoyos() {

  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

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

