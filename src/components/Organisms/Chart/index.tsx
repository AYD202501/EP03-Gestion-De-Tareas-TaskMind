'use client' // Permite que el componente sea renderizado en el cliente (Next.js)

import type { ChartConfig } from '@/components/ui/chart'

// Componentes base de Recharts (librería de gráficos)
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
} from 'recharts'

// Componentes personalizados del sistema de diseño
import {
  ChartContainer,        // Componente contenedor estilizado para gráficos
  ChartLegend,            // Componente que envuelve la leyenda del gráfico
  ChartLegendContent,     // Contenido personalizado de la leyenda
  ChartTooltip,           // Componente que envuelve el tooltip del gráfico
  ChartTooltipContent,    // Contenido personalizado del tooltip
} from '@/components/ui/chart'

import { ResponsiveContainer } from 'recharts' // Hace el gráfico adaptable al ancho y alto

// Props definidas: recibe datos de tareas y configuración del gráfico
interface Props {
  chartData: {
    project: string        // Nombre del proyecto (etiquetas del eje X)
    done: number           // Cantidad de tareas completadas
    inReview: number       // Cantidad de tareas en revisión
    inProgress: number     // Cantidad de tareas en progreso
    pending: number        // Cantidad de tareas pendientes
  }[]
  chartConfig: ChartConfig // Configuración externa del gráfico (por ejemplo, márgenes)
}

// Componente principal
const Index = ({ chartData, chartConfig }: Props) => {
  return (
    // Contenedor estilizado con configuración del gráfico
    <ChartContainer config={chartConfig} className="w-full h-[300px]">
      {/* Contenedor responsive */}
      <ResponsiveContainer width="100%" height="100%">

        {/* Gráfico de barras */}
        <BarChart data={chartData} {...chartConfig}>

          {/* Cuadrícula solo horizontal */}
          <CartesianGrid vertical={false} />

          {/* Eje X configurado con nombres de proyectos */}
          <XAxis
            dataKey="project"         // Campo usado como etiquetas del eje X
            tickLine={false}          // Quita la línea de cada marca
            tickMargin={10}           // Margen inferior en las etiquetas
            axisLine={false}          // Quita la línea base del eje
            tickFormatter={(value) => value.slice()} // Permite formatear etiquetas (opcional)
          />

          {/* Tooltip y leyenda personalizados */}
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />

          {/* Barras de cada estado de las tareas */}
          <Bar dataKey="pending"     fill="var(--color-task-pending)"     radius={4} />
          <Bar dataKey="inProgress"  fill="var(--color-task-progress)"    radius={4} />
          <Bar dataKey="inReview"    fill="var(--color-task-review)"      radius={4} />
          <Bar dataKey="done"        fill="var(--color-task-done)"        radius={4} />

        </BarChart>

      </ResponsiveContainer>
    </ChartContainer>
  )
}

export default Index
