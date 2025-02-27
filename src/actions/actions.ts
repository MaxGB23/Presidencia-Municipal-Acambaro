"use server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function createSolicitud(formData: FormData, userId: string) {
  const userIdInt = parseInt(userId, 10); 
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
  console.log("Nueva solicitud creada:", formData, "Creado por User ID:", userIdInt);  
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
  console.log("Datos actualizados:", formData, "Modificado por User ID:", userIdInt);
}

export async function deleteSolicitud(id: number) {
  await prisma.solicitudes.delete({ where: { id } });
  console.log("Solicitud no.", id, "eliminada con éxito");
}

// User Actions
export async function updateUser(
  formData: FormData,
  id: string
) {
  const idInt = parseInt(id, 10);
  await prisma.user.update({
    where: { id: idInt },
    data: {
      name: formData.get("name") as string,
      lastname: formData.get("lastname") as string,
      email: formData.get("email") as string,
      departamento_id: formData.get("departamento_id") as string,
      permisos: formData.get("permisos") as string,
      ...(formData.get("password") && {
      password: await bcrypt.hash(formData.get("password") as string, 10),  
      }),   
    },
  });
}

export async function deleteUser(id: number) {
  await prisma.user.delete({ where: { id } });
  console.log("Usuario no.", id, "eliminado con éxito");
}
