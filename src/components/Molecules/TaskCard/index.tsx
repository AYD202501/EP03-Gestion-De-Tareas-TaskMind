// src/components/Molecules/TaskCard.tsx

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Calendar, ChevronDown, MoreHorizontal } from 'lucide-react'
import type { BoardTask } from '@/components/Molecules/KanbanColumn'

interface TaskCardProps {
  task: BoardTask
  onStatusChange: (id: string, newStatus: BoardTask['status']) => void
  onEdit:   () => void
  onDelete: () => void
}

const TaskCard: React.FC<TaskCardProps> = ({
  task, onStatusChange, onEdit, onDelete
}) => {
  const getStatusColor = (s: BoardTask['status']) => {
    switch (s) {
      case 'Pendiente':   return 'bg-yellow-100 text-yellow-800'
      case 'En progreso': return 'bg-blue-100 text-blue-800'
      case 'En Revisión': return 'bg-purple-100 text-purple-800'
      case 'Completado':  return 'bg-green-100 text-green-800'
      default:            return 'bg-gray-100 text-gray-800'
    }
  }

  const options = ['Pendiente','En progreso','En Revisión','Completado']
    .filter(s => s !== task.status)

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-3 hover:shadow-md transition-shadow">
      {/* header */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-gray-900 text-sm">{task.title}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>Editar</DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-red-600">
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* badge estado */}
      <Badge className={`${getStatusColor(task.status)} text-xs mb-3`}>
        {task.status}
      </Badge>

      {/* descripción */}
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {task.description}
      </p>

      {/* fecha límite */}
      <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
        <Calendar className="h-4 w-4 text-gray-400" />
        <span>{task.dueDate}</span>
      </div>

      {/* assignedTo y mover a… */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          {task.assignedTo}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-7 text-xs">
              Mover a <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {options.map(s => (
              <DropdownMenuItem
                key={s}
                onClick={() => onStatusChange(task.id, s as BoardTask['status'])}
              >
                {s}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default TaskCard
