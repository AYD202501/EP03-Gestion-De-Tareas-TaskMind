// Importación de componentes y dependencias necesarias
import Button from '@/components/Atoms/Button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/router'
import { useState } from 'react'

// Define el tipo que representa el resultado del intento de login
// Puede ser un error o un objeto con el rol del usuario y la ruta de redirección
type LoginResult =
  | { error: string }
  | { role: 'Admin' | 'ProjectManager' | 'Collaborator'; redirectTo: string }

// Componente principal del formulario de login
export default function LoginForm() {
  const router = useRouter() // Hook para redireccionar después del login
  const [errorMsg, setErrorMsg] = useState<string | null>(null) // Estado para mostrar errores
  const [loading, setLoading] = useState(false) // Estado para mostrar el botón en carga

  // Función que maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Evita el comportamiento por defecto del formulario
    setErrorMsg(null) // Limpia errores previos
    setLoading(true) // Activa el estado de carga

    const formData = new FormData(e.currentTarget)
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    }

    try {
      // Llamada al endpoint /api/login enviando las credenciales
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      })

      const result = (await res.json()) as LoginResult

      // Si el resultado contiene un error, se muestra al usuario
      if ('error' in result) {
        setErrorMsg(result.error)
      } else {
        // Si devuelve una ruta directa, redirige allí
        if (result.redirectTo) {
          router.push(result.redirectTo)
        } else {
          // Si no devuelve ruta, se redirige según el rol del usuario
          if (result.role === 'Admin') {
            router.push('/dashboard')
          } else if (result.role === 'ProjectManager') {
            router.push('/')
          } else {
            router.push('/')
          }
        }
      }
    } catch (err) {
      // Captura errores de red o del servidor
      console.error(err)
      setErrorMsg('Error de red o servidor.')
    } finally {
      setLoading(false) // Desactiva el estado de carga
    }
  }

  return (
    <div>
      {/* Tarjeta visual que contiene el formulario */}
      <Card className="overflow-hidden bg-white">
        <CardContent>
          {/* Formulario controlado */}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6 my-10 mx-5">
              {/* Encabezado del formulario */}
              <div className="flex flex-col items-center text-center gap-2">
                <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
                <p className="text-balance text-muted-foreground">
                  Ingresa tus credenciales para acceder a tu cuenta
                </p>
              </div>

              {/* Si hay error, se muestra el mensaje */}
              {errorMsg && (
                <div className="px-4 py-2 bg-red-100 text-red-700 rounded-md text-center">
                  {errorMsg}
                </div>
              )}

              {/* Campos del formulario */}
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="test@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" required />
                </div>
              </div>

              {/* Botón de envío */}
              <Button
                type="submit"
                className={`w-full ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={loading}
              >
                {loading ? 'Cargando...' : 'Iniciar Sesión'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
