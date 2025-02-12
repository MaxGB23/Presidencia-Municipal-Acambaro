"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxProps {
  options: { value: string; label: string }[];
  label?: string;
  placeholder?: string;
  onSelect?: (value: string) => void;
}

export default function Combobox({ options, label, placeholder, onSelect}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleSelect = (selectedValue: string) => {
    const newValue = selectedValue === value ? "" : selectedValue;
    setValue(newValue);
    setOpen(false);
    if (onSelect) onSelect(newValue);
  };

  return (
    <div className="flex flex-col">
      {label && <label className="pl-1 block text-sm lg:text-lg text-gray-800 mb-2">{label}</label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="text-lg py-7 w-full justify-between dark:bg-white dark:text-black border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-blue-300 transition-all ease-in-out duration-200"
          >
            {value ? options.find((opt) => opt.value === value)?.label : placeholder || "Selecciona una opción"}
            <ChevronsUpDown className="ml-2 h-5 w-5 shrink-0 text-gray-500" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            "p-0 mt-2 rounded-lg shadow-lg bg-white border border-gray-200 ",

          )}
        >
          <Command className="dark:bg-white dark:text-black">
            <CommandInput
              placeholder="Buscar..."
              className="px-3 py-2 text-sm text-gray-700 border-b border-gray-300 focus:outline-none"
            />
            <CommandList>
              <CommandEmpty className="text-gray-500 text-sm p-2 justify-center flex">No se encontraron resultados.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelect(option.value)}
                    className={cn(
                      "flex items-center px-3 py-2 text-md text-gray-700 cursor-pointer transition-all ease-in-out dark:bg-white dark:text-black",
                      value === option.value
                        ? "bg-indigo-100 text-indigo-700"
                        : "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-100 dark:hover:text-gray-900"
                    )}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100 text-indigo-500" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
