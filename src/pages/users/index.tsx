// src/pages/users/index.tsx

import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import prisma from '@/config/prisma'
import { withAuth, UserPayload } from '@/lib/auth'
import Layout from '@/components/Organisms/Layout'   // ← default import
import Table, { Column } from '@/components/Molecules/Table'
import Modal from '@/components/Molecules/Modal'
import UserForm, { UserFormData } from '@/components/Molecules/UserForm'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { RoleKey } from '@/lib/auth'

type UserTableItem = {
  id: string
  user: { name: string; image: string }
  email: string
  role: RoleKey
}

type Props = {
  user: UserPayload
  initialUsers: UserTableItem[]
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  //Autenticación + rol
  const auth = await withAuth()(ctx)
  if ('redirect' in auth) return auth
  if ('notFound' in auth) return auth

  const { user } = auth.props as { user: UserPayload }
  if (user.role !== 'Administrator') {
    return {
      redirect: {
        destination: '/dashboard?unauthorized=true',
        permanent: false,
      },
    }
  }

  // 2) Cargamos usuarios reales desde la BD
  const users = await prisma.user.findMany({
    include: { profile: { select: { avatarUrl: true } } }
  })
  const initialUsers: UserTableItem[] = users.map(u => ({
    id: u.id,
    user: { name: u.name, image: u.profile?.avatarUrl ?? '' },
    email: u.email,
    role: u.role,
  }))

  return { props: { user, initialUsers } }
}

export default function UsersPage({ user, initialUsers }: Props) {
  const [usersData, setUsersData] = useState<UserTableItem[]>(initialUsers)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen]     = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedUser, setSelectedUser]           = useState<UserTableItem | null>(null)
  const [formData, setFormData] = useState<UserFormData>({ fullName: '', email: '', role: '', password: '' })
  const { toast } = useToast()

  // CREATE
  const handleCreate = async () => {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    if (!res.ok) {
      const err = await res.json()
      return toast({ title: 'Error', description: err.error })
    }
    const newUser = (await res.json()) as UserTableItem
    setUsersData(prev => [...prev, newUser])
    setIsCreateModalOpen(false)
    toast({ title: 'Usuario creado' })
  }

  // UPDATE
  const handleUpdate = async () => {
    if (!selectedUser) return
    const res = await fetch(`/api/users/${selectedUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    if (!res.ok) {
      const err = await res.json()
      return toast({ title: 'Error', description: err.error })
    }
    setUsersData(prev =>
      prev.map(u =>
        u.id === selectedUser!.id
          ? {
              ...u,
              user: { ...u.user, name: formData.fullName },
              email: formData.email,
              role: formData.role as RoleKey // Aseguramos que sea del tipo correcto
            }
          : u
      )
    )
    setIsEditModalOpen(false)
    toast({ title: 'Usuario actualizado' })
  }

  // DELETE
  const handleDelete = async () => {
    if (!selectedUser) return
    const res = await fetch(`/api/users/${selectedUser.id}`, {
      method: 'DELETE'
    })
    if (!res.ok) {
      const err = await res.json()
      return toast({ title: 'Error', description: err.error })
    }
    setUsersData(prev => prev.filter(u => u.id !== selectedUser.id))
    setIsDeleteModalOpen(false)
    toast({ title: 'Usuario eliminado' })
  }

 const onNew = () => {
    setFormData({ fullName: '', email: '', role: '', password: '' })
    setIsCreateModalOpen(true)
  }

  const onEdit = (u: UserTableItem) => {
    setSelectedUser(u)
    setFormData({ fullName: u.user.name, email: u.email, role: u.role, password: '' })
    setIsEditModalOpen(true)
  }

  const onDelete = (u: UserTableItem) => {
    setSelectedUser(u)
    setIsDeleteModalOpen(true)
  }

  const userColumns: Column<UserTableItem>[] = [
    { key: 'user',    label: 'Usuario', type: 'avatar' },
    { key: 'email',   label: 'Email',   type: 'text'   },
    {
      key: 'role',
      label: 'Rol',
      type: 'badge',
      badgeColors: {
        Administrator:   'bg-purple-100 text-purple-800',
        Project_Manager: 'bg-blue-100   text-blue-800',
        Colaborator:     'bg-gray-100   text-gray-800',
      }
    },
    { key: 'actions', label: 'Acciones', type: 'actions' }
  ]

  return (
    <Layout user={user} childrenTitle="Usuarios" childrenSubitle="Administra los usuarios">
      <section className="mb-6 mt-15 w-full">
        <Table columns={userColumns} data={usersData} onEdit={onEdit} onDelete={onDelete} />
      </section>
      <section className="absolute mb-8 pt-2 w-full max-w-md mx-auto">
        <Button
          onClick={onNew}
          className="absolute mt-2 bg-blue-500 hover:bg-blue-600 text-white shadow-md cursor-pointer"
        >
          <Plus className="mr-2" /> Nuevo usuario
        </Button>
      </section>
      
     {/* Modales */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Crear usuario"
        subtitle="Rellena el formulario"
        primaryButtonText="Crear"
        onPrimaryAction={handleCreate}
      >
        {/* En creación incluimos password */}
        <UserForm
          data={formData}
          onChange={(data) => setFormData(data)}
          includePassword
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Editar usuario"
        subtitle="Actualiza los datos"
        primaryButtonText="Actualizar"
        onPrimaryAction={handleUpdate}
      >
        {/* Al editar no pedimos password */}
        <UserForm
          data={formData}
          onChange={(data) => setFormData(data)}
          includePassword={false}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={`Eliminar ${selectedUser?.user.name}?`}
        subtitle="Esta acción es irreversible"
        primaryButtonText="Eliminar"
        primaryButtonVariant="destructive"
        onPrimaryAction={handleDelete}
      >
        <p className="text-sm text-gray-600">
          Se eliminará permanentemente este usuario.
        </p>
      </Modal>
    </Layout>
  )
}
