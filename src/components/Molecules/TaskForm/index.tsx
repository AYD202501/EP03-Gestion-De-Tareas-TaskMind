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
  title:      string
  description:string
  project:    string
  assignedTo: string
  dueDate:    string
}

interface TaskFormProps {
  data:      TaskFormData
  onChange:  (d: TaskFormData) => void
  projects:  { id: string; name: string }[]
  users:     { id: string; name: string }[]
}

const TaskForm: React.FC<TaskFormProps> = ({
  data, onChange, projects, users
}) => {
  const change = (k: keyof TaskFormData, v: string) =>
    onChange({ ...data, [k]: v })

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={data.title}
          onChange={e => change('title', e.target.value)}
          placeholder="Título de la tarea"
        />
      </div>
      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={e => change('description', e.target.value)}
          rows={3}
        />
      </div>
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
      <div>
        <Label htmlFor="dueDate">Fecha límite</Label>
        <Input
          id="dueDate"
          type="date"
          value={data.dueDate}
          onChange={e => change('dueDate', e.target.value)}
        />
      </div>
    </div>
  )
}

export default TaskForm
