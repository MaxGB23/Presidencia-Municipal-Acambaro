'use client';
import React, { useEffect, useState } from 'react';
import Input from '@/components/ui/login/Input';
import Button from '@/components/ui/login/Button';
import Combobox from '@/components/ui/login/ComboBox';
import { LayoutGrid, FilePen } from "lucide-react";
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { updateDocument } from '@/actions/actions';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';

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
  }, [documento]); // No incluyas `setValue`, ya que es estable en React Hook Form

  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("presidente", data.presidente);
    formData.append("sexo_presidente", data.sexo_presidente);
    formData.append("atencion_ciudadana", data.atencion_ciudadana);
    formData.append("sexo_atencion_ciudadana", data.sexo_atencion_ciudadana);
    formData.append("hay_jefe", data.hay_jefe);
    formData.append("img", data.img);

    try {
      const result = await updateDocument(formData, documento.id);
      if (!result.success) throw new Error(result.message);
      router.push("/documento-pdf");
      toast({
        title: "Documento Actualizado",
        description: result.message,
        variant: "updated",
      });
    } catch (error) {
      router.refresh();
      toast({
        title: "Error al editar documento",
        description: error instanceof Error
          ? error.message.includes("Cannot read properties of undefined (reading 'success')")
            ? "Sesión expirada"
            : error.message
          : "Ocurrió un error inesperado.",
        variant: "destructive",
      });
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.1 }}
    >
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
                {/* <Combobox options={sexo} label="Sexo" value={watch('sexo_presidente')} onChange={(value) => setValue('sexo_presidente', value)} /> */}
                <Combobox
                  options={sexo}
                  label="Sexo"
                  value={watch('sexo_presidente', documento.sexo_presidente)}
                  onChange={(value) => setValue('sexo_presidente', value, { shouldValidate: true, shouldDirty: true })}
                />
                <Input {...register('img')} type="text" id="img" label="Imagen" placeholder="Ingresa la URL" />
              </div>

              {/* Parte derecha */}
              <div className="w-full lg:w-1/2 bg-white text-black p-10 flex flex-col justify-between gap-9">
                <Input {...register('atencion_ciudadana')} type="text" id="atencion_ciudadana" label="Atencion Ciudadana" placeholder="Ingresa el Nombre" required />
                {/* <Combobox options={sexo} label="Sexo" value={watch('sexo_atencion_ciudadana')} onChange={(value) => setValue('sexo_atencion_ciudadana', value)} /> */}
                <Combobox
                  options={sexo}
                  label="Sexo"
                  value={watch('sexo_atencion_ciudadana', documento.sexo_atencion_ciudadana)}
                  onChange={(value) => setValue('sexo_atencion_ciudadana', value, { shouldValidate: true, shouldDirty: true })}
                />
                {/* <Combobox options={hayJefe} label="Mostrar Atención Ciudadana" value={hayJefeValue} onChange={(value) => setValue('hay_jefe', value === "true")} /> */}
                <Combobox
                  options={hayJefe}
                  label="Mostrar Atención Ciudadana"
                  value={hayJefeValue}
                  onChange={(value) => setValue('hay_jefe', value === "true", { shouldValidate: false, shouldDirty: false })}
                />
              </div>
            </div>

            {/* Botón de envío */}
            <div className="flex justify-center">
              <Button className="mb-6 mx-12 lg:mx-60 mt-2" text="Actualizar Documento" />
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
