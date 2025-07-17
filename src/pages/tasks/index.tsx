import React, { useState } from 'react';
import Layout from '@/components/Organisms/Layout';
import KanbanColumn from '@/components/Molecules/KanbanColumn';
import Modal from '@/components/Molecules/Modal';
import TaskForm from '@/components/Molecules/TaskForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { withAuth } from "@/lib/auth";

export const getServerSideProps = withAuth()

const initialTasks = [
  {
    id: '1',
    title: 'Tarea ejemplo 1',
    description: 'Como usuario administrador quiero editar los usuarios de mi aplicación para poder gestionar el acceso al sistema.',
    status: 'Pendiente',
    dueDate: '25/05/2025',
    assignedTo: {
      name: 'Ana Granada',
      initials: 'AG',
      image: '/avatar2.jpg'
    }
  },
  {
    id: '2',
    title: 'Tarea ejemplo 2',
    description: 'Implementar funcionalidad de autenticación con JWT para mejorar la seguridad del sistema.',
    status: 'En progreso',
    dueDate: '30/05/2025',
    assignedTo: {
      name: 'Pablo Ramos',
      initials: 'PR',
      image: '/avatar1.jpg'
    }
  },
  {
    id: '3',
    title: 'Tarea ejemplo 3',
    description: 'Crear componentes reutilizables para el dashboard y optimizar el rendimiento de la aplicación.',
    status: 'En progreso',
    dueDate: '28/05/2025',
    assignedTo: {
      name: 'Simon Correa',
      initials: 'SC',
      image: '/avatar3.jpg'
    }
  },
  {
    id: '4',
    title: 'Tarea ejemplo 4',
    description: 'Realizar pruebas unitarias para los módulos de usuarios y proyectos.',
    status: 'En Revisión',
    dueDate: '27/05/2025',
    assignedTo: {
      name: 'Jesús Torres',
      initials: 'JT',
      image: '/avatar4.jpg'
    }
  },
  {
    id: '5',
    title: 'Tarea ejemplo 5',
    description: 'Configurar el sistema de notificaciones por email para alertas importantes.',
    status: 'Completado',
    dueDate: '20/05/2025',
    assignedTo: {
      name: 'Ana Granada',
      initials: 'AG',
      image: '/avatar2.jpg'
    }
  },
  {
    id: '6',
    title: 'Tarea ejemplo 6',
    description: 'Optimizar las consultas de base de datos para mejorar el tiempo de respuesta.',
    status: 'Completado',
    dueDate: '18/05/2025',
    assignedTo: {
      name: 'Simon Correa',
      initials: 'SC',
      image: '/avatar3.jpg'
    }
  }
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [taskFormData, setTaskFormData] = useState({
    title: '',
    description: '',
    project: '',
    assignedTo: '',
    dueDate: '',
    category: '',
    tags: ''
  });

  const handleStatusChange = (taskId: string, newStatus: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleNewTask = () => {
    setTaskFormData({
      title: '',
      description: '',
      project: '',
      assignedTo: '',
      dueDate: '',
      category: '',
      tags: ''
    });
    setIsCreateModalOpen(true);
  };

  const handleCreateTask = () => {
    const newTask = {
      id: Date.now().toString(),
      title: taskFormData.title,
      description: taskFormData.description,
      status: 'Pendiente',
      dueDate: taskFormData.dueDate,
      assignedTo: {
        name: taskFormData.assignedTo,
        initials: taskFormData.assignedTo.split(' ').map(n => n[0]).join(''),
        image: ''
      }
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    setIsCreateModalOpen(false);
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  const columns = [
    { title: 'Pendiente', status: 'Pendiente' },
    { title: 'En progreso', status: 'En progreso' },
    { title: 'En Revisión', status: 'En Revisión' },
    { title: 'Completado', status: 'Completado' }
  ];

  return (
    <Layout 
      childrenTitle="Tareas" 
      childrenSubitle="Vista general de todas las tareas del sistema"
    >
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Tablero de tareas</h2>
          </div>
          <Button 
            onClick={handleNewTask}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nueva tarea
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((column) => (
            <KanbanColumn
              key={column.status}
              title={column.title}
              status={column.status}
              tasks={getTasksByStatus(column.status)}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
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
          data={taskFormData}
          onChange={setTaskFormData}
        />
      </Modal>
    </Layout>
  );
} 