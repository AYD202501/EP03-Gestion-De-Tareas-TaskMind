// src/pages/api/logout.ts

// Endpoint de API para cerrar sesión del usuario
// Elimina la cookie de autenticación 'token' del navegador

import type { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Serializa una cookie vacía con mismo nombre ('token') y la elimina
  const cookie = serialize('token', '', {
    httpOnly: true, // No accesible desde JavaScript (por seguridad)
    secure: process.env.NODE_ENV === 'production',  // Solo HTTPS en producción
    sameSite: 'lax',  // Previene CSRF en navegación cruzada
    path: '/',  // Aplica a toda la app
    maxAge: 0,  // Expira inmediatamente (elimina la cookie)
  })

  // Expira inmediatamente (elimina la cookie)
  res.setHeader('Set-Cookie', cookie)

  // Respuesta de éxito
  return res.status(200).json({ success: true })
}
