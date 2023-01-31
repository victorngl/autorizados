import React from 'react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

const LogOutButton = () => {
    const { data: session, status } = useSession()
    return (
      <>
      {session && <button onClick={(e) => { signOut(); }} className='mx-5 px-10 py-2 bg-blue-500 rounded text-white font-bold'>Sair</button>}
      </>
      );
};

export default LogOutButton;