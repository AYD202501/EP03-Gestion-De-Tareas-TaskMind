// Importa React y el componente TaskCard
import React from 'react';
import TaskCard from '@/components/Molecules/TaskCard';

// Define el tipo Task que representa una tarea individual
export type BoardTask = {
  id: string
  title: string
  description: string | null
  status: 'Pendiente' | 'En progreso' | 'En Revisión' | 'Completado'
  dueDate: string
  assignedTo: string
  projectId: string
}

// Define las props esperadas por el componente KanbanColumn
interface KanbanColumnProps {
  title: string // Título de la columna (ej. "Pendiente")
  status: BoardTask['status'] // Estado representado por la columna
  tasks: BoardTask[] // Lista de tareas mostradas en la columna
  onStatusChange: (taskId: string, newStatus: BoardTask['status']) => void // Función para cambiar el estado de una tarea
  onEdit:   (task: BoardTask) => void
  onDelete: (taskId: string) => void
}

/**
 * KanbanColumn:
 * Molécula que representa una columna del tablero Kanban.
 * Muestra tareas filtradas por estado dentro de una tarjeta visual.
 */
const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title, status, tasks,
  onStatusChange, onEdit, onDelete
}) => {
  // Función para obtener el color asociado al estado de la columna
  const getStatusColor = (s: BoardTask['status']) => {
    switch (s) {
      case 'Pendiente':   return 'bg-yellow-500'
      case 'En progreso': return 'bg-blue-500'
      case 'En Revisión': return 'bg-purple-500'
      case 'Completado':  return 'bg-green-500'
      default:            return 'bg-gray-500'
    }
  }

  return (
    <div className="flex-1 min-w-0">
      {/* Contenedor visual de la columna */}
      <div className="bg-gray-50 rounded-lg p-4 h-full">
        
        {/* Encabezado de la columna */}
        <div className="flex items-center gap-2 mb-4">
          {/* Indicador de color según el estado */}
          <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}/>
          {/* Título de la columna */}
          <h3 className="font-semibold text-gray-900">{title}</h3>
          
          {/* Cantidad de tareas en la columna */}
          <span className="ml-auto bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </div>

        {/* Renderiza cada tarea como una TaskCard */}
        <div className="space-y-3">
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              onEdit={() => onEdit(task)}
              onDelete={() => onDelete(task.id)}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

// Exporta el componente para ser utilizado en el tablero Kanban
export default KanbanColumn; 