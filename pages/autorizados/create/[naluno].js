
import React, { useContext, useState } from 'react';

import { UserContext } from '../../../providers/user';
import { AlunosContext } from '../../../providers/alunos';

import Layout from '../../../components/layout/Layout';

import { prisma } from '../../../lib/db';
import { useRouter } from 'next/router';
import moment from 'moment/moment';
import { toast } from 'react-toastify';

export default function AutorizadosPage({ aluno }) {
  const { usuario, setUsuario } = useContext(UserContext);
  const { alunos, setAlunos } = useContext(AlunosContext);

  const router = useRouter()

  const [autorizado, setAutorizado] = useState({
    nome: '',
    documento: '',
    parentesco: '',
    telefone: '',
    celular: '',
    naluno: aluno.naluno,
  });

  const sendEmailCadastrado = async (DataEmail) => {

    const JSONdata = JSON.stringify(DataEmail)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch('/api/email/cadastro_autorizado', options)

  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const current = new Date();
    const formatDate = "DD-MM-YYYY HH:mm:ss"

    const dateTime = moment(current).format(formatDate);

    const DataEmail = {
      nomealuno: aluno.nome,
      serie: aluno.s_rie,
      nomeautorizado: autorizado.nome,
      documentoautorizado: autorizado.documento,
      parentescoautorizado: autorizado.parentesco,
      telefoneautorizado: autorizado.telefone,
      celularautorizado: autorizado.celular,
      usuario: usuario.username,
      date_registro: dateTime,
      name: usuario.nome,
      email: usuario.email,
    }

    const JSONdata = JSON.stringify(autorizado)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch('/api/autorizados/add_autorizado', options)

    const result = await response.json()

    if (response.ok) {
      toast.success('Auorizado a buscar cadastrado com sucesso!')
      sendEmailCadastrado(DataEmail)
      router.push(`/autorizados/${aluno.naluno}`)
    }
  }

  function handleFormChange(event) {
    setAutorizado((prev) => {
      const newData = { ...prev, [event.target.name]: event.target.value }
      return newData;
    })
  }

  if (!aluno) {
    return (
      <Layout>
        <p>Sem aluno selecionado!</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className='p-7'>
        <div>

          <div className='mb-5 flex'>
            <div>
              <ul className='font-bold'>
                <li>Nome: {aluno.nome}</li>
                <li>Série: {aluno.s_rie}</li>
              </ul>
            </div>
            <div className='ml-10 mt-5 flex'>
              <button onClick={() => { router.back() }} className='py-2 px-10 bg-blue-500 text-white font-bold rounded'>Voltar</button> 
            </div>

          </div>
        </div>

        <div>
          <p className='text-lg font-semibold'>Cadastrar autorizado: </p>
          <form onSubmit={handleSubmit}>

            <div className='text-lg text-center mb-6 font-bold text-lg font-medium'>Informe os dados do Autorizado a Buscar:</div>
            <div className='mb-6'>
              <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900">Nome Completo</label>
              <input name="nome" type="nome" id="nome" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={handleFormChange} placeholder="Exemplo: João Silva" required />
            </div>

            <div className='mb-6'>
              <label htmlFor="documento" className="block mb-2 text-sm font-medium text-gray-900">RG ou CPF</label>
              <input name="documento" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={handleFormChange} required />
            </div>

            <div className='mb-6'>
              <label htmlFor="parentesco" className="block mb-2 text-sm font-medium text-gray-900">Parentesco</label>
              <input name="parentesco" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={handleFormChange} required />
            </div>

            <div className='mb-6'>
              <label htmlFor="telefone" className="block mb-2 text-sm font-medium text-gray-900">Telefone</label>
              <input name="telefone" id="telefone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={handleFormChange} placeholder="(00) 00000-0000" required />
            </div>

            <div className='mb-6'>
              <label htmlFor="celular" className="block mb-2 text-sm font-medium text-gray-900">Celular</label>
              <input name="celular" id="celular" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={handleFormChange} placeholder="(00) 0000-0000" required />
            </div>

            <div className='flex justify-center'>
              <button type="submit" className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Adicionar Autorizado</button>
            </div>

          </form>
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
      autorizados: false,
    },
  })

  return {
    props: { aluno: getAluno }, // will be passed to the page component as props
  }
}