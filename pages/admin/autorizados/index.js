import React, { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '../../../components/layout_autorizados/Layout';
import { prisma } from '../../../lib/db';
import { UserContext } from '../../../providers/user';
import VerAutorizadosAdmin from '../../../components/admin/autorizados/VerAutorizadosAdmin';

export default function VerAutorizados({alunos}) {

  const { data: session, status } = useSession()
  const { usuario, setUsuario } = useContext(UserContext);
  const [ isNotAdmin, setIsNotAdmin ] = useState(false);

  useEffect(() => {
    if(usuario) { 
        if(usuario.role != 'admin' && usuario.role != 'coordenador' ){
            setIsNotAdmin(true);
        }
    }
  }, [])

  
  if(isNotAdmin == true) {

    return (
        <Layout>
            <p>Você não tem permissão para visualizar essa página.</p>
        </Layout>
    )
  }

  return (
    <Layout>
        <div>
          <div className='flex justify-center'>
            <p className='text-xl font-bold'>Coordenação - Autorizados a retirar</p>
            
          </div>
          <VerAutorizadosAdmin alunos={alunos}/>
          
        </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {

  const getAlunos = await prisma.alunos.findMany({
    include: {
      autorizados: true,
    },
  })

  return {
    props: { alunos: getAlunos }, // will be passed to the page component as props
  }
}
