import React, { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/Molecules/app-sidebar';
import Header from '@/components/Organisms/Header';

const Index = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <main className='w-full'>
        <Header title='Panel Administrativo'/>

        {children}
      </main>
    </SidebarProvider>
  );
};

export default Index;
