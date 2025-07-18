import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProjectFormData {
  name: string;
  description: string;
  manager: string;
}

interface ProjectFormProps {
  data: ProjectFormData;
  onChange: (data: ProjectFormData) => void;
  //isEditing?: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ data, onChange }) => { //, isEditing = false 
  const handleChange = (field: keyof ProjectFormData, value: string) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Nombre del Proyecto</Label>
        <Input
          id="name"
          value={data.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Ingresa el nombre del proyecto"
        />
      </div>
      
      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Ingresa la descripción del proyecto"
          rows={3}
        />
      </div>
      
      <div>
        <Label htmlFor="manager">Gestor asignado</Label>
        <Select value={data.manager} onValueChange={(value) => handleChange('manager', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un gestor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="María López">María López</SelectItem>
            <SelectItem value="Pablo Ramos">Pablo Ramos</SelectItem>
            <SelectItem value="Ana Granada">Ana Granada</SelectItem>
            <SelectItem value="Simon Correa">Simon Correa</SelectItem>
            <SelectItem value="Jesús Torres">Jesús Torres</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProjectForm; 