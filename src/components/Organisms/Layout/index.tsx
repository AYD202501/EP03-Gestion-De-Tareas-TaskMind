import React, { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/Molecules/app-sidebar';
import { Header } from '@/components/Organisms/Header';
import { UserPayload } from '@/lib/auth';
import Head from 'next/head';

interface Props {
  user: UserPayload
  children: ReactNode
  childrenTitle: string
  childrenSubitle: string
  pageTitle?: string
  pageIcon?: string
}

const Layout = ({ user, children, childrenTitle, childrenSubitle, pageTitle, pageIcon = '/favicon.ico' }: Props) => {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarProvider>
        <AppSidebar user={user} />
        <div className='flex flex-1 flex-col'>
          <Head>
            <title>{pageTitle ?? childrenTitle + ' - TaskMind'}</title>
            <link rel="icon" href={pageIcon} />
          </Head>
          <Header user={user} />
          <main className="flex overflow-auto h-full">
            <div className="flex flex-col items-start h-full w-full justify-start">
              <div className="w-full px-4 pt-6 pb-1 h-auto">
                <h1 className="text-xl md:text-2xl font-bold">{childrenTitle}</h1>
                <h1 className="text-md md:text-xl font-medium">{childrenSubitle}</h1>
              </div>
              <div className="bg-gray-200 h-0.5 w-full rounded-lg"></div>
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
