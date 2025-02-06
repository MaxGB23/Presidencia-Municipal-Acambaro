'use client'
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable"
import { StatusChart } from "@/components/StatusChart"
import Sidebar3 from "@/components/Sidebar3"
import { mockData } from "../utils/data"
import Navbar from "@/components/Navbar";
import { Pencil, CirclePlus, Trash, CircleX } from "lucide-react"

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar la edición

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
  };

  // const handleEdit = (item) => {
  //   console.log("Editar:", item);
  // };

  // const handleDelete = (item) => {
  //   console.log("Eliminar:", item);
  // };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar3 isOpen={isOpen} />

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
                <CardTitle className="text-lg">Estadísticas Generales</CardTitle>
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
            <CardHeader className="flex flex-row items-center">
              <CardTitle className="text-lg pl-2 pr-3">Tabla de Solicitudes</CardTitle>
              <div className="flex justify-end space-x-2">
                <button
                  className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full"
                  onClick={openModal} // Abrir modal al hacer clic
                >
                  <CirclePlus className="" />                                 
                </button>
                <button
                  className={`flex justify-center text-white font-bold py-3 px-4 rounded-full ${!isEditing
                      ? "bg-blue-500 hover:bg-blue-700" // Estilos para el modo "Editar"
                      : "bg-red-500 hover:bg-red-700"   // Estilos para el modo "Cancelar"
                    }`}
                  onClick={() => setIsEditing(!isEditing)} // Alternar estado de edición
                >
                  {!isEditing ? <Pencil className="" /> : <CircleX className="" />}
                  {/* {!isEditing ? "Editar" : "Cancelar"} */}
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable data={filteredData} isEditing={isEditing} />
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Modal para agregar solicitud */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-11/12 md:w-1/2 lg:w-3/4 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 dark:text-white text-gray-800">Agregar Solicitud</h2>

            {/* Formulario de agregar solicitud */}
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nombre */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    className="w-full p-2 border border-gray-300 dark:border-gray-900 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="Nombre"
                    required
                  />
                </div>

                {/* CURP */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    CURP <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="curp"
                    className="w-full p-2 border border-gray-300 dark:border-gray-900 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="CURP"
                    required
                  />
                </div>

                {/* Domicilio */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Domicilio <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="domicilio"
                    className="w-full p-2 border border-gray-300 dark:border-gray-900 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="Domicilio"
                    required
                  />
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Teléfono <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="telefono"
                    className="w-full p-2 border border-gray-300 dark:border-gray-900 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="Teléfono"
                    required
                  />
                </div>

                {/* Solicitud */}
                <div className="">
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Solicitud <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={1}
                    name="solicitud"
                    className="w-full p-2 border border-gray-300 dark:border-gray-900 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="Detalles de la solicitud"
                    required
                  ></textarea>
                </div>

                {/* Tipo de Apoyo */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Tipo de Apoyo <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="apoyo"
                    className="w-full p-2 border border-gray-300 dark:border-gray-900 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>Seleccione un tipo de apoyo</option>
                    <option value="despensas">Despensas</option>
                    <option value="funerarios">Funerarios</option>
                    <option value="concentradores">Concentradores</option>
                    <option value="medicamento">Medicamento</option>
                    <option value="vales_gasolina">Vales de Gasolina</option>
                  </select>

                </div>
                {/* Fecha */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">Hora y Fecha</label>
                  <input
                    type="datetime-local"
                    name="hora_fecha"
                    className="w-full p-2 border border-gray-300 dark:border-gray-900 rounded dark:bg-gray-700 dark:text-gray-300 appearance-none"
                  />

                </div>

                {/* Estatus */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Estatus <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="estatus"
                    className="w-full p-2 border border-gray-300 dark:border-gray-900 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>Seleccione un estatus</option>
                    <option value="recibido">Recibido</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="cancelado">Cancelado</option>
                    <option value="concluido">Concluido</option>
                  </select>

                </div>

                {/* Nota */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Nota</label>
                  <textarea
                    name="nota"
                    className="w-full p-2 border dark:border-gray-900 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="Notas adicionales"
                  ></textarea>
                </div>
              </div>

              {/* Botones */}
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  className="bg-gray-50 hover:bg-gray-200 border border-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 font-semibold py-2 px-4 rounded-full "
                  onClick={closeModal}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full "
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



    </div>
  );
}