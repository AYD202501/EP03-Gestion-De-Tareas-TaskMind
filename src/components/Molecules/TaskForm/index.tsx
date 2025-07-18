// Formulario para crear o editar tareas

import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

/** 
 * Estructura de los datos que maneja el formulario 
 */
interface TaskFormData {
  title: string
  description: string
  project: string
  assignedTo: string
  dueDate: string
  category: string
  tags: string
}

/**
 * Props del TaskForm:
 * - data: valores actuales del formulario
 * - onChange: función para actualizar los datos
 */
interface TaskFormProps {
  data: TaskFormData
  onChange: (data: TaskFormData) => void
}

/**
 * TaskForm:
 * Componente de formulario usado para ingresar o editar la información de una tarea.
 */
const TaskForm: React.FC<TaskFormProps> = ({ data, onChange }) => {

  // Función auxiliar para actualizar un campo del formulario
  const handleChange = (field: keyof TaskFormData, value: string) => {
    onChange({
      ...data,
      [field]: value
    })
  }

  return (
    <div className="space-y-4">

      {/* Campo: Título de la tarea */}
      <div>
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={data.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Título de la tarea"
        />
      </div>

      {/* Campo: Descripción de la tarea */}
      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Describe la tarea en detalle"
          rows={3}
        />
      </div>

      {/* Campo: Selección del proyecto al que pertenece la tarea */}
      <div>
        <Label htmlFor="project">Proyecto</Label>
        <Select value={data.project} onValueChange={(value) => handleChange('project', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un proyecto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Desarrollo de App Móvil">Desarrollo de App Móvil</SelectItem>
            <SelectItem value="Rediseño de la plataforma web">Rediseño de la plataforma web</SelectItem>
            <SelectItem value="Implementación CRM">Implementación CRM</SelectItem>
            <SelectItem value="Optimización SEO">Optimización SEO</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Campo: Selección del responsable asignado */}
      <div>
        <Label htmlFor="assignedTo">Asignar a</Label>
        <Select value={data.assignedTo} onValueChange={(value) => handleChange('assignedTo', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un colaborador" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Ana Granada">Ana Granada</SelectItem>
            <SelectItem value="Pablo Ramos">Pablo Ramos</SelectItem>
            <SelectItem value="Simon Correa">Simon Correa</SelectItem>
            <SelectItem value="Jesús Torres">Jesús Torres</SelectItem>
            <SelectItem value="María López">María López</SelectItem>
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
          onChange={(e) => handleChange('dueDate', e.target.value)}
        />
      </div>

      {/* Campo: Categoría de la tarea */}
      <div>
        <Label htmlFor="category">Categoría</Label>
        <Select value={data.category} onValueChange={(value) => handleChange('category', value)}>
          <SelectTrigger>
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

      {/* Campo: Etiquetas (tags) de la tarea */}
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
