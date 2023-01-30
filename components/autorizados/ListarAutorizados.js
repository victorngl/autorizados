
import React, { useContext, useEffect, useState } from 'react';

import { UserContext } from '../../providers/user';
import { AlunosContext } from '../../providers/alunos';
import { useRouter } from 'next/router';

export default function ListarAutorizados({ aluno }) {
  const { usuario, setUsuario } = useContext(UserContext);
  const { alunos, setAlunos } = useContext(AlunosContext);

  const router = useRouter();

  if (!aluno) {
    return (
      <p>Sem autorizados selecionado!</p>
    )
  }

  const handleDelete = async (idToDelete) => {
    const data = {
      autorizado_id: idToDelete,
    }

    const JSONdata = JSON.stringify(data)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch('/api/autorizados/delete_autorizado', options)

    const result = await response.json()

    if(response.ok) {
      router.push(`/autorizados/${aluno.naluno}`)
    }
  }

  return (
    <>
      {aluno.autorizados &&
        <div>
          <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
            <thead className='text-xs uppercase bg-gray-50'>
              <tr className='text-white bg-red-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0'>
                <th className='p-3 text-left'>Nome</th>
                <th className='p-3 text-left'>Documento</th>
                <th className='p-3 text-left'>Parentesco</th>
                <th className='p-3 text-left'>Telefone</th>
                <th className='p-3 text-left'>Celular</th>
                <th className='p-3 text-left'>Ações</th>
              </tr>
            </thead>
            <tbody className='flex-1 sm:flex-none text-xs'>
              {
                aluno.autorizados.map((autorizado, index) => (
                  <tr key={index} className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                    <td className='border-grey-light border hover:bg-gray-100 p-3'>{autorizado.nome}</td>
                    <td className='border-grey-light border hover:bg-gray-100 p-3'>{autorizado.documento}</td>
                    <td className='border-grey-light border hover:bg-gray-100 p-3'>{autorizado.parentesco}</td>
                    <td className='border-grey-light border hover:bg-gray-100 p-3'>{autorizado.telefone}</td>
                    <td className='border-grey-light border hover:bg-gray-100 p-3'>{autorizado.celular}</td>
                    <td className='border-grey-light border hover:bg-gray-100 p-3'><button onClick={e => handleDelete(autorizado.id)} className='font-bold'>Deletar Autorizado</button></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      }
    </>
  )
}


