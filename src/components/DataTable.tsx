'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type UserData, statusColors } from "@/utils/data";
import { FileOutput } from 'lucide-react';
import { formatDistanceToNow, format } from "date-fns";
import { es } from "date-fns/locale";
import { useState, useEffect } from "react";
import PDF from "@/components/PDF";
import { EditModal } from "./EditModal";

interface DataTableProps {
  data: UserData[];
  isEditing: boolean;
}

export function DataTable({ data, isEditing }: DataTableProps) {
  const [editingRow, setEditingRow] = useState<UserData | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleEditClick = (row: UserData) => {
    setEditingRow(row);
  };

  const handleSaveEdit = (updatedRow: UserData) => {
    console.log("Guardando cambios:", updatedRow);
    setEditingRow(null); // Cierra el modal
  };

  const handleCloseEditModal = () => {
    setEditingRow(null);
  };

  // const handleSaveEdit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (editingRow) {
  //     try {
  //       // Aquí puedes hacer una llamada a la API para guardar los cambios
  //       console.log("Guardando cambios:", editingRow);
  //       handleCloseEditModal(); // Cierra el modal después de guardar
  //     } catch (error) {
  //       console.error("Error al guardar los cambios:", error);
  //     }
  //   }
  // };

  async function generatePDF(row: UserData) {
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
            {isEditing && <TableHead>ACCIONES</TableHead>}
            <TableHead>CURP</TableHead>
            <TableHead>NOMBRE</TableHead>
            <TableHead>DOMICILIO</TableHead>
            <TableHead>TELÉFONO</TableHead>
            <TableHead>SOLICITUD</TableHead>
            <TableHead>FECHA Y HORA</TableHead>
            <TableHead>ESTATUS</TableHead>
            <TableHead>NOTA</TableHead>
            <TableHead>MODIFICADO</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} className="dark:bg-slate-800 dark:text-white">
              {isEditing && (
                <TableCell>
                  <div className="flex space-x-3 pl-2">

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
                      onClick={() => console.log("Eliminar:", row.id)}
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
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span>
                    {format(new Date(row.horaYFecha), "dd 'de' MMMM 'de' yyyy, hh:mm a", { locale: es })}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {formatDistanceToNow(new Date(row.horaYFecha), { addSuffix: true, locale: es })}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className={`px-3 py-2 rounded-full text-white ${statusColors[row.estatus]}`}>
                  {row.estatus}
                </span>
              </TableCell>
              <TableCell className="max-w-[200px]">{row.nota}</TableCell>
              <TableCell className="pr-4 justify-center ">
                <span className="whitespace-break-spaces">Atención a Delegados</span>
                <br />
                <span className="text-xs text-gray-400">12 Nov 2022</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


      {/* Modal de edición */}
      {editingRow && (
        <EditModal
          editingRow={editingRow}
          onSave={handleSaveEdit}
          onClose={handleCloseEditModal}
        />
        // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        //   <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-11/12 md:w-1/2 lg:w-3/4 shadow-lg">
        //     <h2 className="text-2xl font-bold mb-4 dark:text-white text-gray-800">Editar Solicitud</h2>
        //     <form onSubmit={handleSaveEdit}>
        //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        //         {/* Nombre */}
        //         <div>
        //           <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        //             Nombre <span className="text-red-500">*</span>
        //           </label>
        //           <input
        //             type="text"
        //             name="nombre"
        //             className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
        //             placeholder="Nombre"
        //             value={editingRow.nombre}
        //             onChange={(e) =>
        //               setEditingRow({ ...editingRow, nombre: e.target.value })
        //             }
        //             required
        //           />
        //         </div>

        //         {/* CURP */}
        //         <div>
        //           <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        //             CURP <span className="text-red-500">*</span>
        //           </label>
        //           <input
        //             type="text"
        //             name="curp"
        //             className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
        //             placeholder="CURP"
        //             value={editingRow.curp}
        //             onChange={(e) =>
        //               setEditingRow({ ...editingRow, curp: e.target.value })
        //             }
        //             required
        //           />
        //         </div>

        //         {/* Domicilio */}
        //         <div>
        //           <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        //             Domicilio <span className="text-red-500">*</span>
        //           </label>
        //           <input
        //             type="text"
        //             name="domicilio"
        //             className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
        //             placeholder="Domicilio"
        //             value={editingRow.domicilio}
        //             onChange={(e) =>
        //               setEditingRow({ ...editingRow, domicilio: e.target.value })
        //             }
        //             required
        //           />
        //         </div>

        //         {/* Teléfono */}
        //         <div>
        //           <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        //             Teléfono <span className="text-red-500">*</span>
        //           </label>
        //           <input
        //             type="text"
        //             name="telefono"
        //             className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
        //             placeholder="Teléfono"
        //             value={editingRow.telefono}
        //             onChange={(e) =>
        //               setEditingRow({ ...editingRow, telefono: e.target.value })
        //             }
        //             required
        //           />
        //         </div>

        //         {/* Solicitud */}
        //         <div>
        //           <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        //             Solicitud <span className="text-red-500">*</span>
        //           </label>
        //           <textarea
        //             rows={1}
        //             name="solicitud"
        //             className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
        //             placeholder="Detalles de la solicitud"
        //             value={editingRow.solicitud}
        //             onChange={(e) =>
        //               setEditingRow({ ...editingRow, solicitud: e.target.value })
        //             }
        //             required
        //           ></textarea>
        //         </div>

        //         {/* Tipo de Apoyo */}
        //         <div>
        //           <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        //             Tipo de Apoyo <span className="text-red-500">*</span>
        //           </label>
        //           <select
        //             name="apoyo"
        //             className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
        //             value={editingRow.apoyo}
        //             onChange={(e) =>
        //               setEditingRow({ ...editingRow, apoyo: e.target.value })
        //             }
        //             required
        //           >
        //             <option value="Despensas">Despensas</option>
        //             <option value="Funerarios">Funerarios</option>
        //             <option value="Concentradores">Concentradores</option>
        //             <option value="Medicamento">Medicamento</option>
        //             <option value="Vales de Gasolina">Vales de Gasolina</option>
        //           </select>
        //         </div>

        //         {/* Fecha */}
        //         <div>
        //           <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        //             Fecha y Hora <span className="text-red-500">*</span>
        //           </label>
        //           <input
        //             type="datetime-local"
        //             name="horaYFecha"
        //             className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
        //             value={editingRow.horaYFecha}
        //             onChange={(e) =>
        //               setEditingRow({ ...editingRow, horaYFecha: e.target.value })
        //             }
        //             required
        //           />
        //         </div>

        //         {/* Estatus */}
        //         <div>
        //           <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        //             Estatus <span className="text-red-500">*</span>
        //           </label>
        //           <select
        //             name="estatus"
        //             className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
        //             value={editingRow.estatus}
        //             onChange={(e) =>
        //               setEditingRow({ ...editingRow, estatus: e.target.value })
        //             }
        //             required
        //           >
        //             <option value="Recibido">Recibido</option>
        //             <option value="Pendiente">Pendiente</option>
        //             <option value="Cancelado">Cancelado</option>
        //             <option value="Concluido">Concluido</option>
        //           </select>
        //         </div>

        //         {/* Nota */}
        //         <div className="md:col-span-2">
        //           <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Nota</label>
        //           <textarea
        //             name="nota"
        //             className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
        //             placeholder="Notas adicionales"
        //             value={editingRow.nota}
        //             onChange={(e) =>
        //               setEditingRow({ ...editingRow, nota: e.target.value })
        //             }
        //           ></textarea>
        //         </div>
        //       </div>

        //       {/* Botones */}
        //       <div className="flex justify-end space-x-2 mt-4">
        //         <button
        //           type="button"
        //           className="bg-white hover:bg-gray-200 border border-gray-400 text-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 font-semibold py-2 px-4 rounded-full"
        //           onClick={handleCloseEditModal}
        //         >
        //           Cancelar
        //         </button>
        //         <button
        //           type="submit"
        //           className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
        //         >
        //           Guardar Cambios
        //         </button>
        //       </div>
        //     </form>
        //   </div>
        // </div>
      )}
    </>
  );
}