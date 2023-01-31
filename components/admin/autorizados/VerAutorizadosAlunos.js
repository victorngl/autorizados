
import React, { useContext, useState } from 'react';


export default function VerAutorizadosAdmin({ aluno }) {
  return (
    <div className='p-5'>
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
                      
                    </tr>
                  </thead>

                  <tbody className='flex-1 sm:flex-none text-xs'>
                    <tr key={index} className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                      <td className='border-grey-light border hover:bg-gray-100 p-3'>{autorizado.nome}</td>
                      <td className='border-grey-light border hover:bg-gray-100 p-3'>{autorizado.documento}</td>
                      <td className='border-grey-light border hover:bg-gray-100 p-3'>{autorizado.parentesco}</td>
                      <td className='border-grey-light border hover:bg-gray-100 p-3'>{autorizado.telefone}</td>
                      <td className='border-grey-light border hover:bg-gray-100 p-3'>{autorizado.celular}</td>
                    </tr>
                  </tbody>
                </table>
              </>
            ))
          }
    </div>

  )
}

