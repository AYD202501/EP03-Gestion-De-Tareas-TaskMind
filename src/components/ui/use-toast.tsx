import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { X } from 'lucide-react'

// Definición del tipo de Toast
type Toast = {
  id: string
  title: string
  description?: string
}

type ToastContextType = {
  toast: (toast: { title: string; description?: string }) => void
}

// Contexto de Toast
const ToastContext = createContext<ToastContextType | undefined>(undefined)

// Provider que envuelve la app y muestra los Toasts
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback(({ title, description }: { title: string; description?: string }) => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, title, description }])
    // Auto-dismiss después de 5 segundos
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 5000)
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Contenedor de toasts */}
      <div className="fixed top-5 right-5 flex flex-col gap-2 z-50">
        {toasts.map(({ id, title, description }) => (
          <div
            key={id}
            className="max-w-xs w-full bg-white border rounded shadow-lg p-4 flex items-start justify-between"
          >
            <div>
              <p className="font-semibold">{title}</p>
              {description && <p className="text-sm text-gray-600">{description}</p>}
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== id))}
              aria-label="Cerrar toast"
            >
              <X className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// Hook para usar el toast
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast debe estar dentro de un ToastProvider')
  }
  return context
}
