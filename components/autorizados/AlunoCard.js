
import React, { useContext, useState } from 'react';
import { UserContext } from '../../providers/user';
import { useSession } from 'next-auth/react';

export default function AlunoCard({ aluno }) {
  const { usuario, setUsuario } = useContext(UserContext);

  return (
    
      <div>
        <p>Aluno:</p>
        <p>{aluno.nome}</p>
      </div>
   
  )
}
