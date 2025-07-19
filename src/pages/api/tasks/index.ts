// GET listar + POST crear
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/config/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const tasks = await prisma.task.findMany({
        include: {
          assignedTo: { select: { id: true, name: true } }
        },
        orderBy: { dueDate: 'asc' }
      })
      return res.status(200).json(tasks)
    }

    if (req.method === 'POST') {
      const { title, description, project, assignedTo, dueDate } = req.body

      const created = await prisma.task.create({
        data: {
          title,
          description,
          project: project
            ? { connect: { id: project } }
            : undefined,
          assignedTo: assignedTo
            ? { connect: { id: assignedTo } }
            : undefined,
          dueDate: dueDate ? new Date(dueDate) : undefined,
        },
        include: {
          assignedTo: { select: { id: true, name: true } }
        }
      })

      return res.status(201).json(created)
    }

    res.setHeader('Allow', ['GET','POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (error: any) {
    console.error(error)
    return res.status(500).json({ error: 'Error interno del servidor.' })
  }
}
