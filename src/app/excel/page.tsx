'use client'
import Sidebar3 from '@/components/Sidebar3';
import TableWithExcelImport from '@/components/Excel';
import React, { useState } from "react";

export default function Excel() {

const [isOpen, setIsOpen] = useState(false);
const toggleSidebar = () => setIsOpen(!isOpen);
const initialData = [
  { name: "Juan", age: 30, city: "Acámbaro" },
  { name: "Ana", age: 25, city: "Guanajuato" }
];

  return (
    <div className='flex '>
      <Sidebar3 isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <TableWithExcelImport initialData={initialData} />
    </div>


  )
}

