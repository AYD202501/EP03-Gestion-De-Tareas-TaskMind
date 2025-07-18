// src/lib/getUserFromCookie.ts

import type { IncomingMessage } from 'http'
import { parse } from 'cookie'
import { verifyToken, UserPayload } from './auth'

export function getUserFromCookie(
  req: IncomingMessage & { headers: { cookie?: string } }
): UserPayload | null {
  // Parseamos todas las cookies
  const cookies = parse(req.headers.cookie || '')
  const token = cookies['auth_token']
  if (!token) return null

  try {
    // Verificamos y retornamos el payload
    return verifyToken(token)
  } catch (err) {
    console.error('Error al verificar JWT:', err)
    return null
  }
}
