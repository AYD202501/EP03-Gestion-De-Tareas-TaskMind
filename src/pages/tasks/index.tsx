// src/pages/tasks/index.tsx

import React, { useState } from 'react'
import type { GetServerSideProps } from 'next'
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
  user:        UserPayload
  initialTasks: BoardTask[]
  projects:    { id: string; name: string }[]
  users:       { id: string; name: string }[]
}

export const getServerSideProps: GetServerSideProps<TasksPageProps> = withAuth(
  async () => {
    // fetch tasks
    const tasks = await prisma.task.findMany({
      include: { assignedTo: { select: { name: true } } },
      orderBy: { dueDate: 'asc' }
    })
    // map to BoardTask
    const initialTasks: BoardTask[] = tasks.map(t => ({
      id:          t.id,
      title:       t.title,
      description: t.description,
      status:
        t.status === 'Pending'    ? 'Pendiente' :
        t.status === 'In_process' ? 'En progreso' :
        t.status === 'Review'     ? 'En Revisión' :
        t.status === 'Finished'   ? 'Completado' :
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
      assignedTo: t.assignedTo?.name ?? '—',
      projectId:  t.projectId ?? ''
    }))

    // fetch select-lists
    const projects = await prisma.project.findMany({
      select: { id: true, name: true },
      orderBy:{ name:'asc' }
    })
    const users = await prisma.user.findMany({
      select: { id: true, name: true },
      orderBy:{ name:'asc' }
    })

    return {
      props: { initialTasks, projects, users }
    }
  }
)

export default function TasksPage({
  user, initialTasks, projects, users
}: TasksPageProps) {
  const [tasks, setTasks] = useState<BoardTask[]>(initialTasks)
  const [modal, setModal] = useState<'create'|'edit'|null>(null)
  const [selected, setSelected] = useState<BoardTask|null>(null)
  const [formData, setFormData] = useState<TaskFormData>({
    title:'', description:'', project:'', assignedTo:'', dueDate:''
  })
  const { toast } = useToast()

  const mapToEnum = (s: BoardTask['status']) =>
    s === 'Pendiente'    ? 'Pending'    :
    s === 'En progreso'  ? 'In_process' :
    s === 'En Revisión'  ? 'Review'     :
    s === 'Completado'   ? 'Finished'   :
    'Pending'

  // cambia estado persistiendo
  const handleStatusChange = async (id: string, newStatus: BoardTask['status']) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ status: mapToEnum(newStatus) })
    })
    if (!res.ok) {
      const err = await res.json()
      return toast({ title:'Error', description: err.error })
    }
    setTasks(tasks.map(t => t.id===id ? { ...t, status: newStatus } : t))
  }

  // abrir crear
  const openCreate = () => {
    setSelected(null)
    setFormData({ title:'', description:'', project:'', assignedTo:'', dueDate:'' })
    setModal('create')
  }
  // abrir editar
  const openEdit = (task: BoardTask) => {
    setSelected(task)
    setFormData({
      title:       task.title,
      description: task.description ?? '',
      project:     task.projectId,
      assignedTo:  users.find(u=>u.name===task.assignedTo)?.id ?? '',
      dueDate:     task.dueDate.split('/').reverse().join('-') // yyyy-mm-dd
    })
    setModal('edit')
  }

  // crear
  const handleCreate = async () => {
    const res = await fetch('/api/tasks', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(formData)
    })
    if (!res.ok) {
      const e = await res.json()
      return toast({ title:'Error', description: e.error })
    }
    const t = await res.json()
    const newTask: BoardTask = {
      id:          t.id,
      title:       t.title,
      description: t.description,
      status:      'Pendiente',
      dueDate:     formData.dueDate.split('-').reverse().join('/'),
      assignedTo:  users.find(u=>u.id===t.assignedToId)?.name ?? '—',
      projectId:   t.projectId ?? ''
    }
    setTasks([...tasks, newTask])
    setModal(null)
    toast({ title:'Tarea creada' })
  }

  // actualizar
  const handleUpdate = async () => {
    if (!selected) return
    const res = await fetch(`/api/tasks/${selected.id}`, {
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        ...formData,
        status: mapToEnum(selected.status)
      })
    })
    if (!res.ok) {
      const e = await res.json()
      return toast({ title:'Error', description: e.error })
    }
    const t = await res.json()
    setTasks(tasks.map(x =>
      x.id === t.id
        ? {
            id: t.id,
            title: t.title,
            description: t.description,
            status: selected.status,
            dueDate: formData.dueDate.split('-').reverse().join('/'),
            assignedTo: users.find(u=>u.id===t.assignedToId)?.name ?? '—',
            projectId: t.projectId ?? ''
          }
        : x
    ))
    setModal(null)
    toast({ title:'Tarea actualizada' })
  }

  // eliminar
  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/tasks/${id}`, { method:'DELETE' })
    if (!res.ok) {
      const e = await res.json()
      return toast({ title:'Error', description: e.error })
    }
    setTasks(tasks.filter(x=>x.id!==id))
    toast({ title:'Tarea eliminada' })
  }

  const getTasksByStatus = (st: BoardTask['status']) =>
    tasks.filter(t => t.status === st)

  const columns = [
    { title:'Pendiente',   status:'Pendiente' },
    { title:'En progreso', status:'En progreso' },
    { title:'En Revisión', status:'En Revisión' },
    { title:'Completado',  status:'Completado' }
  ] as const

  return (
    <Layout user={user} childrenTitle="Tareas" childrenSubitle="Tablero de tareas">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Tablero de tareas</h2>
        <Button onClick={openCreate} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="mr-2"/>Nueva tarea
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
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <Modal
        isOpen={modal==='create'}
        onClose={()=>setModal(null)}
        title="Nueva Tarea"
        subtitle="Rellena los datos"
        primaryButtonText="Crear"
        onPrimaryAction={handleCreate}
      >
        <TaskForm data={formData} onChange={setFormData}
                  projects={projects} users={users} />
      </Modal>

      <Modal
        isOpen={modal==='edit'}
        onClose={()=>setModal(null)}
        title="Editar Tarea"
        subtitle="Actualiza los datos"
        primaryButtonText="Guardar"
        onPrimaryAction={handleUpdate}
      >
        <TaskForm data={formData} onChange={setFormData}
                  projects={projects} users={users} />
      </Modal>
    </Layout>
  )
}
