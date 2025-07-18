import React, { useState } from 'react';
import Layout from '@/components/Organisms/Layout';
import Table, { Column } from '@/components/Molecules/Table';
import Modal from '@/components/Molecules/Modal';
import ProjectForm from '@/components/Molecules/ProjectForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { withAuth } from "@/lib/auth";

export const getServerSideProps = withAuth()


const projectsData = [
  {
    id: 1,
    name: "Desarrollo de App Móvil",
    manager: {
      name: "Pablo Ramos",
      image: "/avatar1.jpg"
    },
    status: "En Curso",
    dueDate: "15 de agosto, 2023",
    description: "Desarrollo de una aplicación móvil nativa para iOS y Android"
  },
  {
    id: 2,
    name: "Rediseño de la plataforma web",
    manager: {
      name: "Ana Granada",
      image: "/avatar2.jpg"
    },
    status: "Pendiente",
    dueDate: "30 de octubre, 2023",
    description: "Renovación completa de la plataforma web corporativa con enfoque en UX/UI y rendimiento."
  },
  {
    id: 3,
    name: "Implementación CRM",
    manager: {
      name: "Simon Correa",
      image: "/avatar3.jpg"
    },
    status: "En Curso",
    dueDate: "31 de julio, 2023",
    description: "Implementación de un sistema CRM para gestión de clientes"
  },
  {
    id: 4,
    name: "Optimización SEO",
    manager: {
      name: "Jesús Torres",
      image: "/avatar4.jpg"
    },
    status: "Completado",
    dueDate: "30 de mayo, 2023",
    description: "Optimización del SEO para mejorar el posicionamiento web"
  }
];

const projectColumns: Column[] = [
  {
    key: 'name',
    label: 'Proyecto',
    type: 'text'
  },
  {
    key: 'manager',
    label: 'Gestor Asignado',
    type: 'avatar'
  },
  {
    key: 'status',
    label: 'Estado',
    type: 'badge',
    badgeColors: {
      'En Curso': 'bg-blue-100 text-blue-800',
      'Pendiente': 'bg-yellow-100 text-yellow-800',
      'Completado': 'bg-green-100 text-green-800'
    }
  },
  {
    key: 'dueDate',
    label: 'Fecha Límite',
    type: 'text'
  },
  {
    key: 'actions',
    label: 'Acciones',
    type: 'actions'
  }
];
interface ProjectsPageProps {
  user: any;
}

export default function ProjectsPage({ user }: ProjectsPageProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [projectFormData, setProjectFormData] = useState({
    name: '',
    description: '',
    manager: ''
  });

  const handleEdit = (project: any) => {
    setSelectedProject(project);
    setProjectFormData({
      name: project.name,
      description: project.description || 'Descripción del proyecto',
      manager: project.manager.name
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (project: any) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
  };

  const handleNewProject = () => {
    setProjectFormData({
      name: '',
      description: '',
      manager: ''
    });
    setIsCreateModalOpen(true);
  };

  const handleCreateProject = () => {
    console.log('Crear proyecto:', projectFormData);
    setIsCreateModalOpen(false);
  };

  const handleUpdateProject = () => {
    console.log('Actualizar proyecto:', projectFormData);
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    console.log('Eliminar proyecto:', selectedProject);
    setIsDeleteModalOpen(false);
  };

  return (
    <Layout user={user} 
      childrenTitle="Proyectos" 
      childrenSubitle="Administra los proyectos y asigna gestores"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Gestión de Proyectos</h2>
          </div>
          <Button 
            onClick={handleNewProject}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nuevo proyecto
          </Button>
        </div>
        
        <Table
          columns={projectColumns}
          data={projectsData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Crear Proyecto"
        subtitle="Crear un nuevo proyecto"
        primaryButtonText="Crear"
        onPrimaryAction={handleCreateProject}
      >
        <ProjectForm
          data={projectFormData}
          onChange={setProjectFormData}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Editar Proyecto"
        subtitle="Actualiza la información del proyecto existente."
        primaryButtonText="Actualizar"
        onPrimaryAction={handleUpdateProject}
      >
        <ProjectForm
          data={projectFormData}
          onChange={setProjectFormData}
          isEditing={true}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={`¿Está seguro de eliminar el proyecto "${selectedProject?.name}"?`}
        subtitle="Esta acción no se puede deshacer. Se eliminará permanentemente este proyecto y todos sus datos asociados."
        primaryButtonText="Continuar"
        secondaryButtonText="Cancel"
        onPrimaryAction={handleConfirmDelete}
        primaryButtonVariant="destructive"
      >
        <div className="py-4">
          <p className="text-sm text-gray-600">
            Esta acción eliminará permanentemente el proyecto y todos sus datos asociados.
          </p>
        </div>
      </Modal>
    </Layout>
  );
} 