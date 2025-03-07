import { updateSolicitud } from '@/actions/actions';
import { Asterisk } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

// export type Status = "Recibido" | "Pendiente" | "Cancelado" | "Concluido";

interface Solicitud {
  id: number;
  curp: string;
  nombre: string;
  domicilio: string;
  telefono: string | null;
  solicitud: string | null;
  apoyo_id: string | null;
  fecha: string | null;
  estatus_id: string;
  nota: string | null;
  updatedBy: { id: number; name: string | null; departamento_id: string | null } | null;
  updatedAt: string | null;
}

interface EditModalProps {
  editingRow: Solicitud;
  onClose: () => void;
  onSave: (updatedRow: Solicitud) => void;
}

export const EditModal: React.FC<EditModalProps> = ({ editingRow, onClose, onSave }) => {
  const [formData, setFormData] = useState<Solicitud>({
    ...editingRow,
    fecha: editingRow.fecha
      ? new Date(new Date(editingRow.fecha).getTime() - new Date(editingRow.fecha).getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16)
      : "",
  });

  const { data: session } = useSession();
  // console.log("Valores", formData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Mantiene el formato `YYYY-MM-DDTHH:mm` en el input
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData(e.currentTarget as HTMLFormElement);

    if (formData.fecha) {
      const date = new Date(formData.fecha);
      // Extraer componentes manualmente en la zona horaria local
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      // Construir la fecha en formato ISO sin cambiar la zona horaria
      const fechaISO = `${year}-${month}-${day}T${hours}:${minutes}`;
      formDataToSend.set("fecha", fechaISO);
    }
    if (!session?.user.id) {
      console.error("No se pudo obtener el ID del usuario.");
      return;
    }

    await updateSolicitud(formDataToSend, session.user.id, editingRow.id.toString());
    onSave({ ...editingRow, ...Object.fromEntries(formDataToSend) }); // Actualiza estado en MainPage
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-11/12 lg:w-3/4 shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 dark:text-white text-gray-800 ml-1">Editar Solicitud</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Campos del formulario */}
            <div>
              <label className="flex ml-2 text-base font-medium mb-2 text-gray-700 dark:text-gray-300">
                Nombre <Asterisk className="text-red-500 size-[11px] mt-1" />
              </label>
              <input
                type="text"
                name="nombre"
                className="w-full p-4 border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none rounded-xl"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                required
              />
            </div>

            {/* CURP */}
            <div>
              <label className="flex ml-2 text-base font-medium mb-2 text-gray-700 dark:text-gray-300">
                CURP <Asterisk className="text-red-500 size-[11px] mt-1" />
              </label>
              <input
                type="text"
                name="curp"
                className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="CURP"
                value={formData.curp}
                onChange={handleChange}
                required
              />
            </div>

            {/* Domicilio */}
            <div>
              <label className="flex ml-2 text-base font-medium mb-2 text-gray-700 dark:text-gray-300">
                Domicilio <Asterisk className="text-red-500 size-[11px] mt-1" />
              </label>
              <input
                type="text"
                name="domicilio"
                className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Domicilio"
                value={formData.domicilio}
                onChange={handleChange}
                required
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="flex ml-2 text-base font-medium mb-2 text-gray-700 dark:text-gray-300">
                Teléfono <Asterisk className="text-red-500 size-[11px] mt-1" />
              </label>
              <input
                type="text"
                name="telefono"
                className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Teléfono" 
                value={formData.telefono || ""}
                onChange={handleChange}
                required
              />
            </div>

            {/* Solicitud */}
            <div>
              <label className="flex ml-2 text-base font-medium mb-2 text-gray-700 dark:text-gray-300">
                Solicitud <Asterisk className="text-red-500 size-[11px] mt-1" />
              </label>
              <textarea
                rows={1}
                name="solicitud"
                className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Detalles de la solicitud"
                value={formData.solicitud || ""}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Tipo de Apoyo */}
            <div>
              <label className="flex ml-2 text-base font-medium mb-2 text-gray-700 dark:text-gray-300">
                Tipo de Apoyo <Asterisk className="text-red-500 size-[11px] mt-1" />
              </label>
              <select
                name="apoyo_id"
                className="w-full p-5 border border-gray-300 dark:border-gray-700 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
                value={formData.apoyo_id || ""}
                onChange={handleChange}
                required
              >
                <option value="Despensas">Despensas</option>
                <option value="Funerarios">Funerarios</option>
                <option value="Concentradores">Concentradores</option>
                <option value="Medicamento">Medicamento</option>
                <option value="Vales de Gasolina">Vales de Gasolina</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            {/* Fecha */}
            <div>
              <label className="flex ml-2 text-base font-medium mb-2 text-gray-700 dark:text-gray-300">
                Fecha y Hora <Asterisk className="text-red-500 size-[11px] mt-1" />
              </label>
              <input
                type="datetime-local"
                name="fecha"
                className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
                value={formData.fecha || ""}
                onChange={handleChange}
                required
              />
            </div>

            {/* Estatus */}
            <div>
              <label className="flex ml-2 text-base font-medium mb-2 text-gray-700 dark:text-gray-300">
                Estatus <Asterisk className="text-red-500 size-[11px] mt-1" />
              </label>
              <select
                name="estatus_id"
                className="w-full p-5 border border-gray-300 dark:border-gray-700 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
                value={formData.estatus_id || ""}
                onChange={handleChange}
                required
              >
                <option value="Recibido">Recibido</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Cancelado">Cancelado</option>
                <option value="Concluido">Concluido</option>
              </select>
            </div>

            {/* Nota */}
            <div className="md:col-span-2">
              <label className="ml-2 block text-base font-medium mb-2 text-gray-700 dark:text-gray-300">Nota</label>
              <textarea
                name="nota"
                className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Notas adicionales"
                value={formData.nota || ""}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              className="bg-white hover:bg-gray-100 border border-gray-400 text-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 font-semibold py-2 px-4 rounded-full"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
