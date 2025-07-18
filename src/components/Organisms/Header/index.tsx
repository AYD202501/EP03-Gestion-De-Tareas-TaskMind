// src/components/Organisms/Header/index.tsx

import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
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

const items: Record<RoleKey, { title: string }> = {
  Administrator:   { title: 'Panel de Administración' },
  Project_Manager: { title: 'Panel del Gestor'    },
  Colaborator:     { title: 'Panel de Colaborador' },
}

interface HeaderProps {
  user: UserPayload
}

export function Header({ user }: HeaderProps) {
  const { role, name, email } = user
  const router = useRouter()
  const { toast } = useToast()
  const titleItem = items[role] ?? { title: '' }
  const displayName = name ?? email

  async function handleSignOut() {
    await fetch('/api/logout.ts', { method: 'POST' })
    toast({
      title: 'Sesión cerrada',
      description: 'Debes iniciar sesión de nuevo',
    })
    router.replace('/login')
  }

  return (
    <header className="flex items-center justify-between p-4 border-b bg-gray-50 w-full shadow-lg z-10">
      <SidebarTrigger className="cursor-pointer" />
      <h1 className="text-lg font-bold">{titleItem.title}</h1>
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
          <DropdownMenuLabel>{displayName}</DropdownMenuLabel>
          <DropdownMenuLabel className="text-gray-600 -mt-3">
            {role}
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="bg-gray-300" />

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
