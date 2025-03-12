'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FileOutput } from 'lucide-react';
import { formatDistanceToNow, format } from "date-fns";
import { es } from "date-fns/locale";
import { useState, useEffect } from "react";
import PDF from "@/components/PDF";
import { EditModal } from "@/components/EditModal";
import { SolicitudFormateada, Status, statusColors } from '@/types/types';
import EditIcon from "@/components/svg/EditIcon";
import TrashIcon from "@/components/svg/TrashIcon";
import { deleteSolicitud } from "@/actions/actions";
import { toast } from "@/hooks/use-toast";

interface DataTableProps {
  data: SolicitudFormateada[];
  isEditing: boolean;
  totalSolicitudes: number;
  currentPage: number;
  limit: number;
}

export function DataTable({ data, isEditing, totalSolicitudes, currentPage, limit }: DataTableProps) {

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const totalPages = Math.ceil(totalSolicitudes / limit);

  const [editingRow, setEditingRow] = useState<SolicitudFormateada | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const [selectedRow, setSelectedRow] = useState<SolicitudFormateada | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', page.toString());
    newSearchParams.set('limit', limit.toString());
    router.replace(`${pathName}?${newSearchParams.toString()}`);
  };

  const handleEditClick = (row: SolicitudFormateada) => {
    setEditingRow(row);
  };

  const handleCloseEditModal = () => {
    setEditingRow(null);
  };

  const handleDelete = async (rowId: number) => {
    const userConfirmed = confirm("¿Estás seguro de eliminar esta solicitud?");
    if (userConfirmed) {
      try {
        const result = await deleteSolicitud(rowId);
        if (!result.success) throw new Error(result.message);
        router.refresh();
        toast({
          title: "Solicitud Eliminada",
          description: result.message,
          variant: "destructive",
        });
      } catch (error) {
        router.refresh();
        toast({
          title: "Error al eliminar solicitud",
          description: error instanceof Error
            ? error.message.includes("Cannot read properties of undefined (reading 'success')")
              ? "Sesión expirada"
              : error.message
            : "Ocurrió un error inesperado.",
          variant: "destructive",
        });
      }
    };
  };

  async function generatePDF(row: SolicitudFormateada) {
    setSelectedRow(row);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    try {
      if (typeof window === "undefined") return;

      const element = document.querySelector(`#pdf-${row.id}`);
      if (!element) {
        console.error("Elemento no encontrado");
        alert("Error de Conexión. Inténtalo de nuevo.");
        return;
      }

      const html2pdf = (await import("html2pdf.js")).default;

      const options = {
        margin: 0,
        filename: `Apoyo-${row.curp}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
        },
        jsPDF: { unit: "mm", format: "letter", orientation: "portrait" }
      };

      await html2pdf().from(element).set(options).save();
      console.log("PDF generado con éxito.");
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      alert("Hubo un problema al generar el PDF. Inténtalo de nuevo.");
    } 
    // finally {
    //   setSelectedRow(null);
    // }
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
                    <button onClick={() => generatePDF(row)} aria-label="PDF"
                      className="flex items-center gap-1 text-green-600 hover:text-green-500 dark:text-green-300 dark:hover:text-green-500">
                      <FileOutput className="size-5"></FileOutput>
                    </button>
                    <button
                      onClick={() => handleEditClick(row)} aria-label="Editar"
                      className="flex items-center gap-1 text-blue-500 hover:text-blue-300 dark:text-blue-300 dark:hover:text-blue-200"
                    >
                      <EditIcon />
                    </button>

                    <button
                      onClick={() => handleDelete(row.id)} aria-label="Eliminar"
                      className="flex items-center gap-1 text-red-600 hover:text-red-300 dark:text-red-400 dark:hover:text-red-200"
                    >
                      <TrashIcon />
                    </button>

                  </div>
                </TableCell>
              )}
              <TableCell className="pl-4">{row.curp}</TableCell>
              <TableCell>{row.nombre}</TableCell>
              <TableCell>{row.domicilio}</TableCell>
              <TableCell>{row.telefono}</TableCell>
              <TableCell className="w-52">
                {row.solicitud}
                <br />
                <ul className="list-disc ml-4">
                  <li className="marker:text-blue-500">{row.apoyo_id}</li>
                </ul>
              </TableCell>
              <TableCell className="w-60">
                <div className="flex flex-col gap-1">
                  <span>
                    {row.fecha && !isNaN(new Date(row.fecha).getTime())
                      ? (() => {
                        try {
                          const formattedDate = format(new Date(row.fecha), "dd 'de' MMMM 'de' yyyy, HH:mm", { locale: es });
                          return formattedDate;
                        } catch (error) {
                          console.error("Error al formatear la fecha:", error);
                          return "Error al formatear la fecha";
                        }
                      })()
                      : "Fecha inválida"}
                  </span>

                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {row.fecha && !isNaN(new Date(row.fecha).getTime())
                      ? formatDistanceToNow(new Date(row.fecha), { addSuffix: true, locale: es })
                      : 'Sin fecha'}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className={`px-3 py-2 rounded-full text-white ${statusColors[row.estatus_id as Status] || "bg-gray-400"}`}>
                  {row.estatus_id ?? "Sin estatus"}
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
          {
            totalSolicitudes === 0 ? (
              'No hay resultados.'
            ) : (
              <span>Mostrando {(currentPage - 1) * limit + 1}-{Math.min(currentPage * limit, totalSolicitudes)} de un total de {totalSolicitudes}</span>
            )
          }
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
              <PaginationNext onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0} className='dark:hover:bg-gray-700' />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      {selectedRow && (
        <div className="hidden">
          <PDF
            nombre={selectedRow.nombre}
            domicilio={selectedRow.domicilio}
            solicitud={selectedRow.solicitud}
            telefono={selectedRow.telefono}
            id={`pdf-${selectedRow.id}`}
          />
        </div>
      )}
      {/* Modal de edición */}
      {editingRow && (
        <EditModal
          editingRow={editingRow}
          onClose={handleCloseEditModal}
        />
      )}
    </>
  );
}