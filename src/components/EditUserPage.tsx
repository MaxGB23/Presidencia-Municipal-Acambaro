'use client';
import React, { useEffect } from 'react';
import Input from '@/components/ui/login/Input';
import Button from '@/components/ui/login/Button';
import Combobox from '@/components/ui/login/ComboBox';
import { UserRoundPlus, LayoutGrid } from "lucide-react";
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { updateUser } from '@/actions/actions';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const departamentos = [
  { value: "Contraloría", label: "Contraloría" },
  { value: "Atencion Ciudadana", label: "Atención Ciudadana" },
  { value: "Atencion a delegados", label: "Atención a delegados" },
  { value: "DIF", label: "DIF" },
  { value: "IMCA", label: "IMCA" },
  { value: "JUMAPAA", label: "JUMAPAA" },
  { value: "Desarrollo Social", label: "Desarrollo Social" },
  { value: "Desarrollo Rural", label: "Desarrollo Rural" },
  { value: "Desarrollo Económico", label: "Desarrollo Económico" },
  { value: "Dirección de la Mujer", label: "Dirección de la Mujer" },
  { value: "Otro", label: "Otro" },
];

const permisos = [
  { value: "Admin", label: "Administrador" },
  { value: "Edicion", label: "Edición" },
  { value: "Visualizacion", label: "Visualización" },
];

export default function EditUserPage({ user }: { user: any }) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      permisos: user.permisos,
      departamento_id: user.departamento_id,
    },
  });

  // Actualizar los valores cuando se reciban los datos
  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('lastname', user.lastname);
      setValue('email', user.email);
      setValue('permisos', user.permisos);
      setValue('departamento_id', user.departamento_id);
    }
  }, [user, setValue]);

  const router = useRouter();

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("lastname", data.lastname);
    formData.append("email", data.email);
    formData.append("departamento_id", data.departamento_id);
    formData.append("permisos", data.permisos);
    formData.append("password", data.password);

    await updateUser(formData, user.id);
    router.push("/usuarios/view");
    toast({
      title: "Usuario Actualizado",
      description: "La información del usuario ha sido actualizada correctamente.",
      variant: "updated",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-[1100px] lg:h-[640px] rounded-lg shadow-lg overflow-hidden bg-white text-black pt-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between px-10">
            <div className="flex gap-x-4">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">Editar Usuario</h1>
              <UserRoundPlus className="hidden lg:block mb-2 size-7 lg:size-9" />
            </div>
            <Link href={"/usuarios/view"}>
              <LayoutGrid className="mb-3 size-7 lg:size-8 text-black hover:text-red-600" />
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row w-full">
            {/* Parte izquierda */}
            <div className="w-full lg:w-1/2 p-10 flex flex-col justify-between gap-9">
              <Input {...register('name')} type="text" id="name" label="Nombre" placeholder="Ingresa el Nombre" required />
              <Input {...register('lastname')} type="text" id="lastname" label="Apellidos" placeholder="Ingresa los Apellidos" required />
              <Input {...register('password')} type="password" id="password" label="Contraseña" placeholder="Ingresa la contraseña" />
            </div>

            {/* Parte derecha */}
            <div className="w-full lg:w-1/2 bg-white text-black p-10 flex flex-col justify-between gap-9">
              <Input {...register('email')} type="email" id="email" label="Correo Electrónico" placeholder="Ingresa el correo" required />
              <Combobox options={departamentos} label="Departamento" value={watch('departamento_id')} onChange={(value) => setValue('departamento_id', value)} />
              <Combobox options={permisos} label="Permisos" value={watch('permisos')} onChange={(value) => setValue('permisos', value)} />
            </div>
          </div>

          {/* Botón de envío */}
          <div className="flex justify-center">
            <Button className="mb-6 mx-12 lg:mx-60 mt-2" text="Actualizar Usuario" />
          </div>
        </form>
      </div>
    </div>
  );
}
