

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export type Status = "Recibido" | "Pendiente" | "Cancelado" | "Concluido";

export interface UserData {
  id: number;
  curp: string;
  nombre: string;
  domicilio: string;
  telefono: string | null;
  solicitud: string | null;
  apoyo: string | null;
  fecha: string | null;
  estatus: Status;
  nota: string | null;
}

export const statusColors: Record<Status, string> = {
  Recibido: "bg-green-500",
  Pendiente: "bg-yellow-500",
  Cancelado: "bg-red-500",
  Concluido: "bg-blue-500",
};

export const mockData = async (): Promise<UserData[]> => {
  const response = await fetch("/api/solicitudes");
  if (!response.ok) {
    throw new Error("Error al obtener datos");
  }
  return response.json();
};

// export const getStatusCounts = async (): Promise<Record<Status, number>> => {
//   const data = await mockData();
//   return data.reduce((acc, item) => {
//     acc[item.estatus] = (acc[item.estatus] || 0) + 1;
//     return acc;
//   }, {} as Record<Status, number>);
// };

export const getStatusCounts = (data: UserData[]) => {
  return data.reduce((acc, item) => {
    acc[item.estatus] = (acc[item.estatus] || 0) + 1;
    return acc;
  }, {} as Record<Status, number>);
};
