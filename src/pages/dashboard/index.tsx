import Chart from "@/components/Organisms/Chart"
import Layout from '@/components/Organisms/Layout';
import {
  ChartConfig,
} from "@/components/ui/chart"
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { getRole } from "@/lib/utils";
import { Session } from 'next-auth/react'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

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

const items: Record<string, {title: string, subtitle: string}> = {
  admin: {title: 'Inicio', subtitle: 'Resumen general del sistema y métricas clave'},
  projectManager: {title: 'Inicio', subtitle: 'Resumen general del sistema y métricas clave'},
  collaborator: {title: 'Inicio', subtitle: 'Resumen general del sistema y métricas clave'},
}

interface Props {
  session: Session
}

export default function Index({ session }: Props) {
  const titleItems = items[getRole(session?.user)]

  return (
  <Layout childrenTitle={titleItems.title} childrenSubitle={titleItems.subtitle}>
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

