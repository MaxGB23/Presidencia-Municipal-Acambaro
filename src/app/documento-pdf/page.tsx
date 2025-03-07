import DocumentoPDF from '@/components/DocumentoPDF';

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

  // Check if we're on the server or client side
  const apiUrl = typeof window === 'undefined'
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/documentos-pdf`
    : '/api/documentos-pdf'; // Relative URL for client side

  const response = await fetch(apiUrl);
  const data = await response.json();

  return (
    <DocumentoPDF data={data} currentPage={page} limit={limit} />
  );
}





// img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUAfyVe3Easiycyh3isP9wDQTYuSmGPsPQvLIJdEYvQ_DsFq5Ez2Nh_QjiS3oZ3B8ZPfK9cZQyIStmQMV1lDPLw"

// "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVEzqfXSO4HCa7FamTkgqKhra4O7kV-e7atA&s"

// "https://i.pinimg.com/736x/57/11/ad/5711ade01c5d414dba321e554a3c6e04.jpg"
