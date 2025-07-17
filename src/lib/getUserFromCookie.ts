import { parse } from 'cookie'
import { verifyToken } from './auth'

export function getUserFromCookie(req: any) {
  const { auth_token } = parse(req.headers.cookie || '')
  if (!auth_token) return null

  try {
    return verifyToken(auth_token)
  } catch {
    return null
  }
}
