import React from 'react';
import Login from '@/components/login/login-form';
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  return {
    props: { },
  };
}
const Index = () => {
  return <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">

    <div className="mb-10 text-center">
        <img
          src="/logo.png"
          alt="TaskMind Logo"
          className="mx-auto h-40"
        />
        <h3 className="text-md text-gray-500">Sistema de Gestión de Tareas</h3>
      </div>
    <Login />
  </div>;
};

export default Index;