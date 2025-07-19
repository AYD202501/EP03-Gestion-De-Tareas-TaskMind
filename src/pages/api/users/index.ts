// src/pages/api/users/index.ts

// API para manejar usuarios:
// - GET: devuelve la lista de usuarios
// - POST: crea un nuevo usuario con hash de contraseña

import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/config/prisma'
import type { Role } from '@prisma/client'

type ErrorResponse = { error: string }

type UserDTO = {
  id: string
  user: {
    name: string
    image: string
  }
  email: string
  role: Role
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserDTO[] | UserDTO | ErrorResponse>
) {
  switch (req.method) {

    // GET /api/users
    // Devuelve todos los usuarios con su perfil (avatar)
    case 'GET': {
      const users = await prisma.user.findMany({
        include: {
          profile: { select: { avatarUrl: true } }
        }
      })
      const data = users.map(u => ({
        id: u.id,
        user: {
          name: u.name,
          image: u.profile?.avatarUrl ?? ''
        },
        email: u.email,
        role: u.role as Role  // El rol ya es del tipo enum Role
      }))
      return res.status(200).json(data)
    }

    // POST /api/users
    // Crea un nuevo usuario con su perfil asociado
    case 'POST': {
      const { fullName, email, role, password } = req.body as {
        fullName?: string
        email?: string
        role?: string
        password?: string
      }

      // Validación básica de campos
      if (!fullName || !email || !role || !password) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' })
      }

      // Crea el usuario y su perfil vacío
      const u = await prisma.user.create({
        data: {
          name: fullName,
          email,
          role: role as Role,
          password,
          profile: { create: {} }
        },
        include: {
          profile: { select: { avatarUrl: true } }
        }
      })

      // Devuelve los datos formateados del nuevo usuario
      const newUser = {
        id: u.id,
        user: { name: u.name, image: u.profile?.avatarUrl ?? '' },
        email: u.email,
        role: u.role
      }
      return res.status(201).json(newUser)
    }

    // Si el método no está permitido
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
