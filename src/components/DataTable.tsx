'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { type UserData, statusColors } from "@/utils/data"
import { Send } from 'lucide-react'

interface DataTableProps {
  data: UserData[]
}

const handleSend = () => {
  alert("Nota enviada");
  // Aquí puedes agregar la lógica para enviar la nota
};


export function DataTable({ data }: DataTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="dark:bg-gray-800 dark:text-gray-300">
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
          <TableRow key={row.id} className="dark:bg-gray-700 dark:text-white">
            <TableCell>{row.curp}</TableCell>
            <TableCell>{row.nombre}</TableCell>
            <TableCell>{row.domicilio}</TableCell>
            <TableCell>{row.telefono}</TableCell>
            <TableCell>{row.solicitud}</TableCell>
            <TableCell>{row.horaYFecha}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-white ${statusColors[row.estatus]}`}>{row.estatus}</span>
            </TableCell>
            <TableCell>
              <div className="relative flex items-center">
                <input
                  type="text"
                  className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 pr-10 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500"
                  placeholder="Ingrese una nota"
                />
                <button
                  aria-label="Enviar nota"
                  onClick={handleSend}
                  className="absolute right-2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600"
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
