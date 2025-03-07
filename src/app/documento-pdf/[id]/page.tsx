import { prisma } from '@/lib/prisma';
import EditPDFPage from '@/components/EditPDFPage';
import { redirect } from 'next/navigation';

interface EditPDFProps {
  params: Promise<{ id: string }>;
}

const EditPDF = async ({ params }: EditPDFProps) => {

  const resolvedParams = await params;
  const docId = parseInt(resolvedParams.id, 10);

  if (isNaN(docId)) {
    throw new Error("ID inválido");
  }

  const documento_pdf = await prisma.documentos_pdf.findUnique({
    where: { id: docId },
  });

  if (!documento_pdf) {
    redirect("/documentos-pdf");
  }

  return <EditPDFPage documento={documento_pdf} />;
};

export default EditPDF;