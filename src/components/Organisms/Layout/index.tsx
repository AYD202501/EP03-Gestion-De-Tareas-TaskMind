import React, { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/Molecules/app-sidebar';
import { Header } from '@/components/Organisms/Header';
import { UserPayload } from '@/lib/auth';
import Head from 'next/head';

interface Props {
  user: UserPayload                   // Usuario autenticado (datos)
  children: ReactNode                 // Contenido interno a renderizar dentro del layout
  childrenTitle: string               // Título de la vista
  childrenSubitle: string             // Subtítulo de la vista
  pageTitle?: string                  // Título de la pagina
  pageIcon?: string                   // Icono de la página
}

const Layout = ({ user, children, childrenTitle, childrenSubitle, pageTitle, pageIcon = '/favicon.ico' }: Props) => {
  return (
    <div className="flex min-h-screen bg-background">
      
      {/* Proveedor del Sidebar para controlar su apertura/cierre */}
      <SidebarProvider>
        {/* Sidebar lateral izquierdo */}
        <AppSidebar user={user} />

        {/* Contenedor principal (derecho) */}
        <div className='flex flex-1 flex-col'>
          <Head>
            <title>{pageTitle ?? childrenTitle + ' - TaskMind'}</title>
            <link rel="icon" href={pageIcon} />
          </Head>
          <Header user={user} />

          {/* Área principal */}
          <main className="flex overflow-auto h-full">
            <div className="flex flex-col items-start h-full w-full justify-start">
              
              {/* Títulos de la vista */}
              <div className="w-full px-4 pt-6 pb-1 h-auto">
                <h1 className="text-xl md:text-2xl font-bold">{childrenTitle}</h1>
                <h1 className="text-md md:text-xl font-medium">{childrenSubitle}</h1>
              </div>

              {/* Separador visual */}
              <div className="bg-gray-200 h-0.5 w-full rounded-lg"></div>

              {/* Contenido dinámico de la vista */}
              <div className="flex w-full h-full justify-start items-start px-4">
                  {children}
              </div>
            </div>
          </main>
        </div>

      </SidebarProvider>
    </div>
  );
};

export default Layout;
