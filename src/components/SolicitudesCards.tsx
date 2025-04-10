import React from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import { Users, ClipboardCheck, Hourglass, CircleX } from 'lucide-react';

interface SolicitudesCardsProps {
  totalSolicitudes: number;
  estatusCount: {
    Recibido: number;
    Pendiente: number;
    Cancelado: number;
    Concluido: number;
  };
}

const SolicitudesCards: React.FC<SolicitudesCardsProps> = ({
  totalSolicitudes,
  estatusCount,
}) => {
  return (
    <div className="grid grid-cols-2 gap-5 lg:col-span-2">
      {/* Card: Total de Solicitudes */}
      <Card className="flex justify-center items-center dark:bg-gray-800 dark:text-white p-2 col-span-2 space-x-2">
        <div className="flex items-center gap-2 p-4 pr-0 lg:p-0">
          <Users className="w-7 h-7 text-blue-700 dark:text-blue-400" />
          <CardTitle className="text-lg">Total de Solicitudes:</CardTitle>
        </div>
        <div className="flex items-center text-center">
          <p className="text-xl font-bold">{totalSolicitudes}</p>
        </div>
      </Card>

      {/* Card: Solicitudes Recibidas */}
      <Card className="dark:bg-gray-800 dark:text-white p-6 rounded-lg flex items-center justify-center flex-col space-y-4">
        <div className="flex flex-col items-center space-y-6">
          <ClipboardCheck className="w-8 h-8 text-green-500 dark:text-green-400" />
          <CardTitle className="text-lg font-semibold text-center">Solicitudes Recibidas</CardTitle>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold mb-1">{estatusCount.Recibido}</p>
          <p className="text-sm text-gray-400">
            ({((estatusCount.Recibido / totalSolicitudes) * 100).toFixed(2)}%)
          </p>
        </div>
      </Card>

      {/* Card: Solicitudes Pendientes */}
      <Card className="dark:bg-gray-800 dark:text-white p-6 rounded-lg flex items-center justify-center flex-col space-y-4">
        <div className="flex flex-col items-center space-y-6">
          <Hourglass className="w-8 h-8 text-yellow-500 dark:text-yellow-300" />
          <CardTitle className="text-lg font-semibold text-center">Solicitudes Pendientes</CardTitle>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold mb-1">{estatusCount.Pendiente}</p>
          <p className="text-sm text-gray-400">
            ({((estatusCount.Pendiente / totalSolicitudes) * 100).toFixed(2)}%)
          </p>
        </div>
      </Card>

      {/* Card: Solicitudes Canceladas */}
      <Card className="dark:bg-gray-800 dark:text-white p-6 rounded-lg flex items-center justify-center flex-col space-y-4">
        <div className="flex flex-col items-center space-y-6">
          <CircleX className="w-8 h-8 text-red-600 dark:text-red-400" />
          <CardTitle className="text-lg font-semibold text-center">Solicitudes Canceladas</CardTitle>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold mb-1">{estatusCount.Cancelado}</p>
          <p className="text-sm text-gray-400">
            ({((estatusCount.Cancelado / totalSolicitudes) * 100).toFixed(2)}%)
          </p>
        </div>
      </Card>

      {/* Card: Solicitudes Concluidas */}
      <Card className="dark:bg-gray-800 dark:text-white p-6 rounded-lg flex items-center justify-center flex-col space-y-4">
        <div className="flex flex-col items-center space-y-6">
          <ClipboardCheck className="w-8 h-8 text-blue-500 dark:text-sky-400" />
          <CardTitle className="text-lg font-semibold text-center">Solicitudes Concluidas</CardTitle>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold mb-1">{estatusCount.Concluido}</p>
          <p className="text-sm text-gray-400">
            ({((estatusCount.Concluido / totalSolicitudes) * 100).toFixed(2)}%)
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SolicitudesCards;