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
  onStatusChange: (taskId: string, newStatus: BoardTask['status']) => void
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusChange }) => {
  const getStatusColor = (s: BoardTask['status']) => {
    switch (s) {
      case 'Pendiente':   return 'bg-yellow-100 text-yellow-800'
      case 'En progreso': return 'bg-blue-100 text-blue-800'
      case 'En Revisión': return 'bg-purple-100 text-purple-800'
      case 'Completado':  return 'bg-green-100 text-green-800'
      default:            return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusOptions = (current: BoardTask['status']) => {
    const all: BoardTask['status'][] = [
      'Pendiente',
      'En progreso',
      'En Revisión',
      'Completado'
    ]
    return all.filter(s => s !== current)
  }

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
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* status badge */}
      <Badge className={`${getStatusColor(task.status)} text-xs mb-3`}>
        {task.status}
      </Badge>

      {/* description */}
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {task.description}
      </p>

      {/* due date */}
      <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
        <Calendar className="h-4 w-4 text-gray-400" />
        <span>{task.dueDate}</span>
      </div>

      {/* assignedTo name only */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          {task.assignedTo}
        </span>

        {/* mover a… */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-7 text-xs">
              Mover a
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {getStatusOptions(task.status).map(status => (
              <DropdownMenuItem
                key={status}
                onClick={() => onStatusChange(task.id, status)}
              >
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default TaskCard
