'use client';
import React, { useEffect } from 'react';
import Input from '@/components/ui/login/Input';
import Button from '@/components/ui/login/Button';
import Combobox from '@/components/ui/login/ComboBox';
import { LayoutGrid, FilePen } from "lucide-react";
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { updateDocument } from '@/actions/actions';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const hayJefe = [
  { value: "true", label: "Sí" },
  { value: "false", label: "No" },
];

const sexo = [
  { value: "HOMBRE", label: "Hombre" },
  { value: "MUJER", label: "Mujer" },
  { value: "OTRO", label: "Otro" },
]

export default function EditPDFPage({ documento }: { documento: any }) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      presidente: documento.presidente,
      sexo_presidente: documento.sexo_presidente,
      img: documento.img,
      atencion_ciudadana: documento.atencion_ciudadana,
      sexo_atencion_ciudadana: documento.sexo_atencion_ciudadana,
      hay_jefe: documento.hay_jefe,
    },
  });

  const hayJefeValue = watch('hay_jefe') ? "true" : "false";


  // Actualizar los valores cuando se reciban los datos
  useEffect(() => {
    if (documento) {
      setValue('presidente', documento.presidente);
      setValue('sexo_presidente', documento.sexo_presidente);
      setValue('img', documento.img);
      setValue('atencion_ciudadana', documento.atencion_ciudadana);
      setValue('sexo_atencion_ciudadana', documento.sexo_atencion_ciudadana);
      setValue('hay_jefe', documento.hay_jefe);
    }
  }, [documento, setValue]);

  const router = useRouter();

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("presidente", data.presidente);
    formData.append("sexo_presidente", data.sexo_presidente);
    formData.append("atencion_ciudadana", data.atencion_ciudadana);
    formData.append("sexo_atencion_ciudadana", data.sexo_atencion_ciudadana);
    formData.append("hay_jefe", data.hay_jefe);
    formData.append("img", data.img);

    await updateDocument(formData, documento.id);
    router.push("/documento-pdf");
    toast({
      title: "Documento Actualizado",
      description: "La información del documento ha sido actualizada.",
      variant: "updated",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-[1100px] lg:h-[640px] rounded-lg shadow-lg overflow-hidden bg-white text-black pt-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between px-10">
            <div className="flex gap-x-4">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">Editar PDF</h1>
              <FilePen className="hidden lg:block mb-2 size-7 lg:size-9" />
            </div>
            <Link href={"/documento-pdf"}>
              <LayoutGrid className="mb-3 size-7 lg:size-8 text-black hover:text-red-600" />
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row w-full">
            {/* Parte izquierda */}
            <div className="w-full lg:w-1/2 p-10 flex flex-col justify-between gap-9">
              <Input {...register('presidente')} type="text" id="presidente" label="Presidente" placeholder="Ingresa el Nombre" required />
              <Combobox options={sexo} label="Sexo" value={watch('sexo_presidente')} onChange={(value) => setValue('sexo_presidente', value)} />
              <Input {...register('img')} type="text" id="img" label="Imagen" placeholder="Ingresa la URL" />
            </div>

            {/* Parte derecha */}
            <div className="w-full lg:w-1/2 bg-white text-black p-10 flex flex-col justify-between gap-9">
              <Input {...register('atencion_ciudadana')} type="text" id="atencion_ciudadana" label="Atencion Ciudadana" placeholder="Ingresa el Nombre" required/>
              <Combobox options={sexo} label="Sexo" value={watch('sexo_atencion_ciudadana')} onChange={(value) => setValue('sexo_atencion_ciudadana', value)} />
              <Combobox options={hayJefe} label="Mostrar Atención Ciudadana" value={hayJefeValue} onChange={(value) => setValue('hay_jefe', value === "true")} />
            </div>
          </div>

          {/* Botón de envío */}
          <div className="flex justify-center">
            <Button className="mb-6 mx-12 lg:mx-60 mt-2" text="Actualizar Documento" />
          </div>
        </form>
      </div>
    </div>
  );
}
