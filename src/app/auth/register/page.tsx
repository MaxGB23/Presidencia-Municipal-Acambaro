'use client'
import React from 'react';
import Input from '@/components/ui/login/Input';
import Button from '@/components/ui/login/Button';
import Combobox from '@/components/ui/login/ComboBox';
import { UserRoundPlus, LayoutGrid } from "lucide-react"
import Link from 'next/link';
import { useForm } from 'react-hook-form';  
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

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

function RegisterPage(){
  const { register, handleSubmit, setValue, watch, formState: { errors }, } = useForm({
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      permisos: "Visualizacion",
      departamento_id: "Otro",
    },
  });

  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = handleSubmit(async(data: any) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (res.ok) {
      toast({
        title: "Usuario Agregado",
        description: "El usuario ha sido agregado con éxito",
        variant: "success",
      });
      router.push('/usuarios/view');
    }else{
      toast({
        title: "Error",
        description: "El correo ya existe",
        variant: "destructive",
      });
    }
    // console.log(errors);
  });

  return (    
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
        <div className="w-full max-w-[1100px] lg:h-[640px] rounded-lg shadow-lg overflow-hidden bg-white text-black pt-12">
        <form onSubmit={onSubmit}>
          <div className="flex items-center justify-between px-10 ">            
            <div className="flex gap-x-4">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">
                Crear Usuario
              </h1>
              <UserRoundPlus className="hidden lg:block mb-2 size-7 lg:size-9" />
            </div>
            <Link href={"/usuarios/view"}>
              <LayoutGrid className="mb-3 size-7 lg:size-8 text-black hover:text-red-600" />
            </Link>
          </div>
          <div className="flex flex-col lg:flex-row w-full">
            {/* Parte izquierda */}
            <div className="w-full lg:w-1/2 p-10 flex flex-col justify-between gap-9">
              <Input type="text" id="name" label="Nombre" placeholder="Ingresa el Nombre"
                error={errors.name?.message as string | undefined}
                required={true}
                autoComplete="off"
                {...register("name", {
                  required: {
                    value: true,
                    message: "El nombre es obligatorio"
                  }
                })}
              />               
              <Input type="text" id="lastname" label="Apellidos" placeholder="Ingresa los Apellidos"
                error={errors.lastname?.message}
                autoComplete="off"
                required={true}
                {...register("lastname", {
                  required: {
                    value: true,
                    message: "El campo es obligatorio"
                  }
                })}
              />
              <Input type="password" id="password" label="Contraseña" placeholder="Ingresa la contraseña"
                error={errors.password?.message}
                required={true}
                autoComplete="off"
                {...register("password", {
                  required: {
                    value: true,
                    message: "La contraseña es obligatoria"
                  }
                })}
              />
            </div>
            {/* Parte derecha */}
            <div className="w-full lg:w-1/2 bg-white text-black p-10 lg:pt-10 pt-0 flex flex-col justify-between gap-9">
              <Input type="email" id="email" label="Correo Electrónico" placeholder="Ingresa el correo"
                error={errors.email?.message}
                required={true}
                autoComplete="off"
                {...register("email", {
                  required: {
                    value: true,
                    message: "El correo es obligatorio"
                  }
                })}
              />
              <Combobox
                options={departamentos}
                label="Departamento"
                placeholder="Selecciona un Departamento"
                value={watch("departamento_id") || ""}
                onChange={(value) => setValue("departamento_id", value)}
              />
              <Combobox
                options={permisos}
                label="Permisos"
                placeholder="Selecciona un Rol"
                value={watch("permisos") || ""} 
                onChange={(value) => setValue("permisos", value)}           
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button className="mb-6 mx-12 lg:mx-60 mt-2" text="Registrar Usuario" />
          </div>
        </form>
        </div>
      </div>

  );
};

export default RegisterPage;
