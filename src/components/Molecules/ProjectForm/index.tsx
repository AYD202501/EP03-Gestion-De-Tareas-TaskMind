import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { UserPayload } from '@/lib/auth'

/** Forma de datos que maneja el formulario de Proyecto */
export interface ProjectFormData {
  name: string
  description: string
  assignedToId: string
}

interface ProjectFormProps {
  data: ProjectFormData
  onChange: (data: ProjectFormData) => void
  /** Lista de usuarios para asignar */
  users?: UserPayload[]
}

export default function ProjectForm({
  data,
  onChange,
  users = [],
}: ProjectFormProps) {
  const handleChange = (field: keyof ProjectFormData, value: string) =>
    onChange({ ...data, [field]: value })

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Nombre del proyecto</Label>
        <Input
          id="name"
          value={data.name}
          onChange={e => handleChange('name', e.target.value)}
          placeholder="Título del proyecto"
        />
      </div>

      <div>
        <Label htmlFor="description">Descripción</Label>
        <Input
          id="description"
          value={data.description}
          onChange={e => handleChange('description', e.target.value)}
          placeholder="Descripción breve"
        />
      </div>

      <div>
        <Label htmlFor="assignedToId">Responsable</Label>
        <Select
          value={data.assignedToId}
          onValueChange={val => handleChange('assignedToId', val)}
        >
          <SelectTrigger id="assignedToId" className="cursor-pointer">
            <SelectValue placeholder="Selecciona un usuario" />
          </SelectTrigger>
          <SelectContent>
            {users.map(u => (
              <SelectItem key={u.id} value={u.id} className="cursor-pointer">
                {u.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
