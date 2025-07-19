// src/pages/dashboard/index.tsx
// src/pages/index.tsx

// Página de inicio/dashboard para usuarios autenticados
// Muestra un resumen visual de tareas por proyecto usando un gráfico
import type { GetServerSideProps } from 'next'
import { withAuth, UserPayload } from '@/lib/auth'
import prisma from '@/config/prisma'
import Layout from '@/components/Organisms/Layout'
import Chart from '@/components/Organisms/Chart'
import type { ChartConfig } from '@/components/ui/chart'

type ChartDatum = {
  project:    string
  pending:    number
  inProgress: number
  inReview:   number
  done:       number
}

// Props que recibe el componente desde getServerSideProps
interface Props {
  user:      UserPayload
  chartData: ChartDatum[]
}

export const getServerSideProps: GetServerSideProps<Props> = withAuth(
  async () => {
    // 1) Carga todos los proyectos con sus tareas (solo estado)
    const projects = await prisma.project.findMany({
      select: {
        name: true,
        tasks: {
          select: { status: true }
        }
      }
    })

    // 2) Para cada proyecto, contamos según status
    const chartData: ChartDatum[] = projects.map((p) => {
      let pending    = 0
      let inProgress = 0
      let inReview   = 0
      let done       = 0

      p.tasks.forEach((t) => {
        switch (t.status) {
          case 'Pending':    pending++;    break
          case 'In_process': inProgress++; break
          case 'Review':     inReview++;   break
          case 'Finished':   done++;       break
        }
      })

      return {
        project:    p.name,
        pending,
        inProgress,
        inReview,
        done
      }
    })

    return {
      props: { chartData }
    }
  }
)

const chartConfig: ChartConfig = {
  pending:    { label: 'Pendiente' },
  inProgress: { label: 'En progreso' },
  inReview:   { label: 'En Revisión' },
  done:       { label: 'Completadas' }
}

const roleTitles: Record<Props['user']['role'], { title: string; subtitle: string }> = {
  Administrator:   { title: 'Inicio', subtitle: 'Resumen general del sistema y métricas clave' },
  Project_Manager: { title: 'Inicio', subtitle: 'Resumen general del sistema y métricas clave' },
  Colaborator:     { title: 'Inicio', subtitle: 'Resumen general del sistema y métricas clave' },
}

// Componente principal del dashboard
export default function Dashboard({ user, chartData }: Props) {
  const { title, subtitle } = roleTitles[user.role]

  return (
    <Layout user={user} childrenTitle={title} childrenSubitle={subtitle}>
      <div className="bg-white px-4 py-6 rounded-lg shadow-lg space-y-3 w-full max-w-4xl mx-auto mt-6">
        <div>
          <h2 className="font-bold">Tareas por proyecto</h2>
          <p className="text-sm text-gray-600">
            Distribución de tareas por estado y proyecto
          </p>
        </div>
        <div className="h-[350px]">
          <Chart chartData={chartData} chartConfig={chartConfig} />
        </div>
      </div>
    </Layout>
  )
}
