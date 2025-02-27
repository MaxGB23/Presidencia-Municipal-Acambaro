import { Asterisk } from 'lucide-react';
import { createSolicitud } from '@/actions/actions';
import { useSession } from 'next-auth/react'; // Importar useSession

interface ModalAgregarSolicitudProps {
  isModalOpen: boolean;
  closeModal: () => void;
  onAdd: () => void;
}

const ModalAgregarSolicitud: React.FC<ModalAgregarSolicitudProps> = ({ isModalOpen, closeModal, onAdd }) => {
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fecha = formData.get("fecha") as string;
    if (fecha) {
      const date = new Date(fecha);
      // Extraer componentes en la zona horaria local
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Meses van de 0-11
      const day = date.getDate().toString().padStart(2, "0");
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      // Crear una cadena en formato `YYYY-MM-DDTHH:mm`
      const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
      formData.set("fecha", formattedDate);
    }

    await createSolicitud(formData, session?.user.id);
    closeModal();
    onAdd();
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-11/12 lg:w-3/4 shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 dark:text-white text-gray-800 ml-1">Agregar Solicitud</h2>
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
                required
              ></textarea>
            </div>

            {/* Tipo de Apoyo */}
            <div>
              <label className="flex ml-2 text-base font-medium mb-2 text-gray-700 dark:text-gray-300">
                Tipo de Apoyo <Asterisk className="text-red-500 size-[11px] mt-1" />
              </label>
              <select
                name="apoyo"
                className="w-full p-5 border border-gray-300 dark:border-gray-700 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
                required
              >
                <option value="Despensas">Despensas</option>
                <option value="Funerarios">Funerarios</option>
                <option value="Concentradores">Concentradores</option>
                <option value="Medicamento">Medicamento</option>
                <option value="Vales de Gasolina">Vales de Gasolina</option>
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
                required
              />
            </div>

            {/* Estatus */}
            <div>
              <label className="flex ml-2 text-base font-medium mb-2 text-gray-700 dark:text-gray-300">
                Estatus <Asterisk className="text-red-500 size-[11px] mt-1" />
              </label>
              <select
                name="estatus"
                className="w-full p-5 border border-gray-300 dark:border-gray-700 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
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
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              className="bg-white hover:bg-gray-100 border border-gray-400 text-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 font-semibold py-2 px-4 rounded-full"
              onClick={closeModal}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAgregarSolicitud;
