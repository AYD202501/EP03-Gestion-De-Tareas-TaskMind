import { Calendar, ChevronUp, Home, Inbox, Search, Settings, User2 } from 'lucide-react';
import Link from 'next/link';
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from 'next-auth/react';

const items = {
  "Administrator": [
    { title: 'Inicio', url: '/dashboard', icon: Home },
    { title: 'Usuarios', url: '/users', icon: Inbox },
    { title: 'Proyectos', url: '/projects', icon: Calendar },
    { title: 'Tareas', url: '/tasks', icon: Search },
  ],
  "Project_Manager": [
      { title: 'Inicio', url: '/dashboard', icon: Home },
      { title: 'Proyectos', url: '/projects', icon: Calendar },
      { title: 'Tareas', url: '/tasks', icon: Search },
  ],
  "Colaborator": [
      { title: 'Inicio', url: '/dashboard', icon: Home },
      { title: 'Tareas', url: '/tasks', icon: Search },
  ]
};

export function AppSidebar() {
  const { data: session } = useSession()
  const user = {
    name: "ANA GRANADA",
    email: "ana@gmail.com",
    image: undefined,
  }
  const menuItems = items['Administrator']


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
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
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
                {user?.image ? (
                  <AvatarImage src={user.image} alt="User avatar" />
                ) : (
                  <AvatarFallback className="bg-gray-300">NN</AvatarFallback>
                )}
              </Avatar>
              <div className='text-sm'>
                <p>{ user?.name ?? 'NN'}</p>
                <p>{ user?.email ?? 'test@test.com'}</p>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
