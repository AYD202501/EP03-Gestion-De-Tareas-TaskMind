import jwt, { SignOptions } from 'jsonwebtoken' // ✅ Importación por defecto con tipos
import { getUserFromCookie } from '@/lib/getUserFromCookie'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

export type UserPayload = {
  id: string
  email: string
  role: 'Administrator' | 'Project_Manager' | 'Colaborator'
}

const envSecret = process.env.JWT_SECRET
if (!envSecret) {
  throw new Error('JWT_SECRET no está definido')
}
const SECRET_KEY: string = envSecret

export function signToken(user: UserPayload, expiresIn: string | number = '7d'): string {
  const options: SignOptions = { expiresIn: expiresIn as any }
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

// Función que retorna un GetServerSideProps con autenticación
export function withAuth(
  gssp?: GetServerSideProps,
  allowedRoles?: RoleKey[]
): GetServerSideProps {
  return async (ctx: GetServerSidePropsContext) => {
    const user = getUserFromCookie(ctx.req)

    // Verificar si el usuario está autenticado
    if (!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }

    if (gssp) {
      const result = await gssp(ctx)
      
      if ('props' in result) {
        return {
          props: {
            ...result.props,
            user,
          },
        }
      }
      
      return result
    }

    return {
      props: { user },
    }
  }
}