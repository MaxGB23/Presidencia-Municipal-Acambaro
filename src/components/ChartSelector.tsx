import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ChartSelectorProps {
  value: string
  onChange: (value: string) => void
}

export function ChartSelector({ value, onChange }: ChartSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Seleccionar tipo de gráfico">
        <SelectValue placeholder="Seleccionar tipo de gráfico" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="bar">Gráfico de Barras</SelectItem>
        <SelectItem value="pie">Gráfico Circular</SelectItem>        
        <SelectItem value="line">Gráfico de Líneas</SelectItem>
      </SelectContent>
    </Select>
  )
}

