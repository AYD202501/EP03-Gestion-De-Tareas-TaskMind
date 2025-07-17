import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { getSession } from 'next-auth/react'
import Email from "next-auth/providers/email"

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

export function withAuth<P>(gssp?: GetServerSideProps<P>) {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const session = await getSession(context)

    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }

    const gsspData = gssp ? await gssp(context) : { props: {} }

    return {
      ...gsspData,
      props: {
        session,
        ...(gsspData as any).props,
      },
    }
  }
}
