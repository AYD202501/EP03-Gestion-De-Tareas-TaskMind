import React from 'react'
// Importa tipos necesarios para botones y manejo de props en React
import type { ButtonHTMLAttributes, ReactNode } from 'react'
// Importa función y tipos para manejar variantes de clases CSS
import { cva, type VariantProps } from 'class-variance-authority'
// Importa función utilitaria para concatenar clases
import { cn } from '@/lib/utils'

// Define las variantes de estilo del botón (color, tamaño, estados)
const buttonVariants = cva(
  // Clases base aplicadas siempre a todos los botones
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      // Variantes de diseño visual del botón (color, fondo, hover)
      variant: {
        default: 'bg-primary text-white hover:bg-primary-hover',
        secondary: 'bg-teal-100 text-teal-900 hover:bg-teal-200',
        outline: 'border border-teal-600 text-teal-600 hover:bg-teal-50',
        ghost: 'hover:bg-teal-50 text-teal-600',
        destructive: 'bg-red-500 text-white hover:bg-red-600',
        success: 'bg-green-500 text-white hover:bg-green-600',
      },
      // Variantes de tamaño del botón
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-8 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
      },
    },
    // Valores por defecto de las variantes
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

// Define el tipo de propiedades aceptadas por el botón (HTML + variantes)
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children: ReactNode  // Contenido interno del botón
}

// Componente funcional Button
const Button = ({ className, variant, size, children, ...props }: ButtonProps) => {
  return (
    <button 
      // Aplica las clases según las variantes elegidas y las adicionales (className)
      className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {children}
    </button>
  )
}

export default Button  // Exporta el componente para usarlo en otras partes del proyecto
