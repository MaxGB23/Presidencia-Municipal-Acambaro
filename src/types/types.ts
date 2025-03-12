export interface SolicitudBase {
  id: number;
  curp: string;
  nombre: string;
  domicilio: string;
  telefono: string | null;
  solicitud: string | null;
  apoyo_id: string | null;
  fecha: Date | null;
  estatus_id: string;
  nota: string | null;
  updatedBy: number | null;
  updatedAt: Date;
  actualizador: {
    id: number;
    name: string | null;
    departamento_id: string | null;
  } | null;
}

export interface SolicitudFormateada {
  id: number;
  curp: string;
  nombre: string;
  domicilio: string;
  telefono: string | null;
  solicitud: string | null;
  apoyo_id: string | null;
  fecha: string | null;
  estatus_id: string;
  nota: string | null;
  updatedBy: {
    id: number;
    name: string | null;
    departamento_id: string | null;
  } | null;
  updatedAt: string | null;
}

export type Status = "Recibido" | "Pendiente" | "Cancelado" | "Concluido";

export const statusColors: Record<Status, string> = {
  Recibido: "bg-green-500",
  Pendiente: "bg-yellow-500",
  Cancelado: "bg-red-500",
  Concluido: "bg-blue-500",
};