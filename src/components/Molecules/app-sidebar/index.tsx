import { Calendar, ChevronUp, Home, Inbox, Search, Settings, User2 } from 'lucide-react';
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
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Menu items.
const items = {
  "admin": [
    {
        title: 'Inicio',
        url: '#dashboard',
        icon: Home,
      },
      {
        title: 'Usuarios',
        url: '#users',
        icon: Inbox,
      },
      {
        title: 'Proyectos',
        url: '#projects',
        icon: Calendar,
      },
      {
        title: 'Tareas',
        url: '#tasks',
        icon: Search,
      },
  ],
  "projectManager": [
    {
        title: 'Inicio',
        url: '#dashboard',
        icon: Home,
      },
      {
        title: 'Proyectos',
        url: '#projects',
        icon: Calendar,
      },
      {
        title: 'Tareas',
        url: '#tasks',
        icon: Search,
      },
  ],
  "collaborator": [
    {
        title: 'Inicio',
        url: '#dashboard',
        icon: Home,
      },
      {
        title: 'Tareas',
        url: '#tasks',
        icon: Search,
      },
  ]
};

export function AppSidebar() {
  return (
    <Sidebar className='z-40 w-64'>
      <SidebarContent>
        <SidebarGroup className='flex items-center justify-center'>
          <SidebarGroupLabel>
            <div className='mt-20'>
              <img src='/logo.png' 
              alt="TaskMind Logo"
              className="mx-auto h-30 " />
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className='mt-20'>
            <SidebarMenu className='gap-2 w-full flex items-center justify-center'>
              {items.admin.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className='gap-2 w-full flex justify-center'>
            <div className='pb-5 flex flex-row gap-2 items-center'>
              <Avatar>
                <AvatarFallback className='bg-gray-300'>AG</AvatarFallback>
              </Avatar>
              <div className='text-sm'>
                <p>Ana Maria Granada Rodas</p>
                <p>ana.granada1@udea.edu.co</p>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
