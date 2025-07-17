import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "lucide-react"
import { SidebarTrigger } from '@/components/ui/sidebar';
import { signOut } from 'next-auth/react';

const items: Record<string, {title: string}> = {
  Administrator: {title: 'Panel de Administración'},
  Project_Manager: {title: 'Panel de Gestión'},
  Colaborator: {title: 'Panel de Colaborador'},
}

export function Header () {
  const role = 'Administrator'
  const titleItems = items[role]

  return (
    <header className="flex left-0 top justify-between p-4 border-b bg-gray-50 w-full shadow-lg z-10">
      <SidebarTrigger />
      <h1 className="text-lg font-bold">{titleItems.title}</h1>
      <DropdownMenu>
        <DropdownMenuTrigger ><User/></DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white shadow-lg z-40">
          <DropdownMenuLabel>NN</DropdownMenuLabel>
          <DropdownMenuLabel className="text-gray-600 -mt-3">{role}</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-300"/>
          <DropdownMenuItem className="hover:bg-gray-200 rounded-sm border-spacing-0">
            <button
              onClick={() => signOut({ callbackUrl: `${window.location.origin}/dashboard` })}
              className='w-full text-left'
            >Cerrar Sesión</button>
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
};
