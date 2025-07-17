import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Calendar, ChevronDown, MoreHorizontal } from 'lucide-react';

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string;
    status: string;
    dueDate: string;
    assignedTo: {
      name: string;
      initials: string;
      image?: string;
    };
  };
  onStatusChange: (taskId: string, newStatus: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusChange }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'En progreso':
        return 'bg-blue-100 text-blue-800';
      case 'En Revisión':
        return 'bg-purple-100 text-purple-800';
      case 'Completado':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusOptions = (currentStatus: string) => {
    const allStatuses = ['Pendiente', 'En progreso', 'En Revisión', 'Completado'];
    return allStatuses.filter(status => status !== currentStatus);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-3 hover:shadow-md transition-shadow">
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

      <Badge className={`${getStatusColor(task.status)} text-xs mb-3`}>
        {task.status}
      </Badge>

      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {task.description}
      </p>

      <div className="flex items-center gap-2 mb-3">
        <Calendar className="h-4 w-4 text-gray-400" />
        <span className="text-xs text-gray-500">{task.dueDate}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={task.assignedTo.image} />
            <AvatarFallback className="text-xs bg-gray-200">
              {task.assignedTo.initials}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-gray-600">{task.assignedTo.name}</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-7 text-xs">
              Mover a
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {getStatusOptions(task.status).map((status) => (
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
  );
};

export default TaskCard; 