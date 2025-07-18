// src/pages/projects/index.tsx

// Página de gestión de proyectos
// Accesible solo para administradores y project managers

import React, { useState } from 'react'
import prisma from '@/config/prisma'
import { withAuth, UserPayload } from '@/lib/auth'
import Layout from '@/components/Organisms/Layout'
import Table, { Column } from '@/components/Molecules/Table'
import Modal from '@/components/Molecules/Modal'
import ProjectForm, { ProjectFormData } from '@/components/Molecules/ProjectForm'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

// Estructura de cada proyecto en la tabla
type ProjectItem = {
  id:          string
  name:        string
  description: string | null
  assignedToId: string
  assignedToName:  string | null
  createdAt:   string
  updatedAt:   string
}

// Carga proyectos y usuarios desde la base de datos
// Protegido por middleware de autenticación y roles
export const getServerSideProps = withAuth(
  async () => {
    const projs = await prisma.project.findMany({
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            profile: { select: { avatarUrl: true } }
          }
        }
      }
    })

    // Listamos usuarios para el <Select> de responsables
    const users = await prisma.user.findMany({
      include: { profile: { select: { avatarUrl: true } } }
    })

    return {
      props: {
        initialProjects: projs.map(p => ({
          id:          p.id,
          name:        p.name,
          description: p.description,
          assignedToName: p.assignedTo?.name ?? '',
          createdAt:  (() => {
            const d = p.createdAt
            const dd = String(d.getDate()).padStart(2, '0')
            const mm = String(d.getMonth() + 1).padStart(2, '0')
            const yyyy = d.getFullYear()
            return `${dd}/${mm}/${yyyy}`
          })(),
          updatedAt: p.updatedAt.toISOString(),
        })),
        users: users.map(u => ({
          id:        u.id,
          name:      u.name,
          email:     u.email,
          role:      u.role,
          avatarUrl: u.profile?.avatarUrl ?? null
        })),
      }
    }
  },
  ['Administrator', 'Project_Manager']
)

// Página principal de proyectos
export default function ProjectsPage({
  user,
  initialProjects,
  users
}: {
  user: UserPayload
  initialProjects: ProjectItem[]
  users: UserPayload[]
}) {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects)
  const [modal, setModal]       = useState<'create'|'edit'|'delete'|null>(null)
  const [selected, setSelected] = useState<ProjectItem|null>(null)
  const [form, setForm]         = useState<ProjectFormData>({
    name: '',
    description: '',
    assignedToId: ''
  })
  const { toast } = useToast()
  
  // Reinicia el formulario (para crear o editar)
  const resetForm = (p?: ProjectItem) => {
    if (p) {
      setForm({
        name:         p.name,
        description:  p.description ?? '',
        assignedToId: p.assignedToId
      })
      setSelected(p)
    } else {
      setForm({ name: '', description: '', assignedToId: '' })
      setSelected(null)
    }
  }

  // Crear nuevo proyecto
  const onCreate = async () => {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    if (!res.ok) {
      const err = await res.json()
      return toast({ title: 'Error', description: err.error })
    }
    const p = (await res.json()) as ProjectItem
    setProjects(prev => [...prev, p])
    setModal(null)
    toast({ title: 'Proyecto creado' })
  }

  // Actualizar proyecto existente
  const onUpdate = async () => {
    if (!selected) return
    const res = await fetch(`/api/projects/${selected.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    if (!res.ok) {
      const err = await res.json()
      return toast({ title: 'Error', description: err.error })
    }
    setProjects(prev =>
      prev.map(x => x.id === selected.id
        ? { ...x, ...form, assignedToName: x.assignedToName }
        : x
      )
    )
    setModal(null)
    toast({ title: 'Proyecto actualizado' })
  }

  // Eliminar proyecto
  const onDelete = async () => {
    if (!selected) return
    const res = await fetch(`/api/projects/${selected.id}`, { method: 'DELETE' })
    if (!res.ok) {
      const err = await res.json()
      return toast({ title: 'Error', description: err.error })
    }
    setProjects(prev => prev.filter(x => x.id !== selected.id))
    setModal(null)
    toast({ title: 'Proyecto eliminado' })
  }

  // Columnas de la tabla de proyectos
  const columns: Column<ProjectItem>[] = [
    { key: 'name',       label: 'Proyecto',    type: 'text'   },
    { key: 'assignedToName', label: 'Responsable', type: 'text' },
    { key: 'description',label: 'Descripción', type: 'text'   },
    { key: 'createdAt',  label: 'Creado',      type: 'text'   },
    { key: 'actions',    label: 'Acciones',    type: 'actions'}
  ]

  // Render del layout y los componentes visuales
  return (
    <Layout user={user} childrenTitle="Proyectos" childrenSubitle="Administra los proyectos">
      {/* Header */}
      <section className="absolute mb-8 pt-2 w-full max-w-md mx-auto">
        <Button
          onClick={() => { resetForm(); setModal('create') }}
          className="absolute mt-2 bg-blue-500 hover:bg-blue-600 text-white shadow-md cursor-pointer"
        >
          <Plus className="mr-2" /> Nuevo proyecto
        </Button>
      </section>
      <section className="mb-6 mt-15 w-full">
        <Table<ProjectItem>
          columns={columns}
          data={projects}
          onEdit={p => { resetForm(p); setModal('edit') }}
          onDelete={p => { resetForm(p); setModal('delete') }}
        />
      </section>

      {/* Create Modal */}
      <Modal
        isOpen={modal === 'create'}
        onClose={() => setModal(null)}
        title="Crear Proyecto"
        subtitle="Rellena el formulario"
        primaryButtonText="Crear"
        onPrimaryAction={onCreate}
      >
        <ProjectForm data={form} onChange={setForm} users={users} />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={modal === 'edit'}
        onClose={() => setModal(null)}
        title="Editar Proyecto"
        subtitle="Actualiza los datos"
        primaryButtonText="Actualizar"
        onPrimaryAction={onUpdate}
      >
        <ProjectForm data={form} onChange={setForm} users={users} />
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={modal === 'delete'}
        onClose={() => setModal(null)}
        title={`Eliminar proyecto "${selected?.name}"?`}
        subtitle="Esta acción no se puede deshacer."
        primaryButtonText="Eliminar"
        primaryButtonVariant="destructive"
        onPrimaryAction={onDelete}
      >
        <p className="text-sm text-gray-600">
          El proyecto será eliminado permanentemente.
        </p>
      </Modal>
    </Layout>
  )
}
