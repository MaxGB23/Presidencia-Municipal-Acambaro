import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Asegúrate de importar la instancia correcta de Prisma

function formatDate(isoDate: Date | null) {
  if (!isoDate) return null;
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export async function GET() {
  try {
    const solicitudes = await prisma.solicitudes.findMany({
      select: {
        id: true,
        curp: true,
        nombre: true,
        domicilio: true,
        telefono: true,
        solicitud: true,
        apoyo_id: true,
        fecha: true,
        estatus_id: true,
        nota: true,
        createdBy: true,
        updatedBy: true,
        createdAt: true,
        updatedAt: true,
        creador: {
          select: { id: true, name: true },
        },
        actualizador: {
          select: { id: true, name: true, departamento_id: true },
        },
      },
      orderBy: { id: "desc" },
    });

    const formattedData = solicitudes.map((s) => ({
      id: s.id,
      curp: s.curp,
      nombre: s.nombre,
      domicilio: s.domicilio,
      telefono: s.telefono,
      solicitud: s.solicitud,
      apoyo: s.apoyo_id,
      fecha: s.fecha
        ? s.fecha.toISOString().replace("T", " ").substring(0, 16)
        : null,
      estatus: s.estatus_id,
      nota: s.nota,
      createdBy: s.creador ? { id: s.creador.id, name: s.creador.name } : null,
      updatedBy: s.actualizador
        ? {
            id: s.actualizador.id,
            name: s.actualizador.name,
            departamento_id: s.actualizador.departamento_id,
          }
        : null,
      createdAt: formatDate(s.createdAt),
      updatedAt: formatDate(s.updatedAt),
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener datos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      nombre,
      curp,
      domicilio,
      telefono,
      solicitud,
      apoyo,
      fecha,
      estatus,
      nota,
      createdBy,
      updatedBy,
    } = body;

    const nuevaSolicitud = await prisma.solicitudes.create({
      data: {
        nombre,
        curp,
        domicilio,
        telefono,
        solicitud,
        apoyo_id: apoyo,
        fecha: fecha ? new Date(fecha) : null,
        estatus_id: estatus,
        nota,
        createdBy,
        updatedBy,
      },
      include: {
        creador: { select: { id: true, name: true } },
        actualizador: {
          select: { id: true, name: true, departamento_id: true },
        },
      },
    });

    const formattedData = {
      id: nuevaSolicitud.id,
      curp: nuevaSolicitud.curp,
      nombre: nuevaSolicitud.nombre,
      domicilio: nuevaSolicitud.domicilio,
      telefono: nuevaSolicitud.telefono,
      solicitud: nuevaSolicitud.solicitud,
      apoyo: nuevaSolicitud.apoyo_id,
      fecha: nuevaSolicitud.fecha
        ? nuevaSolicitud.fecha.toISOString().replace("T", " ").substring(0, 16)
        : null,
      estatus: nuevaSolicitud.estatus_id,
      nota: nuevaSolicitud.nota,
      createdBy: nuevaSolicitud.creador
        ? { id: nuevaSolicitud.creador.id, name: nuevaSolicitud.creador.name }
        : null,
      updatedBy: nuevaSolicitud.actualizador
        ? {
            id: nuevaSolicitud.actualizador.id,
            name: nuevaSolicitud.actualizador.name,
            departamento_id: nuevaSolicitud.actualizador.departamento_id,
          }
        : null,
      createdAt: nuevaSolicitud.createdAt.toISOString(),
      updatedAt: nuevaSolicitud.updatedAt.toISOString(),
    };

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error al crear la solicitud:", error);
    return NextResponse.json(
      { error: "Error al crear la solicitud" },
      { status: 500 }
    );
  }
}
