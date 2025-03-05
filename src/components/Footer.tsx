import React from 'react'

export default function Footer() {
  return (
    <div className="bg-gray-100 dark:bg-slate-900 p-7 pb-0">
      <footer>
        <p className="text-center text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Desarrollado por el equipo ABMODEL
        </p>
        <p className="text-center text-gray-500 dark:text-gray-400"> 
          Maximiliano González Ballesteros y Luis Fernando Argueta Cruz
        </p>
      </footer>
    </div>
  )
}
