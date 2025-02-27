'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { statusColors } from "@/utils/data";
import { FileOutput } from 'lucide-react';
import { formatDistanceToNow, format } from "date-fns";
import { es } from "date-fns/locale";
import { useState, useEffect } from "react";
import PDF from "@/components/PDF";
import { EditModal } from "./EditModal";

export type Status = "Recibido" | "Pendiente" | "Cancelado" | "Concluido";

interface Solicitud {
  id: number;
  curp: string;
  nombre: string;
  domicilio: string;
  telefono: string | null;
  solicitud: string | null;
  apoyo: string | null;
  fecha: string | null;
  estatus: Status;
  nota: string | null;
  updatedBy: string | null;
  updatedAt: string;
}

interface DataTableProps {
  data: Solicitud[];
  isEditing: boolean;
  onEdit: (updatedRow: Solicitud) => void;
  onDelete: (rowId: number) => void;
  solicitudes: Solicitud[];
  totalSolicitudes: number;
  currentPage: number;
  limit: number;

}

export function DataTable({ data, isEditing, onEdit, onDelete, totalSolicitudes, currentPage, limit }: DataTableProps) {
  console.log(data);

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const totalPages = Math.ceil(totalSolicitudes / limit);

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', page.toString());
    newSearchParams.set('limit', limit.toString());
    router.replace(`${pathName}?${newSearchParams.toString()}`);
  };


  const [editingRow, setEditingRow] = useState<Solicitud | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleEditClick = (row: Solicitud) => {
    setEditingRow(row);
  };

  const handleSaveEdit = (updatedRow: Solicitud) => {
    onEdit(updatedRow);  // Actualiza la lista en MainPage
    setEditingRow(null);
  };

  const handleCloseEditModal = () => {
    setEditingRow(null);
  };

  async function generatePDF(row: Solicitud) {
    try {
      if (typeof window === "undefined") return; // Evita ejecución en SSR

      const element = document.querySelector(`#pdf-${row.id}`);
      if (!element) {
        console.error("Elemento no encontrado");
        alert("No se encontró el contenido a exportar.");
        return;
      }

      // Importar html2pdf dinámicamente en el cliente
      const html2pdf = (await import("html2pdf.js")).default;

      const options = {
        margin: 0,
        filename: `Apoyo-${row.curp}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "letter", orientation: "portrait" }
      };

      await html2pdf().from(element).set(options).save();
      console.log("PDF generado con éxito.");
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      alert("Hubo un problema al generar el PDF. Inténtalo de nuevo.");
    }
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-gray-200 bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-700">
            {isEditing && <TableHead className="text-center pr-4 w-36">ACCIONES</TableHead>}
            <TableHead className="pl-4">CURP</TableHead>
            <TableHead>NOMBRE</TableHead>
            <TableHead>DOMICILIO</TableHead>
            <TableHead>TELÉFONO</TableHead>
            <TableHead className="text-center pr-6">SOLICITUD</TableHead>
            <TableHead>FECHA Y HORA</TableHead>
            <TableHead className="pl-4">ESTATUS</TableHead>
            <TableHead className="text-center pr-10">NOTA</TableHead>
            <TableHead className="text-center w-12 pr-4 pl-0">MODIFICADO</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 && (
            <TableRow className="dark:bg-gray-800 dark:text-white">
              <TableCell className="p-7" colSpan={12}>No hay resultados.</TableCell>
            </TableRow>
          )}
          {data.map((row) => (



            <TableRow key={row.id} className="dark:bg-slate-800 dark:text-white">
              {isEditing && (
                <TableCell>
                  <div className="flex space-x-3 pl-2 justify-center pr-4">

                    <button onClick={() => generatePDF(row)}
                      className="flex items-center gap-1 text-green-600 hover:text-green-500 dark:text-green-300 dark:hover:text-green-500">
                      <FileOutput className="size-5"></FileOutput>
                      <div className="hidden">
                        <PDF
                          nombre={row.nombre}
                          domicilio={row.domicilio}
                          solicitud={row.solicitud}
                          telefono={row.telefono}
                          id={`pdf-${row.id}`}
                        />
                      </div>

                    </button>

                    <button
                      onClick={() => handleEditClick(row)}
                      className="flex items-center gap-1 text-blue-500 hover:text-blue-300 dark:text-blue-300 dark:hover:text-blue-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 11.5V19a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h7.5" />
                        <path d="M17 2.5a2.121 2.121 0 013 3l-9 9L7 15l.5-3.5 9-9z" />
                      </svg>
                    </button>

                    <button
                      onClick={() => onDelete(row.id)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-300 dark:text-red-400 dark:hover:text-red-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M9 3h6a1 1 0 011 1v2H8V4a1 1 0 011-1z" />
                        <path d="M4 7h16m-1 0v11a2 2 0 01-2 2H7a2 2 0 01-2-2V7h14z" />
                        <path d="M10 11v6m4-6v6" />
                      </svg>
                    </button>

                  </div>
                </TableCell>
              )}
              <TableCell>{row.curp}</TableCell>
              <TableCell>{row.nombre}</TableCell>
              <TableCell>{row.domicilio}</TableCell>
              <TableCell>{row.telefono}</TableCell>
              <TableCell>
                {row.solicitud}
                <br />
                <ul className="list-disc ml-4">
                  <li className="marker:text-blue-500">{row.apoyo}</li>
                </ul>
              </TableCell>
              <TableCell className="w-60">
                <div className="flex flex-col gap-1">
                  <span>
                    {row.fecha
                      ? format(new Date(row.fecha), "dd 'de' MMMM 'de' yyyy, HH:mm", { locale: es })
                      : "Sin fecha"}
                  </span>

                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {formatDistanceToNow(new Date(row.fecha), { addSuffix: true, locale: es })}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className={`px-3 py-2 rounded-full text-white ${statusColors[row.estatus] || "bg-gray-400"}`}>
                  {row.estatus ?? "Sin estatus"}
                </span>
              </TableCell>

              <TableCell className="max-w-[200px]">{row.nota}</TableCell>
              <TableCell className="text-left">
                <span className="whitespace-break-spaces">
                  {row.updatedBy ? row.updatedBy.departamento_id : "Usuario eliminado"}
                </span>
                <br />
                <span className="text-xs text-gray-400 ">{row.updatedAt}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center align-items-center p-6 pb-0">
        <span className="text-gray-500 dark:text-gray-400 text-sm hidden lg:block w-full">
          Mostrando {(currentPage - 1) * limit + 1}-{Math.min(currentPage * limit, totalSolicitudes)} de un total de {totalSolicitudes}
        </span>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className='dark:hover:bg-gray-700' />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink onClick={() => handlePageChange(i + 1)} isActive={currentPage === i + 1}
                  className='dark:hover:bg-gray-700'>{i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className='dark:hover:bg-gray-700' />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>


      {/* Modal de edición */}
      {editingRow && (
        <EditModal
          editingRow={editingRow}
          onSave={handleSaveEdit}
          onClose={handleCloseEditModal}
        />

      )}
    </>
  );
}