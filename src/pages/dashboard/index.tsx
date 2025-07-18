// src/pages/index.tsx

// Página de inicio/dashboard para usuarios autenticados
// Muestra un resumen visual de tareas por proyecto usando un gráfico

import Chart from "@/components/Organisms/Chart"
import Layout from '@/components/Organisms/Layout';
import {
  ChartConfig,
} from "@/components/ui/chart"
import { UserPayload, withAuth } from "@/lib/auth";

// Middleware para proteger la página: solo usuarios autenticados pueden acceder
export const getServerSideProps = withAuth()

// Datos de ejemplo para el gráfico: tareas agrupadas por estado y proyecto
const chartData = [
  { project: "Proyecto 1", done: 186, inReview: 80, inProgress: 120, pending: 90 },
  { project: "Proyecto 2", done: 120, inReview: 150, inProgress: 40, pending: 60 },
  { project: "Proyecto 3", done: 210, inReview: 190, inProgress: 100, pending: 40 },
  { project: "Proyecto 4", done: 150, inReview: 180, inProgress: 40, pending: 60 },

]

// Configuración de etiquetas para cada estado en el gráfico
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

// Títulos personalizados según el rol del usuario
const items: Record<string, {title: string, subtitle: string}> = {
  Administrator: {title: 'Inicio', subtitle: 'Resumen general del sistema y métricas clave'},
  Project_Manager: {title: 'Inicio', subtitle: 'Resumen general del sistema y métricas clave'},
  Colaborator: {title: 'Inicio', subtitle: 'Resumen general del sistema y métricas clave'},
}

// Props que recibe el componente desde getServerSideProps
interface Props {
  user: UserPayload;
}

// Componente principal del dashboard
export default function Index({ user }: Props) {
  const titleItems = items[user.role]

  return (
  <Layout user={user} childrenTitle={titleItems.title} childrenSubitle={titleItems.subtitle}>
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

