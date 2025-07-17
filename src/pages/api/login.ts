// src/pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/config/prisma'
import type { Enum_RoleName } from '@prisma/client'

type LoginSuccess = {
  role: 'ADMIN' | 'PROJECT_MANAGER' | 'COLLABORATOR'
  redirectTo: string    // <-- ruta que rellenarás cuando crees las páginas
}
type LoginError = { error: string }
type LoginResponse = LoginSuccess | LoginError

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res
      .status(405)
      .json({ error: `Method ${req.method} Not Allowed` })
  }

  const { data } = req.body
  const email = data?.email as string | undefined
  const password = data?.password as string | undefined

  if (!email) {
    return res.status(400).json({ error: 'El correo es requerido.' })
  }
  if (!password) {
    return res.status(400).json({ error: 'La contraseña es requerida.' })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        role: true
      }
    })

    if (!user) {
      return res.status(404).json({ error: 'Usuario no existe.' })
    }

    // Para producción, usa bcrypt.compare() tras hashear la contraseña en BD
    if (user.password !== password) {
      return res.status(401).json({ error: 'Contraseña incorrecta.' })
    }

    return res.status(200).json({
      role: user.role as Enum_RoleName,
      redirectTo: '/'
    })
  } catch (err) {
    console.error('Login error:', err)
    return res.status(500).json({ error: 'Error interno del servidor.' })
  }
}
