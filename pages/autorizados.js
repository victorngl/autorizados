
import React, { useContext, useState } from 'react';
import { UserContext } from '../providers/user';
import { AlunosContext } from '../providers/alunos';

import AlunoCard from '../components/autorizados/AlunoCard';
import Layout from '../components/layout/Layout';

export default function AutorizadosPage({ children }) {
  const { usuario, setUsuario } = useContext(UserContext);
  const { alunos, setAlunos } = useContext(AlunosContext);

  //console.log(alunos)

  if (!alunos) {
    <Layout>
      <p>Sem alunos!</p>
    </Layout>
  }

  return (
    <Layout>
      {alunos &&
        <div className='gap-3 flex'>
          {
            alunos.map((user, index) => (

              <AlunoCard key={index} aluno={user.alunos} />

            ))
          }
        </div>
      }
    </Layout>
  )
}