// export const formatDate = (isoDate: Date | null, includeTime = true): string | null => {
//   if (!isoDate) return null;

//   const date = new Date(isoDate);
//   date.setHours(date.getHours() + 6);

//   const day = date.getDate().toString().padStart(2, "0");
//   const month = date.toLocaleString("default", { month: "short" });
//   const year = date.getFullYear();
//   const time = date.toTimeString().slice(0, 5); // Hrs:Min

//   return includeTime
//     ? `${day} ${month} ${year} ${time}`
//     : `${day} ${month} ${year}`;
// };

import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz'; // Si usas date-fns-tz para manejar zonas horarias

export const formatDate = (
  isoDate: Date | null,
  includeTime = true
): string | null => {
  if (!isoDate) return null;

  // Convertir la fecha ISO a un objeto Date (asegúrate que la fecha esté en UTC)
  const date = new Date(isoDate);

  // Convertir a zona horaria local si lo necesitas
  // Si tu zona horaria local es 'America/Mexico_City', puedes usarla aquí
  const zonedDate = toZonedTime(date, "America/Mexico_City");

  // Formateo de la fecha
  const day = format(zonedDate, "dd");
  const month = format(zonedDate, "MMM"); // Usar abreviatura del mes
  const year = format(zonedDate, "yyyy");
  const time = format(zonedDate, "HH:mm"); // Formato de hora

  return includeTime
    ? `${day} ${month} ${year} ${time}`
    : `${day} ${month} ${year}`;
};