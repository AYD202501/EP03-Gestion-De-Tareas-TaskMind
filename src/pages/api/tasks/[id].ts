// src/pages/api/tasks/[id].ts

import type { NextApiRequest, NextApiResponse } from 'next'
import type { Prisma } from '@prisma/client'
import prisma from '@/config/prisma'

/** Campos permitidos en el body de PUT */
interface UpdateTaskBody {
  title?:       string
  description?: string
  project?:     string    // projectId
  assignedTo?:  string    // assignedToId
  dueDate?:     string    // ISO / yyyy-MM-dd
  status?:      'Pending' | 'In_process' | 'Review' | 'Finished'
}

/** Tipo de respuesta: o error, o la tarea actualizada con assignedTo */
type Data =
  | { error: string }
  | Prisma.TaskGetPayload<{
      include: { assignedTo: { select: { name: true } } }
    }>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query as { id: string }

  try {
    // ─── PUT /api/tasks/[id] ───────────────────────────
    if (req.method === 'PUT') {
      const body = req.body as UpdateTaskBody

      const data: Prisma.TaskUpdateInput = {}

      if (body.title       !== undefined) data.title       = body.title
      if (body.description !== undefined) data.description = body.description
      if (body.status      !== undefined) data.status      = body.status
      if (body.dueDate     !== undefined) data.dueDate     = new Date(body.dueDate)

      if (body.project !== undefined) {
        data.project = body.project
          ? { connect:    { id: body.project } }
          : { disconnect: true }
      }

      if (body.assignedTo !== undefined) {
        data.assignedTo = body.assignedTo
          ? { connect:    { id: body.assignedTo } }
          : { disconnect: true }
      }

      const updated = await prisma.task.update({
        where: { id },
        data,
        include: {
          assignedTo: { select: { name: true } }
        }
      })

      return res.status(200).json(updated)
    }

    // ─── DELETE /api/tasks/[id] ────────────────────────
    if (req.method === 'DELETE') {
      await prisma.task.delete({ where: { id } })
      return res.status(204).end()
    }

    // ─── Métodos no permitidos ────────────────────────
    res.setHeader('Allow', ['PUT', 'DELETE'])
    return res
      .status(405)
      .json({ error: `Method ${req.method} Not Allowed` })
  } catch (unknownError) {
    const error = unknownError instanceof Error
      ? unknownError
      : new Error(String(unknownError))

    console.error('Error en /api/tasks/[id]:', error.message)
    return res.status(500).json({ error: 'Error interno del servidor.' })
  }
}
