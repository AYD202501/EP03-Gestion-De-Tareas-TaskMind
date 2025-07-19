// Importación de React y componentes UI
import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Calendar, ChevronDown, MoreHorizontal } from 'lucide-react';
import type { BoardTask } from '@/components/Molecules/KanbanColumn'


/**
 * Props del TaskCard:
 * - task: Objeto con los detalles de la tarea.
 * - onStatusChange: Función que permite cambiar el estado de la tarea.
 */
interface TaskCardProps {
  task: BoardTask
  onStatusChange: (id: string, newStatus: BoardTask['status']) => void
  onEdit:   () => void
  onDelete: () => void
}

/**
 * TaskCard:
 * Componente que representa visualmente una tarea individual dentro del tablero Kanban.
 * Muestra título, descripción, estado, fecha límite y usuario asignado.
 * Permite cambiar el estado de la tarea mediante un menú desplegable.
 */
const TaskCard: React.FC<TaskCardProps> = ({
  task, onStatusChange, onEdit, onDelete
 }) => {
  // Devuelve los colores del badge según el estado de la tarea
  const getStatusColor = (s: BoardTask['status']) => {
    switch (s) {
      case 'Pendiente':   return 'bg-yellow-100 text-yellow-800'
      case 'En progreso': return 'bg-blue-100 text-blue-800'
      case 'En Revisión': return 'bg-purple-100 text-purple-800'
      case 'Completado':  return 'bg-green-100 text-green-800'
      default:            return 'bg-gray-100 text-gray-800'
    }
  }
  // Opciones de cambio de estado (excepto el estado actual)
  const options = ['Pendiente','En progreso','En Revisión','Completado']
    .filter(s => s !== task.status)

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-3 hover:shadow-md transition-shadow">
      {/* Parte superior: Título + Menú de acciones (Editar / Eliminar) */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-gray-900 text-sm">{task.title}</h3>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit} className='cursor-pointer'>Editar</DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-red-600 cursor-pointer">
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Badge que muestra el estado actual */}
      <Badge className={`${getStatusColor(task.status)} text-xs mb-3`}>
        {task.status}
      </Badge>

      {/* Descripción de la tarea */}
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {task.description}
      </p>

      {/* Fecha límite */}
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="h-4 w-4 text-gray-400" />
        <span>{task.dueDate}</span>
      </div>

      {/* Usuario asignado + Menú para mover la tarea a otro estado */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          {task.assignedTo}
        </span>

        {/* Menú desplegable: Mover a otro estado */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-7 text-xs cursor-pointer">
              Mover a <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {options.map(s => (
              <DropdownMenuItem
                key={s}
                onClick={() => onStatusChange(task.id, s as BoardTask['status'])}
                className="cursor-pointer"
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
