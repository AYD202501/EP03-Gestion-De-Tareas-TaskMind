// Formulario para crear o editar tareas
import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface TaskFormData {
  title:      string
  description:string
  project:    string
  assignedTo: string
  dueDate:    string
}

/**
 * Props del TaskForm:
 * - data: valores actuales del formulario
 * - onChange: función para actualizar los datos
 */
interface TaskFormProps {
  data:      TaskFormData
  onChange:  (d: TaskFormData) => void
  projects:  { id: string; name: string }[]
  users:     { id: string; name: string }[]
}

/**
 * TaskForm:
 * Componente de formulario usado para ingresar o editar la información de una tarea.
 */
const TaskForm: React.FC<TaskFormProps> = ({
  data, onChange, projects, users
}) => {
  const change = (k: keyof TaskFormData, v: string) =>
    onChange({ ...data, [k]: v })

  return (
    <div className="space-y-4">

      {/* Campo: Título de la tarea */}
      <div>
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={data.title}
          onChange={e => change('title', e.target.value)}
          placeholder="Título de la tarea"
        />
      </div>

      {/* Campo: Descripción de la tarea */}
      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={e => change('description', e.target.value)}
          rows={3}
        />
      </div>

      {/* Campo: Selección del proyecto al que pertenece la tarea */}
      <div>
        <Label htmlFor="project">Proyecto</Label>
        <Select
          value={data.project}
          onValueChange={val => change('project', val)}
        >
          <SelectTrigger id="project">
            <SelectValue placeholder="Selecciona un proyecto" />
          </SelectTrigger>
          <SelectContent>
            {projects.map(p => (
              <SelectItem key={p.id} value={p.id}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Campo: Selección del responsable asignado */}
      <div>
        <Label htmlFor="assignedTo">Asignar a</Label>
        <Select
          value={data.assignedTo}
          onValueChange={val => change('assignedTo', val)}
        >
          <SelectTrigger id="assignedTo">
            <SelectValue placeholder="Selecciona un colaborador" />
          </SelectTrigger>
          <SelectContent>
            {users.map(u => (
              <SelectItem key={u.id} value={u.id}>
                {u.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Campo: Fecha límite de la tarea */}
      <div>
        <Label htmlFor="dueDate">Fecha límite</Label>
        <Input
          id="dueDate"
          type="date"
          value={data.dueDate}
          onChange={e => change('dueDate', e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="tags">Etiquetas</Label>
        <Select value={data.tags} onValueChange={(value) => handleChange('tags', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona etiquetas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Urgente">Urgente</SelectItem>
            <SelectItem value="Alta prioridad">Alta prioridad</SelectItem>
            <SelectItem value="Media prioridad">Media prioridad</SelectItem>
            <SelectItem value="Baja prioridad">Baja prioridad</SelectItem>
            <SelectItem value="Frontend">Frontend</SelectItem>
            <SelectItem value="Backend">Backend</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default TaskForm
