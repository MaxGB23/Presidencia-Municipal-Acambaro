"use client"

import * as React from "react"
import { Moon, Sun, Lightbulb, Cloud, Star, Flame } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { setTheme } = useTheme()

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