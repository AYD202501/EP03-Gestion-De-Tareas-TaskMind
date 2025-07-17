import Chart from "@/components/Organisms/Chart"
import Layout from '@/components/Organisms/Layout';
import Main from '@/templates/Main';

import {
  ChartConfig,
} from "@/components/ui/chart"

const chartData = [
  { project: "Proyecyo 1", done: 186, inReview: 80, inProgress: 120, pending: 90 },
  { project: "Proyecyo 2", done: 120, inReview: 150, inProgress: 40, pending: 60 },
  { project: "Proyecyo 3", done: 210, inReview: 190, inProgress: 100, pending: 40 },
  { project: "Proyecyo 4", done: 150, inReview: 180, inProgress: 40, pending: 60 },

]

const chartConfig = {
  done: {
    label: "Completadas",
  },
  inReview: {
    label: "En Revisión",
  },
  inProgress: {
    label: "En progreso",
  },
  pending: {
    label: "Pendiente",
  },
} satisfies ChartConfig


export default function Index() {
  return (
  <Layout childrenTitle="Dashboard" childrenSubitle="Bienvenido al panel de control">
      <div className='bg-white  px-4 py-6 rounded-lg shadow-lg'>
        <h2 className="font-bold">Tareas por proyecto</h2>
        <h3>Distribución de tareas por estado y proyecto</h3>
        <br />
        <div className="flex h-full w-full">
          <Chart chartData={chartData} chartConfig={chartConfig} />
        </div>
      </div>
  </Layout>
  );
}

