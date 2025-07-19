import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/config/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string }

  try {
    if (req.method === 'PUT') {
      const { title, description, project, assignedTo, dueDate } = req.body

      const updated = await prisma.task.update({
        where: { id },
        data: {
          title,
          description,
          project: project
            ? { connect: { id: project } }
            : { disconnect: true },
          assignedTo: assignedTo
            ? { connect: { id: assignedTo } }
            : { disconnect: true },
          dueDate: dueDate ? new Date(dueDate) : null,
        },
        include: {
          assignedTo: { select: { id: true, name: true } }
        }
      })
      return res.status(200).json(updated)
    }

    if (req.method === 'DELETE') {
      await prisma.task.delete({ where: { id } })
      return res.status(204).end()
    }

    res.setHeader('Allow', ['PUT','DELETE'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (error: any) {
    console.error(error)
    return res.status(500).json({ error: 'Error interno del servidor.' })
  }
}
