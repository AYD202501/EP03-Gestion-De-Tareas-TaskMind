// src/components/Molecules/UserForm.tsx

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
import { RoleKey } from '@/lib/auth'

export interface UserFormData {
  fullName: string
  email: string
  role: RoleKey | ''
  password: string
}

interface UserFormProps {
  data: UserFormData
  onChange: (data: UserFormData) => void
  /** Si es true muestra el campo de contraseña */
  includePassword?: boolean
}

const roleOptions: { value: UserFormData['role']; label: string }[] = [
  { value: 'Administrator',   label: 'Administrador' },
  { value: 'Project_Manager', label: 'Gestor de proyectos' },
  { value: 'Colaborator',     label: 'Colaborador' },
]

const UserForm: React.FC<UserFormProps> = ({
  data,
  onChange,
  includePassword = true,
}) => {
  const handleChange = (field: keyof UserFormData, value: string) => {
    onChange({ ...data, [field]: value } as UserFormData)
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fullName">Nombre completo</Label>
        <Input
          id="fullName"
          value={data.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          placeholder="Ingresa el nombre completo"
        />
      </div>

      <div>
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="Ingresa el correo electrónico"
        />
      </div>

      <div>
        <Label htmlFor="role">Rol</Label>
        <Select
          value={data.role}
          onValueChange={(value) => handleChange('role', value)}
        >
          <SelectTrigger id="role" className="cursor-pointer">
            <SelectValue placeholder="Selecciona un rol" />
          </SelectTrigger>
          <SelectContent>
            {roleOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="cursor-pointer">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {includePassword && (
        <div>
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder="Ingresa la contraseña"
          />
        </div>
      )}
    </div>
  )
}

export default UserForm
