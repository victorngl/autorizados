/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react"
import InputMask from 'react-input-mask';
import { UserContext } from '../../providers/user';
import Layout from '../layout/Layout';
import { AlunosContext } from '../../providers/alunos';

export default function Login({ children }) {
  const { data: session, status } = useSession()
  const { usuario, setUsuario } = useContext(UserContext);
  const { alunos, setAlunos } = useContext(AlunosContext);

  const [LoginCPF, setLoginCPF] = useState('');
  const [LoginWpensar, setLoginWPensar] = useState('');
  const [error, setError] = useState('');

  function onCPFValueChange(event) {
    setLoginCPF(event.target.value)
  }

  function onUserWPensarValueChange(event) {
    setLoginWPensar(event.target.value)
  }

  useEffect( () => {
    if(session && !usuario)
      getUser(session?.user.id);
  }, [session])

  const handleSubmit = async (event) => {
    event.preventDefault();

    let res = await signIn('credentials', {
      redirect: false,
      username: LoginWpensar,
      cpf: LoginCPF,

    }).then((res) => {
        if (res.status == 401) {
          setError('Usuário ou CPF inválidos!')
        }

        if( res.ok ) {

        }

      })
  }

  const getUser = async (userId) => {

    const data = {
      cpf: userId,
    }

    const JSONdata = JSON.stringify(data)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch('/api/get_user', options)

    const result = await response.json()

    setUsuario(result.user);

    getAlunos(userId);
  }

  const getAlunos = async (userId) => {

    const data = {
      cpf_responsavel: userId,
    }

    const JSONdata = JSON.stringify(data)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch('/api/get_alunos', options)

    const result = await response.json()

    //console.log(result.alunos)
    setAlunos(result.alunos);
  }


  if (session && status == 'authenticated') {
    return {...children}
  }
  
  
  return (
    <>
    {status === 'unauthenticated' && 
    <Layout>
      <div className='p-5 justify-center flex'>
        <div>
          {error &&

            <div className="mb-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold mr-2">Oooops!</strong>
              <span className="block sm:inline">{error}</span>
            </div>

          }

          <form onSubmit={handleSubmit}>
            <>
              <div className='text-lg text-center mb-6 font-bold text-lg font-medium'>Informe suas credenciais</div>
              <div className='mb-6'>
                <label htmlFor="user_wpensar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuário do WPensar</label>
                <input  type="user_wpensar" id="user_wpensar" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={onUserWPensarValueChange} placeholder="Exemplo: joao.silva" required />
              </div>

              <div className="mb-6">
                <label htmlFor="cpf" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CPF</label>
                <InputMask type='cpf' id='cpf' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' mask="999.999.999-99" onChange={onCPFValueChange} placeholder='000.000.000-00' required />
              </div>

            </>

            <div className='flex justify-center'>
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar</button>
            </div>

          </form>
        </div>
      </div >
      </Layout>}
      </>
  )
}