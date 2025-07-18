// src/pages/api/users/[id].ts

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
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'ID inválido' })
  }

  switch (req.method) {
    case 'PUT': {
      const { fullName, email, role, password } = req.body as {
        fullName?: string
        email?: string
        role?: string
        password?: string
      }
      const data: Partial<{ name: string; email: string; role: Role; password: string }> = {}
      if (fullName) data.name = fullName
      if (email)    data.email = email
      if (role)     data.role = role as Role
      if (password) data.password = await hash(password, 10)

      await prisma.user.update({ where: { id }, data })
      return res.status(200).end()
    }

    case 'DELETE': {
      await prisma.user.delete({ where: { id } })
      return res.status(204).end()
    }

    default:
      res.setHeader('Allow', ['PUT', 'DELETE'])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
