"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname(); // Detecta cambios en la ruta

  useEffect(() => {
    setIsVisible(false); // Reinicia la animación al cambiar de página
    const timeout = setTimeout(() => setIsVisible(true), 50); // Pequeño delay para la transición

    return () => clearTimeout(timeout); // Limpia el timeout al desmontar
  }, [pathname]); // Se ejecuta en cada cambio de página

  return (
    <div className={`transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
      {children}
    </div>
  );
}
