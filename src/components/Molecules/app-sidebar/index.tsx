// Importa componentes necesarios para el sidebar, íconos y tipos
import Image from 'next/image'
import type { ComponentType, SVGProps } from 'react'
import { Calendar, Home, Inbox, Search } from 'lucide-react'
import Link from 'next/link'

// Importa componentes UI personalizados para construir el sidebar
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { UserPayload, RoleKey } from '@/lib/auth'

/**
 * Define el menú de navegación según el rol del usuario.
 * Cada rol tiene acceso a diferentes secciones del sistema.
 */
const menuMap: Record<
  RoleKey,
  { title: string; url: string; icon: ComponentType<SVGProps<SVGSVGElement>> }[]
> = {
  Administrator: [
    { title: 'Inicio',    url: '/dashboard', icon: Home     },
    { title: 'Usuarios',  url: '/users',     icon: Inbox    },
    { title: 'Proyectos', url: '/projects',  icon: Calendar },
    { title: 'Tareas',    url: '/tasks',     icon: Search   },
  ],
  Project_Manager: [
    { title: 'Inicio',    url: '/dashboard', icon: Home     },
    { title: 'Proyectos', url: '/projects',  icon: Calendar },
    { title: 'Tareas',    url: '/tasks',     icon: Search   },
  ],
  Colaborator: [
    { title: 'Inicio', url: '/dashboard', icon: Home   },
    { title: 'Tareas', url: '/tasks',     icon: Search },
  ],
}

// Define las props que espera recibir el Sidebar
interface AppSidebarProps {
  user: UserPayload  // Datos del usuario actual
}

/**
 * Componente AppSidebar:
 * Molécula que renderiza el menú lateral izquierdo según el rol del usuario.
 * Incluye el logo, las opciones de navegación y un resumen del usuario en el pie.
 */
export function AppSidebar({ user }: AppSidebarProps) {
  // Selecciona el menú según el rol del usuario
  const menuItems = menuMap[user.role] ?? []

  // Genera las iniciales del usuario si no tiene avatar
  const initials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : user.email[0].toUpperCase()

  return (
    <Sidebar className="z-40 w-64">
      <SidebarContent>
        {/* Grupo superior: logo y menú */}
        <SidebarGroup className="flex items-center justify-center">
          {/* Muestra el logo de la aplicación */}
          <SidebarGroupLabel>
            <div className="mt-20">
              <Image
                src="/logo.png"
                alt="TaskMind Logo"
                width={120}
                height={120}
                className="mx-auto h-30"
              />
            </div>
          </SidebarGroupLabel>

          {/* Renderiza el menú dinámico */}
          <SidebarGroupContent className="mt-20">
            <SidebarMenu className="gap-2 w-full flex flex-col">
              {menuItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center px-4 py-2 rounded hover:bg-gray-100"
                    >
                      <item.icon className="h-5 w-5 mr-2" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Pie del sidebar con la información del usuario */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="pb-5 flex items-center space-x-2 px-4">
              {/* Muestra el avatar del usuario o sus iniciales */}
              <Avatar>
                {user.avatarUrl ? (
                  <AvatarImage
                    src={user.avatarUrl}
                    alt={user.name ?? user.email}
                  />
                ) : (
                  <AvatarFallback className="bg-gray-300">
                    {initials}
                  </AvatarFallback>
                )}
              </Avatar>
              {/* Nombre y correo del usuario */}
              <div className="text-sm leading-tight">
                <p>{user.name ?? user.email}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
