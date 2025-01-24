import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, Users, BarChart, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import Image from 'next/image';
import { ThemeToggle } from "@/components/ThemeToggle"

export function Sidebar() {
  return (
    <div className="w-64 bg-gray-100 dark:bg-gray-800 h-screen p-4 flex flex-col text-gray-900 dark:text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Avatar>
            <Image src="/images/User.png" alt="@shadcn " width={50} height={50} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">Mario Mejía</h2>
            <p className="dark:text-gray-400 text-sm text-gray-500">Contralor</p>
          </div>
        </div>
        <ThemeToggle />
      </div>
      <nav className="space-y-2 flex-grow">
        <Button variant="ghost" className="w-full justify-start text-gray-900 dark:text-white" asChild>
          <Link href="#">
            <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-900 dark:text-white" asChild>
          <Link href="#">
            <FileText className="mr-2 h-4 w-4" /> Solicitudes
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-900 dark:text-white" asChild>
          <Link href="#">
            <Users className="mr-2 h-4 w-4" /> Usuarios
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-900 dark:text-white" asChild>
          <Link href="#">
            <BarChart className="mr-2 h-4 w-4" /> Estadísticas
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-900 dark:text-white" asChild>
          <Link href="#">
            <Settings className="mr-2 h-4 w-4" /> Configuración
          </Link>
        </Button>
      </nav>
      <Button variant="ghost" className="w-full justify-start mt-auto text-gray-900 dark:text-white">
        <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
      </Button>
    </div>
  )
}

