// src/pages/index.tsx

// Página de inicio de sesión del sistema
// Muestra el logo y el formulario de login centrado en pantalla

import React from 'react'
import Login from '@/components/login/login-form'
import Image from 'next/image'

// Componente principal de la página de login
const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      {/* Logo y subtítulo */}
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

      {/* Formulario de inicio de sesión */}
      <Login />
    </div>
  )
}

export default LoginPage
