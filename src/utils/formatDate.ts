import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz'; 

export const formatDate = (
  isoDate: Date | null,
  includeTime = true
): string | null => {
  if (!isoDate) return null;

  const date = new Date(isoDate);

  const zonedDate = toZonedTime(date, "UTC");

  const day = format(zonedDate, "dd");
  const month = format(zonedDate, "MMM"); 
  const year = format(zonedDate, "yyyy");
  const time = format(zonedDate, "HH:mm"); 

  return includeTime
    ? `${day} ${month} ${year} ${time}`
    : `${day} ${month} ${year}`;
};