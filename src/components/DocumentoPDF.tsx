'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { FilePen } from "lucide-react";
import Link from "next/link";
import Footer from '@/components/Footer';
import PDF from "@/components/PDF";

interface Data {
  id: number;
  presidente: string | null;
  sexo_presidente: string | null;
  atencion_ciudadana: string | null;
  sexo_atencion_ciudadana: string | null; 
  hay_jefe: boolean | null;
  img: string | undefined;
}

interface Props {
  data: Data; 
  currentPage: number;
  limit: number;
}

export default function DocumentoPDF({ data, currentPage, limit }: Props) {
  const router = useRouter();
  const [vistaPrevia, setVistaPrevia] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

    const [searchValue, setSearchValue] = useState('');
    const searchParams = useSearchParams();
  
    const handleSearchChange = (value: string) => {
      setSearchValue(value);
    };
  
    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()    
      const params = new URLSearchParams(searchParams.toString());
      if (searchValue) {
        params.set("search", searchValue);
      } else {
        params.delete("search");
      }
      params.set("page", "1");
  
      router.replace(`?${params.toString()}`);
    };
  

  const dataExample = {
    id: 1,
    nombre: "Nombre de Ejemplo",
    domicilio: "Domicilio de Ejemplo", 
    solicitud: "Apoyo de Ejemplo",
    telefono: "555-555-5555",
  } 

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar isOpen={isOpen} />
      <div className="flex-1 overflow-auto">
        <Navbar toggleSidebar={toggleSidebar} isOpen={isOpen} searchValue={searchValue} 
          handleSearchChange={handleSearchChange} handleSearchSubmit={handleSearchSubmit} />
        <div className="p-8">
          <Card className="bg-white dark:bg-gray-800">
            <div className="p-7 pb-5 flex justify-between align-items-center">
              <div className="flex space-x-4 items-center">
                <CardTitle className="text-base lg:text-3xl">Formato PDF</CardTitle>
                <FilePen className="size-8 hidden lg:block" />
                <button onClick={() => setVistaPrevia(!vistaPrevia)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm lg:text-lg">Vista Previa</button>
              </div>
            </div>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-gray-200 bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-700 ">
                    <TableHead className='text-center'>PRESIDENTE</TableHead>
                    <TableHead className='text-center'>ATENCIÓN CIUDADANA</TableHead>
                    <TableHead className='text-center'>MOSTRAR ATENCIÓN CIUDADANA</TableHead>
                    <TableHead className='text-center'>IMAGEN</TableHead>
                    <TableHead className='text-center'>MODIFICAR</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="dark:bg-slate-800 dark:text-white h-40">
                    <TableCell >
                      <div className='flex flex-col pl-6 text-center space-y-2'>
                        <span>{data.presidente}  </span>
                        <span>SEXO: {data.sexo_presidente}</span>
                      </div>                      
                      </TableCell>
                    <TableCell>
                      <div className='flex flex-col pl-6 text-center space-y-2'>    
                        <span>{data.atencion_ciudadana}</span> 
                        <span>SEXO: {data.sexo_atencion_ciudadana}</span>                 
                      </div>                      
                    </TableCell>
                    {/* <TableCell >{data.sexo_atencion_ciudadana}</TableCell> */}
                    <TableCell className='text-center'>{data.hay_jefe ? "SI" : "NO"}</TableCell>
                    <TableCell className='text-center'>
                      <img src={data.img} alt="Imagen" className="size-28 rounded-2xl" />
                    </TableCell>
                    <TableCell>
                      <div className="flex align-items-center justify-center">
                        <Link href={`/usuarios/view/${data.id}`}
                          className="flex items-center gap-1 text-blue-500 hover:text-blue-300 dark:text-blue-300 dark:hover:text-blue-200 text-lg"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="size-7 pb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 11.5V19a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h7.5" />
                            <path d="M17 2.5a2.121 2.121 0 013 3l-9 9L7 15l.5-3.5 9-9z" />
                          </svg>
                          Editar
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          {vistaPrevia && (
          <Card className="bg-white dark:bg-gray-800 mt-4">
            <CardContent>
              <CardTitle className='text-center text-2xl w-full py-5'>Vista Previa</CardTitle>
              <PDF
                nombre={dataExample.nombre}
                domicilio={dataExample.domicilio}
                solicitud={dataExample.solicitud}
                telefono={dataExample.telefono}
                id={`pdf-${dataExample.id}`}
              />
            </CardContent>
          </Card>) }
          
          
          <Footer />
        </div>
      </div>
    </div>
  );
}