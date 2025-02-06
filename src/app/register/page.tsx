'use client'
import React from 'react';
import Input from '@/components/ui/login/Input';
import Button from '@/components/ui/login/Button';
import Combobox from '@/components/ui/login/ComboBox';

const departamentos = [
  { value: "contralor", label: "Contraloría" },
  { value: "prueba", label: "Prueba" },
];

const permisos = [
  { value: "admin", label: "Administrador" },
  { value: "edicion", label: "Edición" },
  { value: "visualizacion", label: "Visualización" },
];

const Register: React.FC = () => (
  <div className='flex justify-center items-center min-h-screen bg-gray-100 p-6'>
    <div className="w-full max-w-[1100px] lg:h-[640px] rounded-lg shadow-lg overflow-hidden bg-white text-black pt-12">
      {/* Título del formulario */}
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 pl-10 mb-2">
        Crear Usuario
      </h1>

      <div className="flex flex-col lg:flex-row w-full">
        {/* Parte izquierda del formulario */}
        <div className="w-full lg:w-1/2 p-10 flex flex-col justify-between gap-8">
          <Input
            type="text"
            id="name"
            label="Nombre"
            placeholder="Ingresa el Nombre"
          />
          <Input
            type="text"
            id="lastname"
            label="Apellidos"
            placeholder="Ingresa los Apellidos"
          />
          <Input
            type="password"
            id="password"
            label="Contraseña"
            placeholder="Ingresa la contraseña"
          />
        </div>

        {/* Parte derecha del formulario */}
        <div className="w-full lg:w-1/2 bg-white text-black p-10 lg:pt-10 pt-0 flex flex-col justify-between gap-8 lg:gap-5">
          <Input
            type="email"
            id="email"
            label="Correo Electrónico"
            placeholder="Ingresa el correo"
          />
          <Combobox
            options={departamentos}
            label="Departamento"
            placeholder="Selecciona un Departamento"
            onSelect={(value) => console.log("Departamento seleccionado:", value)}
          />
          <Combobox
            options={permisos}
            label="Permisos"
            placeholder="Selecciona un Rol"
            onSelect={(value) => console.log("Rol seleccionado:", value)}
          />
        </div>
      </div>
      {/* Botón centrado entre las dos columnas */}
      <div className="flex justify-center">
        <Button className="w-1/2 mb-6" text="Registrar Usuario" />
      </div>
    </div>
  </div>
);

export default Register;
