/* eslint-disable react/jsx-key */
import Head from 'next/head'
import React, { useState } from 'react';
import CardForm from './CardForm';
import RematriculaForm from './RematriculaForm'
import { prisma } from './lib/db'
/* Material Tailwind Imports */


export default function Home({ usuario }) {
  const [responsavel, setResponsavel] = useState({});
 

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
      backgroundImage: 'url(https://cambauba.org.br/wp-content/uploads/2021/10/slide-2.jpg)'
    }}
      className='bg-cover flex justify-center items-center w-full'>
      <Head>
        <title>Atividades Complementares - Escola Modelar Cambaúba</title>
        <link rel="icon" href="https://cambauba.org.br/wp-content/uploads/2021/02/cropped-faviconcambauba-150x150.png" sizes="32x32"></link>
      </Head>

      <div className="w-11/12">
        <div className="flex justify-center px-2 my-12 font-sans">
          <div className="bg-white p-2 rounded-lg border-2 shadow-md">
            <div className='flex pt-6 text-2xl text-center justify-center mb-6 items-center'>
            <img className='w-10 h-10 mr-5' alt='' src="https://cdn.nvi.wpensar.com.br/cambauba/logo_carteirinha/ce6c983fbba5132c7f619f32a51707d6a9ae2395.png"/>
              <h3 className="font-semibold tracking-wide text-14">Atividades Complementares 2023</h3>
            </div>

            {isEmptyObject(responsavel)?
            <CardForm usuario={usuario} setResponsavel={setResponsavel} />
            :
            <RematriculaForm responsavel={responsavel} setResponsavel={setResponsavel} />}
          </div>
          
        </div>
      </div>
    </div>

  )

}
export async function getServerSideProps(ctx) {
  
  const usuario = await prisma.responsaveis.findMany({
    
    where: {
      username: ctx.params.slug,
    },
    include: {
      aluno: true, // Return all fields
    },
  })

  return {
    props: { usuario },
  };

}