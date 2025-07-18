// src/pages/api/users/index.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/config/prisma'
import { hash } from 'bcryptjs'
import type { Role } from '@prisma/client'

type ErrorResponse = { error: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | ErrorResponse>
) {
  switch (req.method) {
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
        role: u.role as Role   // ya es un enum Role
      }))
      return res.status(200).json(data)
    }

    case 'POST': {
      const { fullName, email, role, password } = req.body as {
        fullName?: string
        email?: string
        role?: string
        password?: string
      }
      if (!fullName || !email || !role || !password) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' })
      }
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
      const newUser = {
        id: u.id,
        user: { name: u.name, image: u.profile?.avatarUrl ?? '' },
        email: u.email,
        role: u.role
      }
      return res.status(201).json(newUser)
    }

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
