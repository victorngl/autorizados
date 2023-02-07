
import React, { useContext, useState } from 'react';

import { useRouter } from 'next/router'

import VerAutorizadosAlunos from './VerAutorizadosAlunos'

export default function VerAutorizadosAdmin({ alunos }) {

  const [selectedClass, setSelectedClass] = useState(null);
  const [alunoSelected, setAlunoSelected] = useState(null);

  const router = useRouter()

  const turmas = [
    { nome: '1º Ano' },
    { nome: '2º Ano' },
    { nome: '3º Ano' },
    { nome: '4º Ano' },
    { nome: '5º Ano' },
    { nome: '6º Ano' },
    { nome: '7º Ano' },
    { nome: '8º Ano' },
    { nome: '9º Ano' },
    { nome: '1ª Série' },
    { nome: '2ª Série' },
    { nome: '3ª Série' },
  ]

  const handleClassSelectec = (event) => {
    const newClass = event.target.value;

    if (selectedClass != newClass)
      setSelectedClass(newClass)
  }

  const handleAlunoSelect = (index) => {
    if (alunoSelected != index)
      setAlunoSelected(alunos[index])
  }

  return (
    <div className='p-5'>
      {!selectedClass ?
        <div className='mt-5'>
          <ul className="grid w-full gap-6 md:grid-cols-6">
            {turmas.map((turma, index) => (
              <li key={index}>
                <input
                  onClick={(e) => handleClassSelectec(e)}
                  type="radio"
                  id={turma.nome}
                  defaultValue={turma.nome}
                  name="turma"
                  className="hidden peer"
                  required=""
                />
                <label
                  htmlFor={turma.nome}
                  className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:bg-green-500 peer-checked:border-green-600 peer-checked:text-white hover:text-white hover:bg-green-500 "
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">{turma.nome}</div>
                  </div>
                </label>
              </li>
            ))}

          </ul>
        </div>
        :
        <>

          <div className='mt-5'>
            <div className='justify-center flex mb-5'>
              <button onClick={() => { setSelectedClass(null), setAlunoSelected(null) }} className='font-bold py-3 px-8 rounded text-white bg-green-500'>Voltar</button>
            </div>
            {!alunoSelected ?
              <div className='justify-center flex'>
                <ul className='w-full'>
                  {
                    alunos.map((aluno, index) => (

                      (aluno.s_rie == selectedClass &&
                        <>
                          <li key={index}>
                            <input
                              onClick={(e) => handleAlunoSelect(index)}
                              type="radio"
                              id={aluno.nome}
                              defaultValue={aluno.nome}
                              name="turma"
                              className="hidden peer"
                              required=""
                            />
                            <label
                              htmlFor={aluno.nome}
                              className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:bg-green-500 peer-checked:border-green-600 peer-checked:text-white hover:text-white hover:bg-green-500 "
                            >
                              <div className="block">
                                <div className="w-full text-lg font-semibold">{aluno.nome}</div>
                              </div>
                            </label>
                          </li>

                        </>
                      )))
                  }
                </ul>
              </div>
              : <VerAutorizadosAlunos aluno={alunoSelected}/>
            }
          </div>

        </>
      }
    </div>

  )
}

