import { UserData } from '@/utils/data';
import React, { useState, useEffect } from 'react';

interface ModalSolicitudProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserData) => void;
  initialData?: UserData | null; // Datos iniciales para editar
}

const ModalSolicitud: React.FC<ModalSolicitudProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState<UserData>({
    nombre: '',
    curp: '',
    domicilio: '',
    telefono: '',
    solicitud: '',
    apoyo: '',
    horaYFecha: '',
    estatus: '',
    nota: '',
  });

  // Efecto para llenar el formulario con los datos iniciales (modo editar)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Si no hay datos iniciales, reinicia el formulario (modo agregar)
      setFormData({
        nombre: '',
        curp: '',
        domicilio: '',
        telefono: '',
        solicitud: '',
        apoyo: '',
        horaYFecha: '',
        estatus: '',
        nota: '',
      });
    }
  }, [initialData]);

  // Maneja cambios en los campos del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // Envía los datos al componente padre
    onClose(); // Cierra el modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-11/12 md:w-1/2 lg:w-3/4 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 dark:text-white text-gray-800">
          {initialData ? 'Editar Solicitud' : 'Agregar Solicitud'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nombre"
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            {/* CURP */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                CURP <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="curp"
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="CURP"
                value={formData.curp}
                onChange={handleChange}
                required
              />
            </div>

            {/* Domicilio */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Domicilio <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="domicilio"
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Domicilio"
                value={formData.domicilio}
                onChange={handleChange}
                required
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Teléfono <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="telefono"
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>

            {/* Solicitud */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Solicitud <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={1}
                name="solicitud"
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Detalles de la solicitud"
                value={formData.solicitud}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Tipo de Apoyo */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Tipo de Apoyo <span className="text-red-500">*</span>
              </label>
              <select
                name="apoyo"
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
                value={formData.apoyo}
                onChange={handleChange}
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
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Fecha y Hora <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                name="horaYFecha"
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
                value={formData.horaYFecha}
                onChange={handleChange}
                required
              />
            </div>

            {/* Estatus */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Estatus <span className="text-red-500">*</span>
              </label>
              <select
                name="estatus"
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
                value={formData.estatus}
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
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Nota</label>
              <textarea
                name="nota"
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Notas adicionales"
                value={formData.nota}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              className="bg-white hover:bg-gray-200 border border-gray-400 text-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 font-semibold py-2 px-4 rounded-full"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
            >
              {initialData ? 'Guardar Cambios' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalSolicitud;