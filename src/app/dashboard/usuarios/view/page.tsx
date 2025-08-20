import UsuariosRegistrados from '@/components/UsuariosRegistrados';
import { prisma } from '@/lib/prisma';

interface Params {
  searchParams?: Promise<{
    page: number;
    limit: number;
    search?: string;
  }> | undefined;
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
        { name: { contains: search } }, 
        { email: { contains: search } },
        { lastname: { contains: search } },
        { departamento_id: { contains: search } },
        { permisos: { contains: search } },
      ],
    },
  });

  const users = await prisma.user.findMany({
    skip,
    take: limit,
    where: {
      OR: [
        { name: { contains: search } }, 
        { email: { contains: search } },
        { lastname: { contains: search } },
        { departamento_id: { contains: search } },
        { permisos: { contains: search } },
      ],
    },
    orderBy: { createdAt: 'asc' },
  });

  return (
    <UsuariosRegistrados users={users} totalUsers={totalUsers} currentPage={page} limit={limit} />
  )
} 