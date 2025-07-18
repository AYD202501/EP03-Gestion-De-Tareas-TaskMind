// src/pages/projects/index.tsx

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

type ProjectItem = {
  id:             string
  name:           string
  description:    string | null
  assignedToId:   string       // para el form de edición/creación
  assignedToName: string       // para mostrar el nombre en la tabla
  createdAt:      string       // ya formateado como DD/MM/AAAA
}

export const getServerSideProps = withAuth(
  async () => {
    // 1) Traemos proyectos con su relación assignedTo
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

    // 2) Cargamos lista de usuarios para el <Select> de responsables
    const users = await prisma.user.findMany({
      include: { profile: { select: { avatarUrl: true } } }
    })

    // 3) Mappeamos al shape que queremos en la página
    const initialProjects: ProjectItem[] = projs.map(p => ({
      id:             p.id,
      name:           p.name,
      description:    p.description,
      assignedToId:   p.assignedTo?.id ?? '',       // si no hay asignado, queda vacío
      assignedToName: p.assignedTo?.name ?? '—',     // si no hay asignado, mostramos un guión
      createdAt:      (() => {
        const d   = p.createdAt
        const dd  = String(d.getDate()).padStart(2, '0')
        const mm  = String(d.getMonth() + 1).padStart(2, '0')
        const yyyy = d.getFullYear()
        return `${dd}/${mm}/${yyyy}`
      })(),
    }))

    const userList: UserPayload[] = users.map(u => ({
      id:        u.id,
      email:     u.email,
      role:      u.role,
      name:      u.name,
      avatarUrl: u.profile?.avatarUrl ?? null
    }))

    return {
      props: {
        initialProjects,
        users: userList
      }
    }
  },
  ['Administrator', 'Project_Manager']
)

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

  // Pone el form en blanco o con los valores del proyecto "p"
  const resetForm = (p?: ProjectItem) => {
    if (p) {
      setForm({
        name:         p.name,
        description:  p.description ?? '',
        assignedToId: p.assignedToId
      })
      setSelected(p)
    } else {
      setForm({ name:'', description:'', assignedToId:'' })
      setSelected(null)
    }
  }

  // CREATE
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

  // UPDATE
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
      prev.map(x =>
        x.id === selected.id
          ? {
              ...x,
              name:           form.name,
              description:    form.description,
              assignedToId:   form.assignedToId,
              assignedToName: // volvemos a tomar el nombre del `users` list
                users.find(u => u.id === form.assignedToId)?.name ?? '—',
            }
          : x
      )
    )
    setModal(null)
    toast({ title: 'Proyecto actualizado' })
  }

  // DELETE
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

  const columns: Column<ProjectItem>[] = [
    { key:'name',           label:'Proyecto',    type:'text'   },
    { key:'assignedToName', label:'Responsable', type:'text'   },
    { key:'description',    label:'Descripción', type:'text'   },
    { key:'createdAt',      label:'Creado',      type:'text'   },
    { key:'actions',        label:'Acciones',    type:'actions'}
  ]

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
          onEdit={p    => { resetForm(p);    setModal('edit') }}
          onDelete={p  => { resetForm(p);    setModal('delete') }}
        />
      </section>

      {/* Modal Crear */}
      <Modal
        isOpen={modal==='create'}
        onClose={()=>setModal(null)}
        title="Crear Proyecto"
        subtitle="Rellena el formulario"
        primaryButtonText="Crear"
        onPrimaryAction={onCreate}
      >
        <ProjectForm data={form} onChange={setForm} users={users} />
      </Modal>

      {/* Modal Editar */}
      <Modal
        isOpen={modal==='edit'}
        onClose={()=>setModal(null)}
        title="Editar Proyecto"
        subtitle="Actualiza los datos"
        primaryButtonText="Actualizar"
        onPrimaryAction={onUpdate}
      >
        <ProjectForm data={form} onChange={setForm} users={users} />
      </Modal>

      {/* Modal Eliminar */}
      <Modal
        isOpen={modal==='delete'}
        onClose={()=>setModal(null)}
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
