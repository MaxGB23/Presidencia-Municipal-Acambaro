'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { type UserData, statusColors } from "@/utils/data"
import { Send, Pencil, Trash } from 'lucide-react'
import { formatDistanceToNow, format } from "date-fns"
import { es } from "date-fns/locale"
import { useState, useEffect } from "react"

interface DataTableProps {
  data: UserData[]
  isEditing: boolean
}

export function DataTable({ data, isEditing }: DataTableProps) {
  const [notes, setNotes] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const initialNotes = data.reduce((acc, row) => {
      acc[row.id] = row.nota;
      return acc;
    }, {} as { [key: string]: string });
    setNotes(initialNotes);
  }, [data]);

  const handleNoteChange = (id: string, value: string) => {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [id]: value,
    }));
  };

  const handleSend = async (id: string) => {
    const note = notes[id] || "";

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, note }),
      });

      if (response.ok) {
        alert("Nota actualizada correctamente");
      } else {
        alert("Error al actualizar la nota");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-gray-200 bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-700">
          {isEditing && <TableHead>EDICIÓN</TableHead>}
          <TableHead>CURP</TableHead>
          <TableHead>NOMBRE</TableHead>
          <TableHead>DOMICILIO</TableHead>
          <TableHead>TELÉFONO</TableHead>
          <TableHead>SOLICITUD</TableHead>
          <TableHead>HORA Y FECHA</TableHead>
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
                  <button onClick={() => console.log("Editar:", row.id)}
                    className="flex items-center gap-1 text-blue-500 hover:text-blue-300 dark:text-blue-300 dark:hover:text-blue-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2">
                      <path d="M21 11.5V19a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h7.5" />
                      <path d="M17 2.5a2.121 2.121 0 013 3l-9 9L7 15l.5-3.5 9-9z" />
                    </svg>
                  </button>

                  <button onClick={() => console.log("Eliminar:", row.id)}
                    className="flex items-center gap-1 text-red-500 hover:text-red-300 dark:text-red-400 dark:hover:text-red-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" strokeWidth="2">
                      <path d="M9 3h6a1 1 0 011 1v2H8V4a1 1 0 011-1z" />
                      <path d="M4 7h16m-1 0v11a2 2 0 01-2 2H7a2 2 0 01-2-2V7h14z" />
                      <path d="M10 11v6m4-6v6" />
                    </svg>
                  </button>
                  {/* <button onClick={() => console.log("Editar:", row.id)}>
                    <Pencil className="w-4 h-4 text-blue-500 hover:text-blue-700" fill="currentColor" />
                  </button>
                  <button onClick={() => console.log("Eliminar:", row.id)}>
                    <Trash className="w-4 h-4 text-red-500 hover:text-red-700" fill="currentColor" />
                  </button> */}
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
              <span className="whitespace-break-spaces">Maximiliano</span>
              <br />
              <span className="text-xs text-gray-400">12 Nov 2022</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
{/* <div className="relative flex items-center">
                <input
                  type="text"
                  className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 pr-10 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500"
                  placeholder="Ingrese una nota"
                  value={notes[row.id] || ""} // Muestra la nota del estado
                  onChange={(e) => handleNoteChange(row.id, e.target.value)} // Maneja el cambio
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // Previene el comportamiento predeterminado
                      if (notes[row.id]?.trim() === "") {
                        alert("El campo de nota es obligatorio."); // Mensaje personalizado
                      } else {
                        handleSend(row.id); // Llama a la función al presionar Enter
                      }
                    }
                  }}
                  required // Validación nativa del navegador
                />
                <button
                  aria-label="Enviar nota"
                  className="absolute right-2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600"
                  onClick={() => {
                    if (notes[row.id]?.trim() === "") {
                      alert("El campo de nota es obligatorio."); // Mensaje personalizado
                    } else {
                      handleSend(row.id); // Envía la nota específica de esta fila
                    }
                  }}
                >
                  <Send />
                </button>
              </div> */}