import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/config/prisma'

type ProjectResponse = {
  id:          string
  name:        string
  description: string | null
  assignedTo:  { name: string; image: string | null }
  createdAt:   string
  updatedAt:   string
}
type ErrorResponse = { error: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProjectResponse[] | ProjectResponse | ErrorResponse>
) {
  try {
    if (req.method === 'GET') {
      // Listar proyectos
      const projs = await prisma.project.findMany({
        include: {
          assignedTo: {
            select: {
              name: true,
              profile: { select: { avatarUrl: true } }
            }
          }
        }
      })
      const data = projs.map(p => ({
        id:          p.id,
        name:        p.name,
        description: p.description,
        assignedTo: {
          name:  p.assignedTo?.name  ?? '',
          image: p.assignedTo?.profile?.avatarUrl ?? null
        },
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
      }))
      return res.status(200).json(data)
    }

    if (req.method === 'POST') {
      // Crear proyecto
      const { name, description, assignedToId } = req.body as {
        name: string
        description?: string
        assignedToId: string
      }
      if (!name || !assignedToId) {
        return res.status(400).json({ error: 'Name y assignedToId son requeridos' })
      }
      const p = await prisma.project.create({
        data: {
          name,
          description,
          assignedTo: { connect: { id: assignedToId } }
        },
        include: {
          assignedTo: {
            select: {
              name: true,
              profile: { select: { avatarUrl: true } }
            }
          }
        }
      })
      return res.status(201).json({
        id:          p.id,
        name:        p.name,
        description: p.description,
        assignedTo: {
          name:  p.assignedTo?.name  ?? '',
          image: p.assignedTo?.profile?.avatarUrl ?? null
        },
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
      })
    }

    res.setHeader('Allow', ['GET','POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Error interno del servidor' })
  }
}
