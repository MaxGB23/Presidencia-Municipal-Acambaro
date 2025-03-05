'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CirclePlus, UserRoundCheck } from "lucide-react";
import Link from "next/link";
import { deleteUser } from "@/actions/actions";
import { toast } from "@/hooks/use-toast";
import Footer from '@/components/Footer';

interface Usuario {
  id: number;
  name: string | null;
  lastname: string | null;
  email: string;
  departamento_id: string | null;
  permisos: string | null;
}

interface Props {
  users: Usuario[];
  totalUsers: number;
  currentPage: number;
  limit: number;
}

export default function UsuariosRegistrados({ users, totalUsers, currentPage, limit }: Props) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const totalPages = Math.ceil(totalUsers / limit);  

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', page.toString());
    newSearchParams.set('limit', limit.toString());
    router.replace(`${pathName}?${newSearchParams.toString()}`);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    // Actualizar la URL con el valor de búsqueda
    const params = new URLSearchParams(searchParams.toString());
    params.set('search', value);
    params.set('page', '1'); // Reiniciar la paginación al buscar
    router.replace(`?${params.toString()}`);
  };

  const handleDelete = async (id: number) => {
    // const id = parseInt(rowId, 10);
    const userConfirmed = confirm(`¿Estás seguro de eliminar el usuario ${id}`);

    if (userConfirmed) {
      await deleteUser(id);
      router.refresh();
      toast({
        title: "Usuario Eliminado",
        description: "El usuario ha sido eliminado con éxito",
        variant: "destructive",
      });
    }
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

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar isOpen={isOpen} />
      <div className="flex-1 overflow-auto">
        <Navbar toggleSidebar={toggleSidebar} isOpen={isOpen} searchValue={searchValue} handleSearchChange={handleSearchChange} handleSearchSubmit={handleSearchSubmit} />
        <div className="p-8 space-x-8">
          <Card className="bg-white dark:bg-gray-800">
            <div className="p-7 pb-5 flex justify-between align-items-center">
              <div className="flex space-x-4">
                <CardTitle className="text-base lg:text-3xl">Usuarios Registrados</CardTitle>
                <UserRoundCheck className="size-8 hidden lg:block" />
              </div>
              <Link href={"/auth/register"}
                className="flex align-items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm lg:text-lg">
                <CirclePlus className="lg:mr-2 lg:mt-[2px]" />
                <span className="hidden lg:block">Agregar Usuario</span>
              </Link>
            </div>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-gray-200 bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-700 ">
                    <TableHead className="pl-8">NOMBRE</TableHead>
                    <TableHead className="pl-8">APELLIDOS</TableHead>
                    <TableHead className="pl-8">CORREO</TableHead>
                    <TableHead className="">DEPARTAMENTO</TableHead>
                    <TableHead className="">PERMISOS</TableHead>
                    <TableHead className="text-center px-4">ACCIONES</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  { users.length === 0 && (
                    <TableRow className="dark:bg-gray-800 dark:text-white">
                      <TableCell className="p-7" colSpan={12}>No hay resultados.</TableCell>
                    </TableRow>
                  )}
                  {users.map((row) => (
                    <TableRow key={row.id} className="dark:bg-slate-800 dark:text-white">
                      <TableCell className="px-10 w-12">{row.name}</TableCell>
                      <TableCell className="px-10 w-12">{row.lastname}</TableCell>
                      <TableCell className="pl-8 pr-0 lg:max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {row.email}
                      </TableCell>
                      <TableCell className="w-30">{row.departamento_id}</TableCell>
                      <TableCell className="w-30">{row.permisos}</TableCell>
                      <TableCell className=''>
                        <div className="flex justify-center align-items-center space-x-8">
                          <Link href={`/usuarios/view/${row.id}`}
                            className="flex items-center gap-1 text-blue-500 hover:text-blue-300 dark:text-blue-300 dark:hover:text-blue-200"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 11.5V19a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h7.5" />
                              <path d="M17 2.5a2.121 2.121 0 013 3l-9 9L7 15l.5-3.5 9-9z" />
                            </svg>
                          </Link>

                          <button
                            onClick={() => handleDelete(row.id)}
                            className="flex items-center gap-1 text-red-600 hover:text-red-300 dark:text-red-400 dark:hover:text-red-200"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path d="M9 3h6a1 1 0 011 1v2H8V4a1 1 0 011-1z" />
                              <path d="M4 7h16m-1 0v11a2 2 0 01-2 2H7a2 2 0 01-2-2V7h14z" />
                              <path d="M10 11v6m4-6v6" />
                            </svg>
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-center align-items-center p-6 pb-0">
                <span className="text-gray-500 dark:text-gray-400 text-sm hidden lg:block w-full">
                  {
                  totalUsers === 0 ? (
                    'No hay resultados.'
                  ) : (
                    <span>Mostrando {(currentPage - 1) * limit + 1}-{Math.min(currentPage * limit, totalUsers)} de un total de {totalUsers}</span>
                  )
                  }
                </span>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className='dark:hover:bg-gray-700' />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink onClick={() => handlePageChange(i + 1)} isActive={currentPage === i + 1}
                          className='dark:hover:bg-gray-700'>{i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className='dark:hover:bg-gray-700' />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardContent>
          </Card>
          <Footer />
        </div>
      </div>
    </div>
  );
}