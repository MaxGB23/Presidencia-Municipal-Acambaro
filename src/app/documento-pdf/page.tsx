import DocumentoPDF from '@/components/DocumentoPDF';
import { prisma } from '@/lib/prisma';

export default async function DocumentoPage() {
  
  const documento_pdf = {
    id: 1,
    presidente: "LIC. CLAUDIA SILVA CAMPOS",
    sexo_presidente: "MUJER",
    atencion_ciudadana: "LIC. PATRICIA ORTIZ VÁZQUEZ",
    sexo_atencion_ciudadana: "MUJER",
    hay_jefe: true,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUAfyVe3Easiycyh3isP9wDQTYuSmGPsPQvLIJdEYvQ_DsFq5Ez2Nh_QjiS3oZ3B8ZPfK9cZQyIStmQMV1lDPLw"
  };

  return ( 
    <DocumentoPDF data={documento_pdf}/>
  )
} 

// "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVEzqfXSO4HCa7FamTkgqKhra4O7kV-e7atA&s"