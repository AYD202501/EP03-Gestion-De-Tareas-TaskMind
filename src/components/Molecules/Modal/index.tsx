// Importa React y componentes UI necesarios para el modal
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

// Define las propiedades que espera recibir el Modal
interface ModalProps {
  isOpen: boolean                // Controla si el modal está abierto o cerrado
  onClose: () => void            // Función para cerrar el modal
  title: string                  // Título principal del modal
  subtitle: string               // Subtítulo o texto complementario
  children: React.ReactNode      // Contenido dinámico dentro del modal
  primaryButtonText: string      // Texto del botón de acción principal
  secondaryButtonText?: string   // Texto del botón secundario (opcional)
  onPrimaryAction: () => void    // Función al presionar el botón principal
  onSecondaryAction?: () => void // Función opcional para el botón secundario
  primaryButtonVariant?: 'default' | 'destructive' // Estilo del botón principal
}

/**
 * Modal:
 * Componente tipo modal reutilizable con título, subtítulo, botones y contenido dinámico.
 */
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  primaryButtonText,
  secondaryButtonText = 'Cancelar',
  onPrimaryAction,
  onSecondaryAction,
  primaryButtonVariant = 'default'
}) => {

  // Maneja la acción del botón secundario (usar función o simplemente cerrar)
  const handleSecondaryAction = () => {
    if (onSecondaryAction) {
      onSecondaryAction()
    } else {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        
        {/* Encabezado del modal */}
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
          <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
        </DialogHeader>
        
        {/* Contenido dinámico dentro del modal */}
        <div className="py-4">
          {children}
        </div>
        
        {/* Botones de acción */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handleSecondaryAction}
            className="text-gray-700 cursor-pointer"
          >
            {secondaryButtonText}
          </Button>

          <Button
            variant={primaryButtonVariant}
            onClick={onPrimaryAction}
            className={`text-white cursor-pointer ${primaryButtonVariant === 'default' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
          >
            {primaryButtonText}
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  )
}

// Exporta el modal para su uso en otras partes del proyecto
export default Modal
