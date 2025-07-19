// src/pages/api/tasks/index.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import type { Prisma } from '@prisma/client'
import prisma from '@/config/prisma'

// Definimos el shape de la tarea con el usuario asignado
type TaskWithUser = Prisma.TaskGetPayload<{
  include: { assignedTo: { select: { id: true; name: true } } }
}>

// El body que esperamos al crear
interface CreateTaskBody {
  title: string
  description?: string
  project?: string       // projectId
  assignedTo?: string    // assignedToId
  dueDate?: string       // ISO date string
}

// Lo que puede devolver nuestra API
type Data =
  | { error: string }
  | TaskWithUser[]
  | TaskWithUser

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    // ─── GET: Listar ───────────────────────
    if (req.method === 'GET') {
      const tasks = await prisma.task.findMany({
        include: {
          assignedTo: { select: { id: true, name: true } }
        },
        orderBy: { dueDate: 'asc' }
      })
      return res.status(200).json(tasks)
    }

    // ─── POST: Crear ───────────────────────
    if (req.method === 'POST') {
      const body = req.body as CreateTaskBody

      const created = await prisma.task.create({
        data: {
          title:       body.title,
          description: body.description,
          project:     body.project    ? { connect: { id: body.project } } : undefined,
          assignedTo:  body.assignedTo ? { connect: { id: body.assignedTo } } : undefined,
          dueDate:     body.dueDate    ? new Date(body.dueDate)           : undefined,
        },
        include: {
          assignedTo: { select: { id: true, name: true } }
        }
      })

      return res.status(201).json(created)
    }

    // ─── Métodos no permitidos ────────────
    res.setHeader('Allow', ['GET', 'POST'])
    return res
      .status(405)
      .json({ error: `Method ${req.method} Not Allowed` })

  } catch (unknownError) {
    // Tipamos el error como unknown y luego lo convertimos a Error
    const error = unknownError instanceof Error
      ? unknownError
      : new Error(String(unknownError))

    console.error('Error en /api/tasks:', error.message)
    return res.status(500).json({ error: 'Error interno del servidor.' })
  }
}
