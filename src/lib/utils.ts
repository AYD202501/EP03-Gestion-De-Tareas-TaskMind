import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type RoleKey = 'admin' | 'projectManager' | 'collaborator'

export function getRole(user?: {
  name?: string | null,
  email?: string | null,
  image?: string | null,
} | undefined): RoleKey {
  if (!user || !user.email) {
    return 'admin'
  }
  const lower = user.email.toLowerCase()
  if (lower === 'admin@test.com') return 'admin'
  if (lower === 'manager@test.com') return 'projectManager'

  return 'collaborator'
}