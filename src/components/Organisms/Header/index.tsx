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


interface Props {
  title: string
  userName?: string
}

const Index = ({ title }: Props) => (
  <header className="flex left-0 top justify-between p-4 border-b bg-gray-50 w-full shadow-lg z-10">
    <SidebarTrigger />
    <h1 className="text-lg font-bold">{title}</h1>
    <DropdownMenu>
      <DropdownMenuTrigger ><User/></DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white shadow-lg z-40">
        <DropdownMenuLabel>Ana Granada</DropdownMenuLabel>
        <DropdownMenuLabel className="text-gray-600 -mt-3">Administrador</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-300"/>
        <DropdownMenuItem className="hover:bg-gray-200 rounded-sm border-spacing-0">Cerrar Sesión</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </header>
);

export default Index;
