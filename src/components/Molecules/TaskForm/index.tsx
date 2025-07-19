// src/components/Molecules/TaskForm.tsx
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
} from '@/components/ui/select'

export interface TaskFormData {
  title: string
  description: string
  project: string      // ahora guarda project.id
  assignedTo: string   // guarda user.id
  dueDate: string
  category: string
  tags: string
}

interface TaskFormProps {
  data: TaskFormData
  onChange: (data: TaskFormData) => void
  projects: { id: string; name: string }[]
  users:    { id: string; name: string }[]
}

const TaskForm: React.FC<TaskFormProps> = ({
  data,
  onChange,
  projects,
  users
}) => {
  const handleChange = (field: keyof TaskFormData, value: string) =>
    onChange({ ...data, [field]: value })

  return (
    <div className="space-y-4">
      {/* título */}
      <div>
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={data.title}
          onChange={e => handleChange('title', e.target.value)}
          placeholder="Título de la tarea"
        />
      </div>

      {/* descripción */}
      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={e => handleChange('description', e.target.value)}
          placeholder="Describe la tarea"
          rows={3}
        />
      </div>

      {/* proyecto */}
      <div>
        <Label htmlFor="project">Proyecto</Label>
        <Select
          value={data.project}
          onValueChange={val => handleChange('project', val)}
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

      {/* asignar a */}
      <div>
        <Label htmlFor="assignedTo">Asignar a</Label>
        <Select
          value={data.assignedTo}
          onValueChange={val => handleChange('assignedTo', val)}
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

      {/* fecha límite */}
      <div>
        <Label htmlFor="dueDate">Fecha límite</Label>
        <Input
          id="dueDate"
          type="date"
          value={data.dueDate}
          onChange={e => handleChange('dueDate', e.target.value)}
        />
      </div>

      {/* categoría */}
      <div>
        <Label htmlFor="category">Categoría</Label>
        <Select
          value={data.category}
          onValueChange={val => handleChange('category', val)}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Selecciona categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Desarrollo">Desarrollo</SelectItem>
            <SelectItem value="Diseño">Diseño</SelectItem>
            <SelectItem value="Testing">Testing</SelectItem>
            <SelectItem value="Documentación">Documentación</SelectItem>
            <SelectItem value="Bug Fix">Bug Fix</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* etiquetas */}
      <div>
        <Label htmlFor="tags">Etiquetas</Label>
        <Select
          value={data.tags}
          onValueChange={val => handleChange('tags', val)}
        >
          <SelectTrigger id="tags">
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
