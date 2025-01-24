'use client'
import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  Cell,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from "recharts"
import { getStatusCounts, type UserData, type Status } from "@/utils/data"
import { ChartSelector } from "./ChartSelector"
import { useTheme } from "@/contexts/ThemeContext"

interface StatusChartProps {
  data: UserData[]
}

const COLORS = {
  Recibido: "#22c55e",
  Pendiente: "#eab308",
  Cancelado: "#ef4444",
  Concluido: "#3b82f6",
}

const handleHover = (data: any, index: number, isHovering: boolean): void => {
  // Lógica para cambiar algo dinámicamente en hover
  // console.log(`Barra ${index} está ${isHovering ? "activa" : "inactiva"}`);
};



export function StatusChart({ data }: StatusChartProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [chartType, setChartType] = useState("bar")
  const statusCounts = getStatusCounts(data)
  const chartData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }))
  const { theme } = useTheme()

  const isDarkMode = theme === "dark"

  const textColor = isDarkMode ? "#ffffff" : "#333333"
  const gridColor = isDarkMode ? "#4a5568" : "#e2e8f0"

  const renderActiveShape = useCallback(
    (props: any) => {
      const RADIAN = Math.PI / 180
      const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props
      const sin = Math.sin(-RADIAN * midAngle)
      const cos = Math.cos(-RADIAN * midAngle)
      const sx = cx + (outerRadius + 15) * cos
      const sy = cy + (outerRadius + 15) * sin
      const mx = cx + (outerRadius + 45) * cos
      const my = cy + (outerRadius + 45) * sin
      const ex = mx + (cos >= 0 ? 1 : -1) * 32
      const ey = my
      const textAnchor = cos >= 0 ? "start" : "end"

      return (
        <g>
          <text x={cx} y={cy} dy={8} textAnchor="middle" fill={textColor}>
            {payload.name}
          </text>
          <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
          />
          <Sector
            cx={cx}
            cy={cy}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={outerRadius + 6}
            outerRadius={outerRadius + 10}
            fill={fill}
          />
          <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
          <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey}
            textAnchor={textAnchor}
            fill={textColor}
          >{`${value} solicitudes`}</text>
          <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill={textColor}>
            {`(${(percent * 100).toFixed(2)}%)`}
          </text>
        </g>
      )
    },
    [textColor],
  )

  const onPieEnter = useCallback((_: any, index: number) => {
    setActiveIndex(index)
  }, [])

  const renderChart = useCallback(() => {
    switch (chartType) {
      case "pie":
        return (
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name as Status]} />
              ))}
            </Pie>
            <Legend formatter={(value) => <span style={{ color: textColor }}>{value}</span>} />
          </PieChart>
        )
      case "bar":
        return (
          <BarChart data={chartData}>
            <XAxis dataKey="name" tick={{ fill: textColor }} />
            <YAxis tick={{ fill: textColor }} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                color: textColor,
                border: isDarkMode ? "1px solid #4b5563" : "1px solid #d1d5db"
              }}
              cursor={{ fill: isDarkMode ? "#374151" : "#e5e7eb" }}
            />
            <Legend
              formatter={(value) => (
                <span style={{ color: textColor }}>{value}</span>
              )}
            />
            <Bar
              dataKey="value"
              fill="#8884d8"
              onMouseEnter={(data, index) => handleHover(data, index, true)}
              onMouseLeave={(data, index) => handleHover(data, index, false)}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.name as Status]}
                  style={{
                    transition: "fill 0.3s ease",
                  }}
                />
              ))}
            </Bar>
          </BarChart>

        )
      case "line":
        return (
          <LineChart data={chartData}>
            <XAxis dataKey="name" tick={{ fill: textColor }} />
            <YAxis tick={{ fill: textColor }} />
            <Tooltip contentStyle={{ backgroundColor: isDarkMode ? "#1f2937" : "#ffffff", color: textColor }} />
            <Legend formatter={(value) => <span style={{ color: textColor }}>{value}</span>} />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        )
      default:
        return null
    }
  }, [chartType, chartData, activeIndex, onPieEnter, renderActiveShape, textColor, isDarkMode])

  return (
    <Card className="dark:bg-gray-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="dark:text-white">Estatus de Solicitudes</CardTitle>
        <ChartSelector value={chartType} onChange={setChartType} />
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={500}>
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

