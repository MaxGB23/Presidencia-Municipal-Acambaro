import React from "react";

interface FormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
  formData: any;
  setFormData: (data: any) => void;
  title: string;
}

const Form: React.FC<FormProps> = ({ isOpen, onClose, onSubmit, formData, setFormData, title }) => {
  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-11/12 md:w-1/2 lg:w-3/4 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 dark:text-white text-gray-800">{title}</h2>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/** Campos del formulario */}
            {["nombre", "curp", "domicilio", "telefono", "solicitud"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  {field.charAt(0).toUpperCase() + field.slice(1)} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name={field}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            {/** Select de apoyo */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Tipo de Apoyo *</label>
              <select name="apoyo" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none" value={formData.apoyo || ""} onChange={handleChange} required>
                <option value="despensas">Despensas</option>
                <option value="funerarios">Funerarios</option>
                <option value="concentradores">Concentradores</option>
                <option value="medicamento">Medicamento</option>
                <option value="vales_gasolina">Vales de Gasolina</option>
              </select>
            </div>

            {/** Fecha y estatus */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Fecha y Hora *</label>
              <input type="datetime-local" name="horaYFecha" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none" value={formData.horaYFecha || ""} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Estatus *</label>
              <select name="estatus" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none" value={formData.estatus || ""} onChange={handleChange} required>
                <option value="recibido">Recibido</option>
                <option value="pendiente">Pendiente</option>
                <option value="cancelado">Cancelado</option>
                <option value="concluido">Concluido</option>
              </select>
            </div>

            {/** Nota */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Nota</label>
              <textarea name="nota" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none" placeholder="Notas adicionales" value={formData.nota || ""} onChange={handleChange}></textarea>
            </div>
          </div>

          {/** Botones */}
          <div className="flex justify-end space-x-2 mt-4">
            <button type="button" className="bg-gray-50 hover:bg-gray-100 border text-gray-600 dark:bg-gray-700 dark:text-gray-200 font-semibold py-2 px-4 rounded-full" onClick={onClose}>Cancelar</button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;