import React, { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/Molecules/app-sidebar';
import Header from '@/components/Organisms/Header';

interface Props {
  children: React.ReactNode
  childrenTitle: string
  childrenSubitle: string
}

const Index = ({ children, childrenTitle, childrenSubitle }: Props) => {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarProvider>
        <AppSidebar/>
        <div className='flex flex-1 flex-col'>
          <Header title='Panel Administrativo'/>
          <main className="flex overflow-auto h-full">
            <div className="flex flex-col items-center h-full w-full justify-start">
              <div className="w-full px-4 pt-6 pb-1 h-auto">
                <h1 className="text-xl md:text-2xl font-bold">{childrenTitle}</h1>
                <h1 className="text-md md:text-xl font-medium">{childrenSubitle}</h1>
              </div>
              <div className="bg-gray-200 h-0.5 w-full rounded-lg"></div>
              <div className="flex w-full h-full justify-center items-center p-4">
                  {children}
              </div>
            </div>
          </main>
        </div>

      </SidebarProvider>
    </div>
  );
};

export default Index;
