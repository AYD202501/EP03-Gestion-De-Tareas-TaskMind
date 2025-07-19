// src/pages/tasks/index.tsx
import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import prisma from '@/config/prisma'
import { withAuth, UserPayload } from '@/lib/auth'
import Layout from '@/components/Organisms/Layout'
import KanbanColumn, { BoardTask } from '@/components/Molecules/KanbanColumn'
import Modal from '@/components/Molecules/Modal'
import TaskForm, { TaskFormData } from '@/components/Molecules/TaskForm'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

interface TasksPageProps {
  user: UserPayload
  initialTasks: BoardTask[]
  projects: { id: string; name: string }[]
  users: { id: string; name: string }[]
}

export const getServerSideProps: GetServerSideProps<TasksPageProps> = withAuth(
  async () => {

    const tasks = await prisma.task.findMany({
      include: { assignedTo: { select: { name: true } } },
      orderBy: { dueDate: 'asc' }
    })


    const projects = await prisma.project.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' }
    })

    const users = await prisma.user.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' }
    })

    const initialTasks: BoardTask[] = tasks.map(t => ({
      id:          t.id,
      title:       t.title,
      description: t.description,
      status:
        t.status === 'Pending'     ? 'Pendiente' :
        t.status === 'In_process'  ? 'En progreso' :
        t.status === 'Review'      ? 'En Revisión' :
        t.status === 'Finished'    ? 'Completado' :
        'Pendiente',
      dueDate: t.dueDate
        ? (() => {
            const d  = t.dueDate!
            const dd = String(d.getDate()).padStart(2,'0')
            const mm = String(d.getMonth()+1).padStart(2,'0')
            const yy = d.getFullYear()
            return `${dd}/${mm}/${yy}`
          })()
        : '',
      assignedTo: t.assignedTo?.name ?? '—'
    }))

    return {
      props: {
        initialTasks,
        projects,
        users
      }
    }
  }
)

export default function TasksPage({
  user,
  initialTasks,
  projects,
  users
}: TasksPageProps) {
  const [tasks, setTasks] = useState<BoardTask[]>(initialTasks)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    project: '',
    assignedTo: '',
    dueDate: '',
    category: '',
    tags: ''
  })
  const { toast } = useToast()

  const handleStatusChange = (id: string, newStatus: BoardTask['status']) =>
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, status: newStatus } : t)
    )

  const handleNewTask = () => {
    setFormData({
      title: '',
      description: '',
      project: '',
      assignedTo: '',
      dueDate: '',
      category: '',
      tags: ''
    })
    setIsCreateModalOpen(true)
  }

  const handleCreateTask = async () => {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(formData)
    })
    if (!res.ok) {
      const err = await res.json()
      return toast({ title:'Error', description: err.error })
    }
    const t = await res.json()
    const newTask: BoardTask = {
      id:          t.id,
      title:       t.title,
      description: t.description,
      status:
        t.status === 'Pending'     ? 'Pendiente' :
        t.status === 'In_process'  ? 'En progreso' :
        t.status === 'Review'      ? 'En Revisión' :
        t.status === 'Finished'    ? 'Completado' :
        'Pendiente',
      dueDate: t.dueDate
        ? (() => {
            const d  = new Date(t.dueDate)
            const dd = String(d.getDate()).padStart(2,'0')
            const mm = String(d.getMonth()+1).padStart(2,'0')
            const yy = d.getFullYear()
            return `${dd}/${mm}/${yy}`
          })()
        : '',
      assignedTo: t.assignedTo?.name ?? '—'
    }
    setTasks(prev => [...prev, newTask])
    setIsCreateModalOpen(false)
    toast({ title:'Tarea creada' })
  }

  const getTasksByStatus = (status: BoardTask['status']) =>
    tasks.filter(t => t.status === status)

  const columns = [
    { title:'Pendiente',   status:'Pendiente' },
    { title:'En progreso', status:'En progreso' },
    { title:'En Revisión', status:'En Revisión' },
    { title:'Completado',  status:'Completado' }
  ] as const

  return (
    <Layout
      user={user}
      childrenTitle="Tareas"
      childrenSubitle="Vista general de todas las tareas del sistema"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Tablero de tareas</h2>
        <Button
          onClick={handleNewTask}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" /> Nueva tarea
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map(col => (
          <KanbanColumn
            key={col.status}
            title={col.title}
            status={col.status}
            tasks={getTasksByStatus(col.status)}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Nueva Tarea"
        subtitle="Crea una nueva tarea y asígnala a un colaborador."
        primaryButtonText="Agregar"
        onPrimaryAction={handleCreateTask}
      >

        <TaskForm
          data={formData}
          onChange={setFormData}
          projects={projects}
          users={users}
        />
      </Modal>
    </Layout>
  )
}
