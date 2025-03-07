import DocumentoPDF from '@/components/DocumentoPDF';
import { obtenerDocumentoPDF } from "@/app/api/documentos-pdf/route";


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
//   const documento_pdf = {
//     id: 1,
//     presidente: "LIC. CLAUDIA SILVA CAMPOS",
//     sexo_presidente: "MUJER",
//     atencion_ciudadana: "LIC. PATRICIA ORTIZ VÁZQUEZ",
//     sexo_atencion_ciudadana: "MUJER",
//     hay_jefe: false,
//     img: "/images/Logo4k.jpg",
// };
// const documento_pdf = await prisma.documentos_pdf.findMany({
//   take: 1,
//   select: {
//     id: true,
//     presidente: true,
//     sexo_presidente: true,
//     atencion_ciudadana: true,
//     sexo_atencion_ciudadana: true,
//     hay_jefe: true,
//     img: true
//   }
// });

// const data = documento_pdf.length > 0 ? {
//   ...documento_pdf[0],
//   img: documento_pdf[0].img || "/images/Image-not-found.png"
// } : {
//   id: 0,
//   presidente: "",
//   sexo_presidente: "",
//   atencion_ciudadana: "",
//   sexo_atencion_ciudadana: "",
//   hay_jefe: false,
//   img: "/images/Image-not-found.png"
// };

  const data = await obtenerDocumentoPDF();

  
  return (
    <DocumentoPDF data={data} currentPage={page} limit={limit} />
  )

  // const data = {
  //   ...documento_pdf,
  //   img: documento_pdf.img || "/images/Image-not-found.png", 
  // };


} 




// img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUAfyVe3Easiycyh3isP9wDQTYuSmGPsPQvLIJdEYvQ_DsFq5Ez2Nh_QjiS3oZ3B8ZPfK9cZQyIStmQMV1lDPLw"

// "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVEzqfXSO4HCa7FamTkgqKhra4O7kV-e7atA&s"

// "https://i.pinimg.com/736x/57/11/ad/5711ade01c5d414dba321e554a3c6e04.jpg"
