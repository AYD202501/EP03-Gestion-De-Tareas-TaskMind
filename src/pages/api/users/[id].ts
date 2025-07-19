// src/pages/api/users/[id].ts

// API para gestionar un usuario específico según su ID:
// - PUT: actualiza datos del usuario
// - DELETE: elimina al usuario

import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/config/prisma'
import { hash } from 'bcryptjs'
import type { Role } from '@prisma/client'

type ErrorResponse = { error: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<object | ErrorResponse>
) {
  const { id } = req.query

  // Validación del parámetro ID
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'ID inválido' })
  }

  switch (req.method) {
    // PUT /api/users/[id]
    // Actualiza los campos enviados (parciales) del usuario
    case 'PUT': {
      const { fullName, email, role, password } = req.body as {
        fullName?: string
        email?: string
        role?: string
        password?: string
      }

      // Se construye dinámicamente el objeto de actualización
      const data: Partial<{ name: string; email: string; role: Role; password: string }> = {}
      if (fullName) data.name = fullName
      if (email)    data.email = email
      if (role)     data.role = role as Role
      if (password) data.password = await hash(password, 10)

      await prisma.user.update({ where: { id }, data })
      return res.status(200).end()
    }

    // DELETE /api/users/[id]
    // Elimina completamente al usuario de la base de datos
    case 'DELETE': {
      await prisma.user.delete({ where: { id } })
      return res.status(204).end()
    }

    // Métodos no permitidos
    default:
      res.setHeader('Allow', ['PUT', 'DELETE'])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
