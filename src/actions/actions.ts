"use server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function createSolicitud(formData: FormData, userId: string) {
  try {
    const userIdInt = parseInt(userId, 10);
    await prisma.solicitudes.create({
      data: {
        curp: formData.get("curp") as string,
        nombre: formData.get("nombre") as string,
        domicilio: formData.get("domicilio") as string,
        telefono: formData.get("telefono") as string,
        solicitud: formData.get("solicitud") as string,
        apoyo_id: formData.get("apoyo_id") as string,
        fecha: new Date(formData.get("fecha") as string),
        estatus_id: formData.get("estatus_id") as string,
        nota: formData.get("nota") as string,
        createdBy: userIdInt,
        updatedBy: userIdInt,
      },
    });
    console.log(
      "Nueva solicitud creada:",
      formData,
      "Creado por User ID:",
      userIdInt
    );
    return { success: true, message: "Solicitud agregada con éxito" };
  } catch (error) {
    console.error("Error al crear solicitud:", error);
    return {
      success: false,
      message: "Error al crear la solicitud. Inténtalo de nuevo.",
    };
  }
}

export async function updateSolicitud(
  formData: FormData,
  userId: string,
  id: string
) {
  try {
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
        apoyo_id: formData.get("apoyo_id") as string,
        fecha: new Date(formData.get("fecha") as string),
        estatus_id: formData.get("estatus_id") as string,
        nota: formData.get("nota") as string,
        updatedBy: userIdInt,
      },
    });
    console.log(
      "Datos actualizados:",
      formData,
      "Modificado por User ID:",
      userIdInt
    );
    return { success: true, message: "Solicitud actualizada con éxito" };
  } catch (error) {
    console.error("Error al editar solicitud:", error);
    return {
      success: false,
      message: "Error al editar la solicitud. Inténtalo de nuevo.",
    };
  }
}

export async function deleteSolicitud(id: number) {
  try {
    await prisma.solicitudes.delete({ where: { id } });
    console.log("Solicitud no.", id, "eliminada con éxito");
    return {
      success: true,
      message: "Solicitud eliminada con éxito",
    };
  } catch (error) {
    console.error("Error al eliminar solicitud:", error);
    return {
      success: false,
      message: "Error al eliminar la solicitud. Inténtalo de nuevo.",
    };
  }
}


// User Actions
export async function updateUser(formData: FormData, id: string) {
  try {
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
    return { success: true, message: "Usuario actualizado con éxito" };
  } catch (error) {
    console.error("Error al editar usuario:", error);
    return {
      success: false,
      message: "Error al editar usuario. Inténtalo de nuevo.",
    };
  }
}

export async function deleteUser(id: number) {
  try {
    await prisma.user.delete({ where: { id } });
    console.log("Usuario no.", id, "eliminado con éxito");
    return {
      success: true,
      message: "Usuario eliminado con éxito",
    };
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return {
      success: false,
      message: "Error al eliminar usuario. Inténtalo de nuevo.",
    };
  }
}


// pdf actions
export async function updateDocument(formData: FormData, id: string) {
  try {
    const idInt = parseInt(id, 10);
    const hayJefe = formData.get("hay_jefe") === "true";

    await prisma.documentos_pdf.update({
      where: { id: idInt },
      data: {
        presidente: formData.get("presidente") as string,
        sexo_presidente: formData.get("sexo_presidente") as string,
        atencion_ciudadana: formData.get("atencion_ciudadana") as string,
        sexo_atencion_ciudadana: formData.get(
          "sexo_atencion_ciudadana"
        ) as string,
        hay_jefe: hayJefe,
        img: formData.get("img") as string,
      },
    });
    return { success: true, message: "Documento actualizado con éxito" };
  } catch (error) {
    console.error("Error al editar documento:", error);
    return {
      success: false,
      message: "Error al editar el documento. Inténtalo de nuevo.",
    };
  }
}
