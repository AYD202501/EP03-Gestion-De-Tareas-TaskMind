import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/config/prisma'
import { serialize } from 'cookie'
import { signToken } from '@/lib/auth'

type LoginSuccess = {
  role: 'Administrator' | 'Project_Manager' | 'Colaborator'
  redirectTo: string
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

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Estas credenciales no coinciden con nuestros registros.' })
    }

    const token = signToken({
      id: user.id,
      name: null, // No se requiere nombre en el token
      avatarUrl: null, // No se requiere avatar en el token
      email: user.email,
      role: user.role
    })

    res.setHeader('Set-Cookie', serialize('auth_token', token, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7
    }))

    return res.status(200).json({
      role: user.role as 'Administrator' | 'Project_Manager' | 'Colaborator',
      redirectTo: '/dashboard'
    })
  } catch (err) {
    console.error('Login error:', err)
    return res.status(401).json({ error: 'Error interno del servidor.' })
  }
}
