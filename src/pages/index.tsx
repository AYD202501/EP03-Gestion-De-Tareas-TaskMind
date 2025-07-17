import Layout from '@/components/Organisms/Layout';
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    redirect: {
      destination: '/dashboard',
      permanent: false,
    },
  }
}

export default function Index() {
    return (
        <div className='bg-white  px-4 py-6 rounded-lg shadow-lg'>        
        </div>
    );
}

