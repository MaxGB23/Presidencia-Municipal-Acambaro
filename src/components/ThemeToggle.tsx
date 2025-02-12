// "use client";
// import { Moon, Sun } from "lucide-react";
// import { Switch } from "@/components/ui/switch"; // Switch de Shadcn
// import { useTheme } from "next-themes";

// export function ModeToggle() {
//   const { setTheme } = useTheme();

//   return (
//     <div className="flex items-center gap-4 p-2 bg-white dark:bg-gray-900 rounded-lg border-b-2">
//       <Sun className="h-5 w-5" fill="currentColor" /> {/* Ícono de sol */}
//       <Switch
//         onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
//         className="data-[state=checked]:bg-blue-400 data-[state=unchecked]:bg-gray-300"
//       />
//       <Moon className="h-5 w-5" fill="currentColor" /> {/* Ícono de luna */}
//     </div>
//   );
// }

// SHADCN DOCUMENTATION EXAMPLE:
"use client"

import * as React from "react"
import { Moon, Sun, Lightbulb, Cloud, Star, Flame } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { setTheme } = useTheme()

  // Función que alterna entre los temas
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "dark" ? "light" : "dark"))
  }

  return (
    <Button
      variant="outline"
      size="lg"
      className="w-16 p-0 relative border-gray-400 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 dark:border-gray-600"
      onClick={toggleTheme}
    >
      <Moon className="text-black h-[1.rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:hidden absolute" fill="currentColor"/>
      <Moon className="text-white rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 absolute" fill="currentColor" />

      <span className="sr-only">Tema</span>
    </Button>
  )
}

// "use client"

// import * as React from "react"
// import { Moon, Sun } from "lucide-react"
// import { useTheme } from "next-themes"

// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// export function ModeToggle() {
//   const { setTheme } = useTheme()

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline" size="icon">
//           <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//           <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//           <span className="sr-only">Toggle theme</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem onClick={() => setTheme("light")}>
//           Claro
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("dark")}>
//           Oscuro
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("system")}>
//           Sistema
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }


