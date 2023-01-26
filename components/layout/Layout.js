import React from 'react';

export default function Layout({ children }) {

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

      </div>
    </div >
  )
}
