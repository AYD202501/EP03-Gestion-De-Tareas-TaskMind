import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface UserFormData {
  fullName: string;
  email: string;
  role: string;
}

interface UserFormProps {
  data: UserFormData;
  onChange: (data: UserFormData) => void;
  isEditing?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ data, onChange, isEditing = false }) => {
  const handleChange = (field: keyof UserFormData, value: string) => {
    onChange({
      ...data,
      [field]: value
    });
  };

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
        <Select value={data.role} onValueChange={(value) => handleChange('role', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una opción" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Administrador">Administrador</SelectItem>
            <SelectItem value="Gestor de proyectos">Gestor de proyectos</SelectItem>
            <SelectItem value="Colaborador">Colaborador</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default UserForm; 