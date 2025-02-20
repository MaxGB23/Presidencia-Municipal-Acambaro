"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createSolicitud(formData: FormData, userId: string) {
  const userIdInt = parseInt(userId, 10);
  console.log("User ID:", userIdInt); // Log para verificar el userId
  await prisma.solicitudes.create({
    data: {
      curp: formData.get("curp") as string,
      nombre: formData.get("nombre") as string,
      domicilio: formData.get("domicilio") as string,
      telefono: formData.get("telefono") as string,
      solicitud: formData.get("solicitud") as string,
      apoyo_id: formData.get("apoyo") as string,
      fecha: new Date(formData.get("fecha") as string),
      estatus_id: formData.get("estatus") as string,
      nota: formData.get("nota") as string,
      createdBy: userIdInt,
      updatedBy: userIdInt,
    },
  });
  
}

export async function updateSolicitud(
  formData: FormData,
  userId: string,
  id: string
) {
  const userIdInt = parseInt(userId, 10);
  const idInt = parseInt(id, 10);

  await prisma.solicitudes.update({
    where: { id: idInt },
    data: {
      curp: formData.get("curp") as string,
      nombre: formData.get("nombre") as string,
      domicilio: formData.get("domicilio") as string,
      telefono: formData.get("telefono") as string,
      solicitud: formData.get("solicitud") as string,
      apoyo_id: formData.get("apoyo") as string,
      fecha: new Date(formData.get("fecha") as string),
      estatus_id: formData.get("estatus") as string,
      nota: formData.get("nota") as string,
      updatedBy: userIdInt,
    },
  });
}

export async function deleteSolicitud(id: number) {
  await prisma.solicitudes.delete({ where: { id } });
}
