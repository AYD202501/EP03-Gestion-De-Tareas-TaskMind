'use client'

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
} from 'recharts'

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { ResponsiveContainer } from 'recharts'

interface Props {
  chartData: {
    project: string
    done: number
    inReview: number
    inProgress: number
    pending: number
  }[]
  chartConfig?: any
}

const Index = ({ chartData, chartConfig }: Props) => {
  return (
    <ChartContainer config={chartConfig} className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} {...chartConfig}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="project"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice()}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="pending" fill="var(--color-task-pending)" radius={4} />
          <Bar dataKey="inProgress" fill="var(--color-task-progress)" radius={4} />
          <Bar dataKey="inReview" fill="var(--color-task-review)" radius={4} />
          <Bar dataKey="done" fill="var(--color-task-done)" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export default Index
