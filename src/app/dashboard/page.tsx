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
      ],
    },
  });

  const solicitudes = await prisma.solicitudes.findMany({
    skip, take: limit,
    where: {
      OR: [
        { nombre: { contains: search, mode: 'insensitive' } },
        { curp: { contains: search, mode: 'insensitive' } },
      ],
    },
    select: {
      id: true, curp: true, nombre: true, domicilio: true,
      telefono: true, solicitud: true, apoyo_id: true, fecha: true, 
      estatus_id: true, nota: true, updatedBy: true, updatedAt: true,
      actualizador: { 
        select: { id: true, name: true, departamento_id: true } },
    },
    orderBy: { id: "desc" },
  }); 

  const solicitudesCount = await prisma.solicitudes.groupBy({
    by: ['estatus_id'], _count: { id: true },
  });

  const estatusCount = {
    Recibido: solicitudesCount.find(
      s => s.estatus_id === "Recibido")?._count.id || 0,
    Pendiente: solicitudesCount.find(
      s => s.estatus_id === "Pendiente")?._count.id || 0,
    Cancelado: solicitudesCount.find(
      s => s.estatus_id === "Cancelado")?._count.id || 0,
    Concluido: solicitudesCount.find(
      s => s.estatus_id === "Concluido")?._count.id || 0,
  };

  return (
    <MainPage solicitudes={solicitudes} currentPage={page} limit={limit}  
      totalSolicitudes={totalSolicitudes} estatusCount={estatusCount} />
  );
}


// { domicilio: { contains: search, mode: 'insensitive' } },
// { telefono: { contains: search, mode: 'insensitive' } },
// { apoyo_id: { contains: search, mode: 'insensitive' } },
// { solicitud: { contains: search, mode: 'insensitive' } },
// { estatus_id: { contains: search, mode: 'insensitive' } },
// { nota: { contains: search, mode: 'insensitive' } },
// { actualizador: { departamento_id: { contains: search, mode: 'insensitive' } } },