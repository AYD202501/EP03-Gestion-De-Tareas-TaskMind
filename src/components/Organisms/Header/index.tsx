import { useRouter } from 'next/router'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { User as UserIcon } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import type { UserPayload, RoleKey } from '@/lib/auth'

// Define los títulos según el rol del usuario (Administrador, Gestor, Colaborador)
const items: Record<RoleKey, { title: string }> = {
  Administrator:   { title: 'Panel de Administración' },
  Project_Manager: { title: 'Panel del Gestor'    },
  Colaborator:     { title: 'Panel de Colaborador' },
}

// Define el tipo de props que recibe el Header
interface HeaderProps {
  user: UserPayload  // Datos del usuario autenticado
}

export function Header({ user }: HeaderProps) {
  const { role, name, email } = user         // Extrae datos relevantes del usuario
  const router = useRouter()                 // Hook de Next.js para navegación
  const { toast } = useToast()               // Hook personalizado para mostrar toasts
  const titleItem = items[role] ?? { title: '' }    // Determina el título según el rol
  const displayName = name ?? email                 // Muestra nombre o email

  // Función para cerrar sesión
  async function handleSignOut() {
    await fetch('/api/logout.ts', { method: 'POST' })   // Llama a la API de logout
    toast({
      title: 'Sesión cerrada',
      description: 'Debes iniciar sesión de nuevo',
    })                                                  // Muestra notificación
    router.replace('/login')                             // Redirige al login
  }

  return (
    <header className="flex items-center justify-between p-4 border-b bg-gray-50 w-full shadow-lg z-10">
      {/* Botón lateral para desplegar el sidebar */}
      <SidebarTrigger className="cursor-pointer" />

      {/* Título del header según el rol */}
      <h1 className="text-lg font-bold">{titleItem.title}</h1>

      {/* Menú desplegable de usuario */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            title="Usuario"
            aria-label="Usuario"
            className="cursor-pointer"
          >
            <UserIcon className="cursor-pointer" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-white shadow-lg z-40">
          {/* Nombre del usuario */}
          <DropdownMenuLabel>{displayName}</DropdownMenuLabel>
          <DropdownMenuLabel className="text-gray-600 -mt-3">
            {role}   {/* Rol del usuario */}
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="bg-gray-300" />

          {/* Opción para cerrar sesión */}
          <DropdownMenuItem className="hover:bg-gray-200 rounded-sm cursor-pointer">
            <button
              onClick={handleSignOut}
              className="w-full text-left cursor-pointer"
            >
              Cerrar Sesión
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
