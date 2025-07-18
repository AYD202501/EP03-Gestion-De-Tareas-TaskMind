import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/config/prisma'

type ErrorResponse = { error: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{} | ErrorResponse>
) {
  const { id } = req.query
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'ID inválido' })
  }

  try {
    if (req.method === 'PUT') {
      // Actualizar proyecto
      const { name, description, assignedToId } = req.body as {
        name?: string
        description?: string
        assignedToId?: string
      }
      await prisma.project.update({
        where: { id },
        data: {
          ...(name          && { name }),
          ...(description   && { description }),
          ...(assignedToId  && {
            assignedTo: { connect: { id: assignedToId } }
          })
        }
      })
      return res.status(200).end()
    }

    if (req.method === 'DELETE') {
      // Eliminar proyecto
      await prisma.project.delete({ where: { id } })
      return res.status(204).end()
    }

    res.setHeader('Allow', ['PUT','DELETE'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}
