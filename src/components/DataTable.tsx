'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { type UserData, statusColors } from "@/utils/data"
import { Send } from 'lucide-react'
import { formatDistanceToNow, format } from "date-fns"
import { es } from "date-fns/locale"
import { useState, useEffect } from "react" // Importa useEffect para inicializar el estado

interface DataTableProps {
  data: UserData[]
}

export function DataTable({ data }: DataTableProps) {
  // Estado para manejar las notas de cada fila
  const [notes, setNotes] = useState<{ [key: string]: string }>({});

  // Inicializa el estado con las notas existentes al cargar el componente
  useEffect(() => {
    const initialNotes = data.reduce((acc, row) => {
      acc[row.id] = row.nota;
      return acc;
    }, {} as { [key: string]: string });
    setNotes(initialNotes);
  }, [data]);

  // Función para manejar el cambio en el campo de nota
  const handleNoteChange = (id: string, value: string) => {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [id]: value,
    }));
  };

  // Función para enviar la nota
  const handleSend = async (id: string) => {
    const note = notes[id] || "";

    // Aquí puedes hacer una llamada a la API para actualizar la nota en la base de datos
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
          <TableHead>CURP</TableHead>
          <TableHead>NOMBRE</TableHead>
          <TableHead>DOMICILIO</TableHead>
          <TableHead>TELÉFONO</TableHead>
          <TableHead>SOLICITUD</TableHead>
          <TableHead>HORA Y FECHA</TableHead>
          <TableHead>ESTATUS</TableHead>
          <TableHead>NOTA</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id} className="dark:bg-slate-800 dark:text-white">
            <TableCell>{row.curp}</TableCell>
            <TableCell>{row.nombre}</TableCell>
            <TableCell>{row.domicilio}</TableCell>
            <TableCell>{row.telefono}</TableCell>
            <TableCell>
              {row.solicitud}
              <br />
              <ul className="list-disc ml-4">
                <li>Viñeta</li>
              </ul>
            </TableCell>
            <TableCell>
              <div className="flex flex-col gap-1">
                {/* Fecha formateada */}
                <span className="">
                  {format(new Date(row.horaYFecha), "dd 'de' MMMM 'de' yyyy, hh:mm a", { locale: es })}
                </span>

                {/* Hace cuánto tiempo */}
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  {formatDistanceToNow(new Date(row.horaYFecha), { addSuffix: true, locale: es })}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-white ${statusColors[row.estatus]}`}>
                {row.estatus}
              </span>
            </TableCell>
            <TableCell>
              <div className="relative flex items-center">
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
              </div>
            </TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}