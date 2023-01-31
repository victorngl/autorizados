
import React, { useContext, useState } from 'react';

import { UserContext } from '../../providers/user';
import { AlunosContext } from '../../providers/alunos';

import AlunoCard from '../../components/autorizados/AlunoCard';
import Layout from '../../components/layout/Layout';
import ListarAutorizados from '../../components/autorizados/ListarAutorizados';

export default function AutorizadosPage({ children }) {
  const { usuario, setUsuario } = useContext(UserContext);
  const { alunos, setAlunos } = useContext(AlunosContext);

  if (!alunos) {
    return (
      <Layout>
        <p>Sem alunos!</p>
      </Layout>
    )
  }

  return (
    <Layout>
      
      {alunos &&
        <div className='w-full md:flex gap-4 justify-center'>
          {
            alunos.map((user, index) => (
              <AlunoCard key={index} aluno={user.alunos}  />
            ))
          }
        </div>
      }
    </Layout>
  )
}