import jwt, { SignOptions } from 'jsonwebtoken'
import { getUserFromCookie } from '@/lib/getUserFromCookie'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import prisma from '@/config/prisma'

export type UserPayload = {
  id: string
  email: string
  role: RoleKey
  name: string | null
  avatarUrl: string | null
}

const SECRET_KEY = process.env.JWT_SECRET!
if (!SECRET_KEY) {
  throw new Error('JWT_SECRET no está definido')
}

export function signToken(
  user: UserPayload,
  expiresIn: jwt.SignOptions['expiresIn'] = '7d'
): string {
  const options: SignOptions = { expiresIn }
  return jwt.sign(user, SECRET_KEY, options)
}

export function verifyToken(token: string): UserPayload {
  const decoded = jwt.verify(token, SECRET_KEY)
  if (
    typeof decoded === 'object' &&
    decoded !== null &&
    'id' in decoded &&
    'email' in decoded &&
    'role' in decoded
  ) {
    return decoded as UserPayload
  }
  throw new Error('Token inválido')
}

export type RoleKey = 'Administrator' | 'Project_Manager' | 'Colaborator'

export function withAuth<P extends Record<string, unknown> = Record<string, unknown>
>(
  gssp?: GetServerSideProps,
  allowedRoles: RoleKey[] = []
): GetServerSideProps {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P & { user: UserPayload }>> => {

    const tokenUser = getUserFromCookie(ctx.req)
    if (!tokenUser) {
      return { redirect: { destination: '/login', permanent: false } }
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: tokenUser.id },
      include: { profile: true }
    })
    if (!dbUser) {
      return { redirect: { destination: '/login', permanent: false } }
    }

    const user: UserPayload = {
      id: dbUser.id,
      email: dbUser.email,
      role: dbUser.role,
      name: dbUser.name ?? null,
      avatarUrl: dbUser.profile?.avatarUrl ?? null
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      return { redirect: { destination: '/', permanent: false } }
    }

    if (gssp) {
      const result = await gssp(ctx)
      if ('props' in result) {
        return {
          props: {
            ...(result.props as P),
            user,
          },
        }
      }
      return result as GetServerSidePropsResult<P & { user: UserPayload }>;
    }

    return {
      props: {
        user,
      } as P & { user: UserPayload },
    }
  }
}
