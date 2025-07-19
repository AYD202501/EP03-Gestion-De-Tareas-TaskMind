import React from 'react'
import TaskCard from '@/components/Molecules/TaskCard'

/** El tipo común para cada tarjeta del Kanban */
export type BoardTask = {
  id: string
  title: string
  description: string | null
  status: 'Pendiente' | 'En progreso' | 'En Revisión' | 'Completado'
  dueDate: string 
  assignedTo: string 
}

interface KanbanColumnProps {
  title: string
  status: BoardTask['status']
  tasks: BoardTask[]
  onStatusChange: (taskId: string, newStatus: BoardTask['status']) => void
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  status,
  tasks,
  onStatusChange
}) => {
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
      <div className="bg-gray-50 rounded-lg p-4 h-full">
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`} />
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <span className="ml-auto bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </div>
        <div className="space-y-3">
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default KanbanColumn
