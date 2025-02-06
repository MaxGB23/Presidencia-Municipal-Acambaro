'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Switch } from '@/components/ui/switch'; // Componente de switch de Shadcn/ui

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-4 p-2 bg-white dark:bg-gray-900 rounded-lg border-b-2">
      <Sun className="h-5 w-5" fill="currentColor" /> {/* Ícono de sol */}
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-blue-400 data-[state=unchecked]:bg-gray-300"
      />
      <Moon className="h-5 w-5 " fill="currentColor" /> {/* Ícono de luna */}
    </div>
  );
}