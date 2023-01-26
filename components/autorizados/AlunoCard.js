
import React, { useContext, useState } from 'react';
import { UserContext } from '../../providers/user';
import { useSession } from 'next-auth/react';

export default function AlunoCard({ aluno }) {
  const { usuario, setUsuario } = useContext(UserContext);

  return (


    <div key={aluno.naluno} className="p-4 rounded border-2 border-grey-500 justify-center mb-2 shadow-xl md:w-4/12 gap-2">
      <p>Aluno:</p>
      <p>{aluno.nome}</p>
    </div>

  )
}
