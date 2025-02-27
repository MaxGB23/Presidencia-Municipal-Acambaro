import MainPage from "@/components/MainPage";
import { prisma } from '@/lib/prisma';

interface Params {
  searchParams?: {
    page: number;
    limit: number;
    search?: string;
  };
}

export default async function Dashboard({ searchParams }: Params) {
  const params = await searchParams;
  const page = Number(params?.page || 1);
  const limit = Number(params?.limit || 5);
  const skip = (page - 1) * limit;
  const search = params?.search || ''; 

  const totalSolicitudes = await prisma.solicitudes.count({
    where: {
      OR: [
        { nombre: { contains: search, mode: 'insensitive' } },
        { curp: { contains: search, mode: 'insensitive' } },
        // { domicilio: { contains: search, mode: 'insensitive' } },
        // { telefono: { contains: search, mode: 'insensitive' } },
        { apoyo_id: { contains: search, mode: 'insensitive' } },
        // { solicitud: { contains: search, mode: 'insensitive' } },
        // { fecha: { gte: new Date(search) } },
        { estatus_id: { contains: search, mode: 'insensitive' } },
        // { nota: { contains: search, mode: 'insensitive' } },
        { actualizador: { departamento_id: { contains: search, mode: 'insensitive' } } },
      ],
    },
  });

  const solicitudes = await prisma.solicitudes.findMany({
    skip,
    take: limit,
    where: {
      OR: [
        { nombre: { contains: search, mode: 'insensitive' } },
        { curp: { contains: search, mode: 'insensitive' } },
        // { domicilio: { contains: search, mode: 'insensitive' } },
        // { telefono: { contains: search, mode: 'insensitive' } },
        { apoyo_id: { contains: search, mode: 'insensitive' } },
        // { solicitud: { contains: search, mode: 'insensitive' } },
        // { fecha: { gte: new Date(search) } },
        { estatus_id: { contains: search, mode: 'insensitive' } },
        // { nota: { contains: search, mode: 'insensitive' } },
        { actualizador: { departamento_id: { contains: search, mode: 'insensitive' } } },
      ],
    },
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
      // creador: { select: { id: true, name: true } },
      actualizador: { select: { id: true, name: true, departamento_id: true } },
    },
    orderBy: { id: "desc" },
  });

  const solicitudesRecibidas = await prisma.solicitudes.count({
    where: { estatus_id: "Recibido" },
  });
  const solicitudesPendientes = await prisma.solicitudes.count({
    where: { estatus_id: "Pendiente" },
  });
  const solicitudesCanceladas = await prisma.solicitudes.count({
    where: { estatus_id: "Cancelado" },
  });
  const solicitudesConcluidas = await prisma.solicitudes.count({
    where: { estatus_id: "Concluido" },
  });

  return (
    <MainPage
      solicitudes={solicitudes}
      totalSolicitudes={totalSolicitudes}
      currentPage={page}
      limit={limit}
      solicitudesRecibidas={solicitudesRecibidas}
      solicitudesPendientes={solicitudesPendientes}
      solicitudesCanceladas={solicitudesCanceladas}
      solicitudesConcluidas={solicitudesConcluidas}
    />
  );
}