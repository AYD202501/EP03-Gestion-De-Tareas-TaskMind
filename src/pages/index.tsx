import { withAuth } from "@/lib/auth";

export const getServerSideProps = withAuth()

export default function Index() {
    return (
        <div className='bg-white  px-4 py-6 rounded-lg shadow-lg'>        
        </div>
    );
}

