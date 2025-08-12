"use client";

import { useQueryState, parseAsString } from "nuqs";
import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import React, { useEffect, useRef, useCallback } from "react";

const SearchBar: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({ history: "replace" })
  );
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ Función para actualizar URL y forzar re-renderizado
  const updateUrlAndRefresh = useCallback((newSearch: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newSearch.trim()) {
      params.set("search", newSearch);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    router.replace(`?${params.toString()}`);
    router.refresh(); // Forzar re-renderizado del server component
  }, [router, searchParams]);

  // ✅ Manejar cambio en input con debounce para vaciar
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearch(newValue);
    
    // Si se vacía el input, actualizar inmediatamente
    if (newValue === "" && search !== "") {
      updateUrlAndRefresh("");
    }
  };

  // ✅ Hacer búsqueda al presionar Enter
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUrlAndRefresh(search);
  };

  // ✅ Limpiar input
  const handleClearInput = () => {
    setSearch("");
    updateUrlAndRefresh("");
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSearchSubmit}
      className="w-full"
    >
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-[15px] h-[15px] text-gray-500 dark:text-gray-400"
            aria-hidden="true"
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
          value={search}
          onChange={handleInputChange}
          type="text"
          id="search"
          autoComplete="off"
          placeholder="Buscar"
          className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-400 rounded-lg bg-gray-50  dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
        {search && (
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

export default SearchBar;