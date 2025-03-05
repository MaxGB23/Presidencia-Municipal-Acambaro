import { X, Search } from "lucide-react";
import React, { useEffect, useRef } from "react";

interface SearchComponentProps {
  modelValue: string;
  onChange: (value: string) => void;
  handleSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ modelValue, onChange, handleSearchSubmit }) => {
  const formRef = useRef<HTMLFormElement>(null); // Referencia al formulario

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value); // Actualizar el estado local
  };

  const handleClearInput = () => {
    onChange(""); // Limpiar el input
  };

  // Efecto para enviar el formulario cuando searchValue esté vacío
  useEffect(() => {
    if (modelValue === "" && formRef.current) {
      formRef.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    }
  }, [modelValue]); // Se ejecuta cuando modelValue cambia

  return (
    <form ref={formRef} onSubmit={handleSearchSubmit} className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          {/* <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" /> */}
          <svg
            className="w-[15px] h-[15px] text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          value={modelValue}
          onChange={handleInputChange}
          type="text"
          id="search"
          autoComplete="off"
          className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-400 rounded-lg bg-gray-50  dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Buscar"
        />
        {modelValue && (
          <div
            className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
            onClick={handleClearInput}
          >
            <X className="w-4 h-4 text-red-500 dark:text-gray-400" />
          </div>
        )}
      </div>
    </form>
  );
};

export default SearchComponent;


