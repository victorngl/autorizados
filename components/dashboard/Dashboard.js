import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import Layout from '../layout/Layout';

export default function Dashboard({ children }) {
  const { data: session, status } = useSession()

  return (
    <Layout>
      <div className=''>
        <p className='font-bold text-lg mb-10'>Welcome to Dashboard!</p>
      </div>
    </Layout>
  )
}


