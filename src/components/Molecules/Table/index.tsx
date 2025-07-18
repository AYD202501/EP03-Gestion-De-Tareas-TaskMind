// Importa React y componentes UI necesarios
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from 'lucide-react'

/**
 * Column:
 * Define cómo debe renderizarse cada columna de la tabla.
 * - key: clave del dato en los objetos del arreglo.
 * - label: título visible de la columna.
 * - type: tipo de dato ('text', 'avatar', 'badge' o 'actions').
 * - badgeColors: (opcional) estilos según el valor del badge.
 */
export interface Column<T> {
  key: keyof T | 'actions'
  label: string
  type: 'text' | 'avatar' | 'badge' | 'actions'
  badgeColors?: {
    [key: string]: string
  }
}

/**
 * TableProps:
 * Define las propiedades del componente Table.
 * - columns: estructura de las columnas.
 * - data: lista de objetos que se mostrarán.
 * - onEdit, onDelete: funciones para manejar botones de acción.
 */
export interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
}

/**
 * Table:
 * Componente genérico para renderizar tablas dinámicas.
 * Admite texto, badges, avatares y botones de acciones.
 */
function Table<T>({
  columns,
  data,
  onEdit,
  onDelete,
}: TableProps<T>) {

  // Renderiza una celda según el tipo definido en la columna
  const renderCell = (item: T, column: Column<T>) => {

    // Si la columna es de acciones, renderiza botones
    if (column.key === 'actions') {
      return (
        <div className="flex items-center gap-2">
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(item)}
              className="h-8 w-8 p-0 cursor-pointer hover:bg-gray-100"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(item)}
              className="h-8 w-8 p-0 text-red-600 cursor-pointer hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      )
    }

    const value = item[column.key]

    // Renderiza según el tipo de la columna
    switch (column.type) {

      case 'avatar':
        const user = value as { name?: string; image?: string }
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.image} />
              <AvatarFallback className="bg-gray-200">
                {user.name?.split(' ').map((n) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">{user.name}</span>
          </div>
        )

      case 'badge':
        const val = value as string
        const color = column.badgeColors?.[val] || 'bg-gray-100 text-gray-800'
        return (
          <Badge className={color}>
            {val}
          </Badge>
        )

      case 'actions':
        return (
          <div className="flex items-center gap-2">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(item)}
                className="h-8 w-8 p-0"
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(item)}
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        )

      default:
        return <span>{String(value)}</span>
    }
  }

  return (
    <div className="rounded-md border">
      <table className="w-full">

        {/* Encabezados de la tabla */}
        <thead className="border-b bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="px-6 py-3 text-left text-sm font-medium text-gray-900"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* Filas de la tabla */}
        <tbody className="divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  className="px-6 py-4 text-sm text-gray-900"
                >
                  {renderCell(item, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}

// Exporta la tabla genérica
export default Table
