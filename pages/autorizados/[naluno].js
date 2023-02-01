
import React, { useContext, useState } from 'react';

import { UserContext } from '../../providers/user';
import { AlunosContext } from '../../providers/alunos';

import Layout from '../../components/layout/Layout';
import ListarAutorizados from '../../components/autorizados/ListarAutorizados';

import { prisma } from '../../lib/db'

import { useRouter } from 'next/router';

export default function AutorizadosPage({ aluno }) {
  const { usuario, setUsuario } = useContext(UserContext);
  const { alunos, setAlunos } = useContext(AlunosContext);



  const router = useRouter()


  if (!aluno) {
    return (
      <Layout>
        <p>Sem alunos!</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className='justify-center flex'>
        <div className='w-full p-5'>
          <div className='mb-5 flex items-center'>
            <div className='md:text-lg text-sm break-normal'>
              <ul className='font-bold'>
                <li>Nome: {aluno.nome}</li>
                <li>Série: {aluno.s_rie}</li>
              </ul>
            </div>
            <div className='ml-10 mt-5 flex gap-3 '>
              <button onClick={() => { router.back() }} className='py-2 px-10 bg-blue-500 text-white font-bold rounded'>Voltar</button> <button onClick={() => { router.push(`/autorizados/create/${aluno.naluno}`) }} className='py-2 px-10 bg-green-500 text-white font-bold rounded'>Adicionar autorizado</button>
            </div>
          </div>
          <div className='justify-center flex mt-10'>
            <p className='font-sans font-semibold text-3xl'>Autorizados a Buscar: </p>
          </div>
          <div>
            {aluno && <ListarAutorizados aluno={aluno} />}
          </div>
        </div>
      </div>
    </Layout>
  )
}


export async function getServerSideProps(context) {
  const naluno = context.params.naluno;

  const getAluno = await prisma.alunos.findFirst({
    where: {
      naluno: Number(naluno),
    },
    include: {
      autorizados: true,
    },
  })

  return {
    props: { aluno: getAluno }, // will be passed to the page component as props
  }
}