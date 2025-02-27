import { prisma } from '@/lib/prisma';
import EditUserPage from '@/components/EditUserPage';
import { redirect } from 'next/navigation';

interface EditUserProps {
  params: Promise<{ id: string }>;
}

const EditUser = async ({ params }: EditUserProps) => {
  const resolvedParams = await params;
  const userId = parseInt(resolvedParams.id, 10);

  if (isNaN(userId)) {
    throw new Error("ID inválido");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {    
    redirect("/usuarios/view");    
  }

  return <EditUserPage user={user} />;
};

export default EditUser;
