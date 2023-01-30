
import React, { useContext } from 'react';
import { UserContext } from '../../providers/user';
import { useRouter } from 'next/router'

export default function AlunoCard({ setAlunoSelecionado, aluno }) {
  const { usuario, setUsuario } = useContext(UserContext);
  const router = useRouter()

  return (
    <div key={aluno.naluno} className="p-4 rounded border-2 border-grey-500 justify-center mb-2 shadow-xl md:w-9/12 gap-2">
      <div>
        <p className='font-semibold'>Aluno:</p>
        <p>{aluno.nome}</p>

        <p className='font-semibold'>Série:</p>
        <p>{aluno.s_rie}</p>

      </div>

      <div className='justify-center flex mt-5'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded' onClick={e => router.push(`autorizados/${aluno.naluno}`)}>Ver autorizados a buscar</button>
      </div>

    </div>

  )
}
