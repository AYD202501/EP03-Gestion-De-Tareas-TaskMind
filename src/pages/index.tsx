// src/pages/index.tsx
import { withAuth } from '@/lib/auth'

export const getServerSideProps = withAuth(async () => {
  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  }
})

export default function Index() {
  return null
}
