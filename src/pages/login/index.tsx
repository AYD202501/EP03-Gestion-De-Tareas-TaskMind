// src/pages/index.tsx (o src/pages/login.tsx si prefieres renombrar la ruta a /login)
import React from 'react'
import Login from '@/components/login/login-form'
import Image from 'next/image'

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="mb-10 text-center">
        <Image
          src="/logo.png"
          alt="TaskMind Logo"
          width={160}
          height={160}
          className="mx-auto h-40"
        />
        <h3 className="text-md text-gray-500">Sistema de Gestión de Tareas</h3>
      </div>
      <Login />
    </div>
  )
}

export default LoginPage
