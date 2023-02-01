
import React, { useContext, useEffect, useState } from 'react';

import { UserContext } from '../../providers/user';
import { AlunosContext } from '../../providers/alunos';
import { useRouter } from 'next/router';
import DeleteAutorizadoModal from './DeleteAutorizadoModal'
import { ToastContainer, toast } from 'react-toastify';

export default function ListarAutorizados({ aluno }) {
  const { usuario, setUsuario } = useContext(UserContext);
  const { alunos, setAlunos } = useContext(AlunosContext);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const router = useRouter();

  if (!aluno) {
    return (
      <p>Sem aluno selecionado!</p>
    )
  }

  const showModal = (deleteId) => {
    setDeleteId(deleteId);
    setShowDeleteModal(true);
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

    if (response.ok) {
      toast.warning("Autorizado deletado com sucesso!");
      router.push(`/autorizados/${aluno.naluno}`)
    }

    setShowDeleteModal(false);
  }

  return (
    <>
      <DeleteAutorizadoModal show={showDeleteModal} setShowDeleteModal={setShowDeleteModal} deleteId={deleteId} handleDelete={handleDelete} />
      {
        aluno.autorizados.length > 0 ?
        <div>
          {
            aluno.autorizados.map((autorizado, index) => (
              <>
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
                    <tr key={index} className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                      <td className='border-grey-light border hover:bg-gray-100 p-3'>{autorizado.nome}</td>
                      <td className='border-grey-light border hover:bg-gray-100 p-3'>{autorizado.documento}</td>
                      <td className='border-grey-light border hover:bg-gray-100 p-3'>{autorizado.parentesco}</td>
                      <td className='border-grey-light border hover:bg-gray-100 p-3'>{autorizado.telefone}</td>
                      <td className='border-grey-light border hover:bg-gray-100 p-3'>{autorizado.celular}</td>
                      <td className='border-grey-light border hover:bg-gray-100 p-3'><button data-modal-target="popup-modal" data-modal-toggle="popup-modal" onClick={() => showModal(autorizado.id)} className='font-bold'>Deletar Autorizado</button></td>
                    </tr>
                  </tbody>
                </table>
              </>
            ))
          }
        </div>
      : <div className='flex justify-center mt-10 '><p>Não há autorizados cadastrados!</p></div> }
    </>
  )
}

//{/*} onClick={e => handleDelete(autorizado.id)} */}


