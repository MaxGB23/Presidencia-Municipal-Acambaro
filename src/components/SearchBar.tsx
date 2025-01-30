import React from "react";

// Definimos las props del componente con TypeScript
interface SearchComponentProps {
    modelValue: string; // Valor del input
    onChange: (value: string) => void; // Función para manejar cambios en el input
}

const SearchComponent: React.FC<SearchComponentProps> = ({ modelValue, onChange }) => {
    // Función para manejar cambios en el input
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value); // Llamar a la función onChange con el nuevo valor
    };

    return (
        <form className="w-full">
            <label htmlFor="default-search" className="text-sm font-medium text-gray-900 sr-only dark:text-white">
                Buscar
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                    placeholder="Buscar"
                    required
                />
            </div>
        </form>
    );
};

export default SearchComponent;