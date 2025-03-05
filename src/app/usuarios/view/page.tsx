import UsuariosRegistrados from '@/components/UsuariosRegistrados';
import { prisma } from '@/lib/prisma';

interface Params {
  searchParams?: {
    page: number;
    limit: number;
    search?: string;
  };
}

export default async function UsuariosPage({ searchParams }: Params) {

  const params = await searchParams;
  const page = Number(params?.page || 1);
  const limit = Number(params?.limit || 6);
  const skip = (page - 1) * limit;
  const search = params?.search || '';

  const totalUsers = await prisma.user.count({
    where: {
      OR: [
        { name: { contains: search, mode: 'insensitive' } }, 
        { email: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
        { lastname: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { departamento_id: { contains: search, mode: 'insensitive' } },
        { permisos: { contains: search, mode: 'insensitive' } },
      ],
    },
  });

  const users = await prisma.user.findMany({
    skip,
    take: limit,
    where: {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { lastname: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { departamento_id: { contains: search, mode: 'insensitive' } },
        { permisos: { contains: search, mode: 'insensitive' } },
      ],
    },
    orderBy: { createdAt: 'asc' },
  });

  return (
    <UsuariosRegistrados users={users} totalUsers={totalUsers} currentPage={page} limit={limit} />
  )
} 