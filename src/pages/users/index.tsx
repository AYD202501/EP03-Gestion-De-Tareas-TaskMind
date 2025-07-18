// src/pages/users/index.tsx

import React, { useState } from 'react'
import Layout from '@/components/Organisms/Layout'
import Table, { Column } from '@/components/Molecules/Table'
import Modal from '@/components/Molecules/Modal'
import UserForm from '@/components/Molecules/UserForm'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { withAuth, UserPayload } from '@/lib/auth'
import type { GetServerSideProps } from 'next'

type Props = {
  user: UserPayload
}

// Primero autenticamos, luego chequeamos el rol
export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const authResult = await withAuth()(ctx)
  if ('redirect' in authResult) {
    return authResult
  }

  if (!('props' in authResult)) {
    return authResult
  }
  const { user } = authResult.props as { user: UserPayload }
  if (user.role !== 'Administrator') {
    return {
      redirect: {
        destination: '/dashboard?unauthorized=true',
        permanent: false,
      },
    }
  }

  return { props: { user } }
}

export default function UsersPage({ user }: Props) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen]     = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedUser, setSelectedUser]           = useState<any>(null)
  const [userFormData, setUserFormData]           = useState({
    fullName: '',
    email: '',
    role: ''
  })

  const usersData = [
    {
      id: 1,
      user: { name: 'Pablo Ramos',  image: '/avatar1.jpg' },
      email: 'juanp.ramos@udea.edu.co',
      role: 'Administrador'
    },
    {
      id: 2,
      user: { name: 'Ana Granada', image: '/avatar2.jpg' },
      email: 'ana.granadal@udea.edu.co',
      role: 'Colaborador'
    },
    {
      id: 3,
      user: { name: 'Simon Correa', image: '/avatar3.jpg' },
      email: 'l.messi@udea.edu.co',
      role: 'Colaborador'
    },
    {
      id: 4,
      user: { name: 'Jesús Torres', image: '/avatar4.jpg' },
      email: 'jesus.torresq@udea.edu.co',
      role: 'Gestor'
    }
  ]

  const userColumns: Column[] = [
    { key: 'user',    label: 'Usuario', type: 'avatar' },
    { key: 'email',   label: 'Email',   type: 'text'   },
    {
      key: 'role',
      label: 'Rol',
      type: 'badge',
      badgeColors: {
        Administrador: 'bg-purple-100 text-purple-800',
        Gestor:        'bg-blue-100   text-blue-800',
        Colaborador:   'bg-gray-100   text-gray-800',
      }
    },
    { key: 'actions', label: 'Acciones', type: 'actions' }
  ]

  const handleEdit = (u: any) => {
    setSelectedUser(u)
    setUserFormData({
      fullName: u.user.name,
      email: u.email,
      role: u.role
    })
    setIsEditModalOpen(true)
  }

  const handleDelete = (u: any) => {
    setSelectedUser(u)
    setIsDeleteModalOpen(true)
  }

  const handleNewUser = () => {
    setUserFormData({ fullName: '', email: '', role: '' })
    setIsCreateModalOpen(true)
  }

  const handleCreateUser = () => {
    console.log('Crear usuario:', userFormData)
    setIsCreateModalOpen(false)
  }

  const handleUpdateUser = () => {
    console.log('Actualizar usuario:', userFormData)
    setIsEditModalOpen(false)
  }

  const handleConfirmDelete = () => {
    console.log('Eliminar usuario:', selectedUser)
    setIsDeleteModalOpen(false)
  }

  return (
    <Layout
      user={user}
      childrenTitle="Usuarios"
      childrenSubitle="Administra los usuarios y sus roles en el sistema"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Gestión de Usuarios
          </h2>
          <Button
            onClick={handleNewUser}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" /> Nuevo usuario
          </Button>
        </div>

        <Table
          columns={userColumns}
          data={usersData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Crear usuario"
        subtitle="Crea un nuevo usuario"
        primaryButtonText="Crear"
        onPrimaryAction={handleCreateUser}
      >
        <UserForm data={userFormData} onChange={setUserFormData} />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Editar usuario"
        subtitle="Actualiza la información del usuario existente."
        primaryButtonText="Actualizar"
        onPrimaryAction={handleUpdateUser}
      >
        <UserForm
          data={userFormData}
          onChange={setUserFormData}
          isEditing
        />
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={`¿Está seguro de eliminar al usuario "${selectedUser?.user?.name}"?`}
        subtitle="Esta acción no se puede deshacer. Se eliminará permanentemente este usuario y todos sus datos asociados."
        primaryButtonText="Continuar"
        secondaryButtonText="Cancelar"
        primaryButtonVariant="destructive"
        onPrimaryAction={handleConfirmDelete}
      >
        <div className="py-4">
          <p className="text-sm text-gray-600">
            Esta acción eliminará permanentemente al usuario y todos sus datos asociados.
          </p>
        </div>
      </Modal>
    </Layout>
  )
}
