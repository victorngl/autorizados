import React, { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '../../../components/layout/Layout';

import { UserContext } from '../../../providers/user';
import { AlunosContext } from '../../../providers/alunos';

export default function DeleteAutorizadoModal({ show, setShowDeleteModal, deleteId, handleDelete }) {

  const { data: session, status } = useSession()
  const { usuario, setUsuario } = useContext(UserContext);
  const [ isNotAdmin, setIsNotAdmin ] = useState(false);

  useEffect(() => {
    if(usuario) { 
        if(usuario.role != 'admin')  {
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
        <p>Ver autorizados pela coordenação aqui!</p>
    </Layout>
  );
}
