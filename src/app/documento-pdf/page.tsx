import DocumentoPDF from '@/components/DocumentoPDF';
import { prisma } from '@/lib/prisma';

interface Params {
  searchParams?: Promise<{
    page: number;
    limit: number;
    search?: string;
  }> | undefined;
}

export default async function DocumentoPage({ searchParams }: Params) {
  const params = await searchParams;
  const page = Number(params?.page || 1);
  const limit = Number(params?.limit || 5);
  const skip = (page - 1) * limit;
  const search = params?.search || ''; 
  const documento_pdf = {
    id: 1,
    presidente: "LIC. CLAUDIA SILVA CAMPOS",
    sexo_presidente: "MUJER",
    atencion_ciudadana: "LIC. PATRICIA ORTIZ VÁZQUEZ",
    sexo_atencion_ciudadana: "MUJER",
    hay_jefe: true,
    img: "/images/logo4k.jpg",
    // img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUAfyVe3Easiycyh3isP9wDQTYuSmGPsPQvLIJdEYvQ_DsFq5Ez2Nh_QjiS3oZ3B8ZPfK9cZQyIStmQMV1lDPLw"
  };

  return ( 
    <DocumentoPDF data={documento_pdf} currentPage={page} limit={limit} />
  )
} 

// "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVEzqfXSO4HCa7FamTkgqKhra4O7kV-e7atA&s"