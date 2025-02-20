export type Status = 'Recibido' | 'Pendiente' | 'Cancelado' | 'Concluido';

export interface UserData2 {
  id: string;
  curp: string;
  nombre: string;
  domicilio: string;
  telefono: string;
  solicitud: string;
  apoyo: string;
  horaYFecha: string;
  estatus: Status;
  nota: string;
}

export const statusColors: Record<Status, string> = {
  Recibido: 'bg-green-500',
  Pendiente: 'bg-yellow-500',
  Cancelado: 'bg-red-500',
  Concluido: 'bg-blue-500',
};

export const mockData2: UserData2[] = [
  {
    id: '1',
    curp: 'MELM8305281HDFNNS09',
    nombre: 'Pedro Murillo',
    domicilio: 'Calle 123, Ciudad de México',
    telefono: '55-34-82-22-95',
    solicitud: 'Apoyo para despensas',
    apoyo: 'Despensas',
    horaYFecha: '2024-12-15 10:30',
    estatus: 'Concluido',
    nota: 'Apoyo en un lapso menor a 6 meses',
  },
  {
    id: '2',
    curp: 'GORS7609142MDFNNT01',
    nombre: 'María González',
    domicilio: 'Av. Principal 456, Guadalajara',
    telefono: '333-5678',
    solicitud: 'Apoyo para funerarios',
    apoyo: 'Funerarios',
    horaYFecha: '2024-04-16 14:45',
    estatus: 'Recibido',
    nota: 'Falta comprobante de domicilio',
  },
  {
    id: '3',
    curp: 'LOAM9112073HDFNNS03',
    nombre: 'Carlos López',
    domicilio: 'Calle Central 789, Monterrey',
    telefono: '818-9012',
    solicitud: 'Apoyo para concentradores',
    apoyo: 'Concentradores',
    horaYFecha: '2025-02-15 01:15',
    estatus: 'Cancelado',
    nota: 'Solicitante no se presentó',
  },
  {
    id: '4',
    curp: 'SARL8207314MDFNNT05',
    nombre: 'Ana Sánchez',
    domicilio: 'Av. Reforma 321, Puebla',
    telefono: '222-3456',
    solicitud: 'Apoyo para medicamentos',
    apoyo: 'Medicamento',
    horaYFecha: '2024-09-18 11:00',
    estatus: 'Concluido',
    nota: 'Pasaporte entregado',
  },
    {
    id: '5',
    curp: 'MELM8305281HDFNNS09',
    nombre: 'Juan Pérez',
    domicilio: 'Calle 123, Ciudad de México',
    telefono: '555-1234',
    solicitud: 'Apoyo para vales de gasolina',
    apoyo: 'Vales de Gasolina',
    horaYFecha: '2024-07-15 10:30',
    estatus: 'Recibido',
    nota: 'Documentos completos',
  },
  {
    id: '6',
    curp: 'GORS7609142MDFNNT01',
    nombre: 'María González',
    domicilio: 'Av. Principal 456, Guadalajara',
    telefono: '333-5678',
    solicitud: 'Cambio de domicilio',
    apoyo: 'Despensas',
    horaYFecha: '2024-02-16 14:45',
    estatus: 'Cancelado',
    nota: 'Falta comprobante de domicilio',
  },
  {
    id: '7',
    curp: 'LOAM9112073HDFNNS03',
    nombre: 'Carlos López',
    domicilio: 'Calle Central 789, Monterrey',
    telefono: '818-9012',
    solicitud: 'Baja de vehículo',
    apoyo: 'Despensas',
    horaYFecha: '2023-12-17 09:15',
    estatus: 'Cancelado',
    nota: 'Solicitante no se presentó',
  },
  {
    id: '8',
    curp: 'SARL8207314MDFNNT05',
    nombre: 'Ana Sánchez',
    domicilio: 'Av. Reforma 321, Puebla',
    telefono: '222-3456',
    solicitud: 'Trámite de pasaporte',
    apoyo: 'Despensas',
    horaYFecha: '2024-11-18 11:00',
    estatus: 'Pendiente',
    nota: 'Pasaporte entregado',
  },
      {
    id: '9',
    curp: 'MELM8305281HDFNNS09',
    nombre: 'Juan Pérez',
    domicilio: 'Calle 123, Ciudad de México',
    telefono: '555-1234',
    solicitud: 'Renovación de licencia',
    apoyo: 'Despensas',
    horaYFecha: '2024-07-15 10:30',
    estatus: 'Recibido',
    nota: 'Documentos completos',
  },
  {
    id: '10',
    curp: 'GORS7609142MDFNNT01',
    nombre: 'María González',
    domicilio: 'Av. Principal 456, Guadalajara',
    telefono: '333-5678',
    solicitud: 'Cambio de domicilio',
    apoyo: 'Despensas',
    horaYFecha: '2024-02-16 14:45',
    estatus: 'Cancelado',
    nota: 'Falta comprobante de domicilio',
  },
  {
    id: '11',
    curp: 'LOAM9112073HDFNNS03',
    nombre: 'Carlos López',
    domicilio: 'Calle Central 789, Monterrey',
    telefono: '818-9012',
    solicitud: 'Baja de vehículo',
    apoyo: 'Despensas',
    horaYFecha: '2023-12-17 09:15',
    estatus: 'Cancelado',
    nota: 'Solicitante no se presentó',
  },
  {
    id: '12',
    curp: 'SARL8207314MDFNNT05',
    nombre: 'Ana Sánchez',
    domicilio: 'Av. Reforma 321, Puebla',
    telefono: '222-3456',
    solicitud: 'Trámite de pasaporte',
    apoyo: 'Despensas',
    horaYFecha: '2024-11-18 11:00',
    estatus: 'Pendiente',
    nota: 'Pasaporte entregado',
  },
];

export const getStatusCounts = (data: UserData2[]) => {
  return data.reduce((acc, item) => {
    acc[item.estatus] = (acc[item.estatus] || 0) + 1;
    return acc;
  }, {} as Record<Status, number>);
};
