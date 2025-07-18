// Importa React y componentes de la interfaz de usuario
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

/** 
 * ProjectFormData:
 * Estructura de los datos que maneja el formulario.
 */
export interface ProjectFormData {
  name: string            // Nombre del proyecto
  description: string     // Breve descripción del proyecto
  assignedToId: string    // ID del usuario responsable del proyecto
}

// Define las props que recibe el formulario de proyecto
interface ProjectFormProps {
  data: ProjectFormData                         // Datos actuales del formulario
  onChange: (data: ProjectFormData) => void     // Función para actualizar el estado del formulario
  users?: UserPayload[]                         // Lista de usuarios para asignar (opcional)
}

/**
 * ProjectForm:
 * Componente de formulario para crear o editar un proyecto.
 * Permite ingresar nombre, descripción y seleccionar un usuario responsable.
 */
export default function ProjectForm({
  data,
  onChange,
  users = [],
}: ProjectFormProps) {

  // Actualiza el campo correspondiente cuando cambia su valor
  const handleChange = (field: keyof ProjectFormData, value: string) =>
    onChange({ ...data, [field]: value })

  return (
    <div className="space-y-4">

      {/* Campo: Nombre del proyecto */}
      <div>
        <Label htmlFor="name">Nombre del proyecto</Label>
        <Input
          id="name"
          value={data.name}
          onChange={e => handleChange('name', e.target.value)}
          placeholder="Título del proyecto"
        />
      </div>

      {/* Campo: Descripción del proyecto */}
      <div>
        <Label htmlFor="description">Descripción</Label>
        <Input
          id="description"
          value={data.description}
          onChange={e => handleChange('description', e.target.value)}
          placeholder="Descripción breve"
        />
      </div>

      {/* Campo: Selección del usuario responsable */}
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
