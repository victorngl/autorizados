import React, { useState, useContext } from 'react';
import { signOut, useSession } from "next-auth/react"
import { AuthContext } from './providers/auth';

export default function Layout({ children }) {
  const { data: session, status } = useSession()
  const { responsavel, setResponsavel, usuario, setUsuario } = useContext(AuthContext);

  function isEmptyObject(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }

  return (
    <div style={{
      backgroundImage: 'url(/bgcap.png)'
    }} className='flex justify-center min-h-screen'>

      <div className="mt-10 w-10/12 md:w-max m-10 bg-white p-2 rounded-lg shadow-md px-2 h-max font-sans">
        <div className='mx-10 flex pt-6 text-center justify-center mb-6 items-center'>
          <img className='w-10 h-10 mr-5' alt='' src="https://cdn.nvi.wpensar.com.br/cambauba/logo_carteirinha/ce6c983fbba5132c7f619f32a51707d6a9ae2395.png" />
          <p className="font-semibold md:text-2xl md:tracking-wide">Atividades Complementares 2023</p>
        </div>

        <div className='flex justify-center'>
          {children}
        </div>

        {session && isEmptyObject(responsavel) &&
            <div className='w-1/2 text-left mt-5 mb-2'>
              <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8 rounded' onClick={e => signOut()}>Sair</button>
            </div>
        }

        {session && !isEmptyObject(responsavel) &&
            <div className='w-1/2 text-left mt-5 mb-2'>
              <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8 rounded' onClick={e => setResponsavel({})}>Voltar</button>
            </div>
        }


      </div>
    </div >
  )
}
