// Dashboard.tsx o page.tsx
import { createLoader, parseAsInteger, parseAsString } from 'nuqs/server';
import MainPage from "@/components/MainPage";
import { prisma } from '@/lib/prisma';

const loader = createLoader({
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(5),
  search: parseAsString.withDefault(""),
});

export default async function Dashboard({ searchParams }: { searchParams: URLSearchParams | Record<string, string | undefined> }) {
  const { search, page, limit } = await loader(searchParams);
  const skip = (page - 1) * limit;

  const where = {
    OR: [
      { nombre: { contains: search } },
      { curp: { contains: search } },
      { apoyo_id: { contains: search } },
      { estatus_id: { contains: search } },
      {
        actualizador: {
          departamento_id: { contains: search },
        },
      },
    ],
  };

  const [totalSolicitudes, solicitudes, solicitudesCount] = await Promise.all([
    prisma.solicitudes.count({ where }),
    prisma.solicitudes.findMany({
      skip,
      take: limit,
      where,
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
        updatedBy: true,
        updatedAt: true,
        actualizador: {
          select: {
            id: true,
            name: true,
            departamento_id: true,
          },
        },
      },
      orderBy: { id: "desc" },
    }),
    prisma.solicitudes.groupBy({
      by: ["estatus_id"],
      _count: { id: true },
    }),
  ]);

  const estatusMap: Record<string, number> = Object.fromEntries(
    solicitudesCount.map((s) => [s.estatus_id, s._count.id])
  );

  const estatusCount = {
    Recibido: estatusMap["Recibido"] || 0,
    Pendiente: estatusMap["Pendiente"] || 0,
    Cancelado: estatusMap["Cancelado"] || 0,
    Concluido: estatusMap["Concluido"] || 0,
  };

  return (
    <MainPage
      solicitudes={solicitudes}
      currentPage={page}
      limit={limit}
      totalSolicitudes={totalSolicitudes}
      estatusCount={estatusCount}
    />
  );
}
