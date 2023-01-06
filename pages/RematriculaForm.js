import React, { useState } from 'react';
import { useRouter } from 'next/router'

export default function RematriculaForm({ responsavel, setResponsavel }) {
  const [AtividadeCultural, setAtividadeCultural] = useState('0');
  const [AtividadeEsportiva, setAtividadeEsportiva] = useState('0');
  const [AtividadeOptativa, setAtividadeOptativa] = useState('0');
  const [AtividadePrioridade, setAtividadePrioridade] = useState('0');
  const router = useRouter()

  const link = 'https://cambauba.org.br/matricula_edital_interno/contratos/Contrato%20Renova%C3%A7%C3%A3o%202023%20-%20Wpensar.pdf'
 
  function isEmptyObject(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }

  function onCulturalValueChange(event) {
    setAtividadeCultural(event.target.value);
  }

  function onEsportivaValueChange(event) {
    setAtividadeEsportiva(event.target.value)
  }

  function onOptativaValueChange(event) {
    setAtividadeOptativa(event.target.value)
  }

  function onPrioridadeValueChange(event) {
    setAtividadePrioridade(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = {
      responsavel: responsavel,
      atividade_prioridade: AtividadePrioridade,
      atividade_cultural: AtividadeCultural,
      atividade_esportiva: AtividadeEsportiva,
      atividade_optativa: AtividadeOptativa,
      resposta: 1,
    }

    const JSONdata = JSON.stringify(data)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch('/api/save_aceite', options)

    const result = await response.json()

    setResponsavel({})

    router.push(result.aluno.responsaveis[0].username)
  }

  if (isEmptyObject(responsavel))
    return (<h1>Erro desconhecido</h1>)

  return (
    <div className='p-5'>
      <form onSubmit={handleSubmit}>
        <div className='text-sm text-justify mb-6'>Prezado (a) Associado(a), o presente questionário tem como objetivo agilizar o processo
          de renovação de matrícula do aluno para o ano letivo de 2023. Inicialmente, cumpre informar que a renovação da matrícula será realizada totalmente
          de forma online.</div>
        <div className="relative z-0 mb-6 w-full group">
          <input value={responsavel.aluno.nome} type="name" name="nome" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
          <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nome do aluno</label>
        </div>

        <div className="relative z-0 mb-6 w-full group">
          <input value={responsavel.aluno.s_rie} type="name" name="nome" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
          <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Série do Aluno em 2023:</label>
        </div>

       

        
          <div onChange={onPrioridadeValueChange}>
            <div className='mb-2'>Deseja que a primeira opção seja?</div>
            <fieldset className='flex gap-10 mb-5' >
              <div className="flex items-center mb-4" >
                <input required id="country-option-1" type="radio" name="countries" defaultValue="Cultural" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="country-option-1" className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Cultural
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input id="country-option-2" type="radio" name="countries" defaultValue="Esportiva" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="country-option-2" className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Esportiva
                </label>
              </div>
            </fieldset>
          </div> 

      
          <div className='mb-5' onChange={onEsportivaValueChange}>
            <label required htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Escolha uma atividade esportiva: </label>
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

              <option value="Não se aplica">Não se aplica</option> 
              <option value="BASQUETE - 3º ao 5º /EF">BASQUETE - 3º ao 5º /EF</option> 
              <option value="BASQUETE - 6º ao 8º /EF">BASQUETE - 6º ao 8º /EF</option>
              <option value="BASQUETE - 9º/EF ao 3º E. Médio">BASQUETE - 9º/EF ao 3º E. Médio</option>
              <option value="CAPOEIRA - 1º e 2º /EF">CAPOEIRA - 1º e 2º /EF</option>
              <option value="CAPOEIRA - 3º /EF">CAPOEIRA - 3º /EF</option>
              <option value="CAPOEIRA - 4º e 5º /EF">CAPOEIRA - 4º e 5º /EF</option>
              <option value="CAPOEIRA - 6º ao 9º /EF">CAPOEIRA - 6º ao 9º /EF</option>
              <option value="ESCOLA DA BOLA - 1º /EF">ESCOLA DA BOLA - 1º /EF</option>
              <option value="ESCOLA DA BOLA - 2º/EF">ESCOLA DA BOLA - 2º/EF</option>
              <option value="FUTSAL (masc) - 5º /EF">FUTSAL (masc) - 5º /EF</option>
              <option value="FUTSAL (masc) - 6º e 7º /EF">FUTSAL (masc) - 6º e 7º /EF</option>
              <option value="FUTSAL (masc) - 8º e 9º /EF">FUTSAL (masc) - 8º e 9º /EF</option>
              <option value="FUTSAL (masc) - E. Médio">FUTSAL (masc) - E. Médio</option>
              <option value="FUTSAL (misto) - 1º e 2º / EF">FUTSAL (misto) - 1º e 2º / EF</option>
              <option value="FUTSAL (misto)- 3º e 4º EF">FUTSAL (misto)- 3º e 4º EF</option>
              <option value="HANDEBOL - 3º ao 5º /EF">HANDEBOL - 3º ao 5º /EF</option>
              <option value="HANDEBOL - 6º ao 8º /EF">HANDEBOL - 6º ao 8º /EF</option>
              <option value="HANDEBOL - 9º /EF ao 3º/E. Médio">HANDEBOL - 9º /EF ao 3º/E. Médio</option>
              <option value="JUDÔ - 3º e 4º / EF">JUDÔ - 3º e 4º / EF</option>
              <option value="JUDÔ - 5º e 6 º /EF">JUDÔ - 5º e 6 º /EF</option>
              <option value="JUDÔ - 7º ao 9º /EF">JUDÔ - 7º ao 9º /EF</option>
              <option value="JUDÔ -1° e 2º /EF">JUDÔ -1° e 2º /EF</option>
              <option value="VOLEIBOL - 3º ao 5ª /EF">VOLEIBOL - 3º ao 5ª /EF</option>
              <option value="VOLEIBOL - 6º ao 9º /EF">VOLEIBOL - 6º ao 9º /EF</option>
              <option value="XADREZ - 2º ao 4º /EF">XADREZ - 2º ao 4º /EF</option>
              <option value="XADREZ - 5º ao 8º /EF">XADREZ - 5º ao 8º /EF</option>
              

            </select>
          </div>

          <div className='mb-5' onChange={onCulturalValueChange}>
            <label required htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Escolha uma atividade cultural: </label>
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="Não se aplica">Não se aplica</option> 
              <option value="Coral - 1º e 2º /EF">Coral - 1º e 2º /EF</option> 
              <option value="Coral -  3º /EF ao E. Médio">Coral -  3º /EF ao E. Médio</option>
              <option value="Flauta - 2º ao 5º /EF">Flauta - 2º ao 5º /EF</option>
              <option value="Ukulele - 5º /EF ao E. Médio">Ukulele - 5º /EF ao E. Médio</option>
              <option value="Desenho Artístico - 4º e 5º /EF">Desenho Artístico - 4º e 5º /EFF</option>
              <option value="Desenho Artístico - 6º /EF ao E. Médio">Desenho Artístico - 6º /EF ao E. Médio</option>
              
            
            </select>
          </div>

          <div className='mb-5' onChange={onOptativaValueChange}>
            <label required htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Escolha uma atividade optativa: </label>
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="Não se aplica">Não se aplica</option> 
              <option value="BASQUETE - 3º ao 5º /EF">BASQUETE - 3º ao 5º /EF</option> 
              <option value="BASQUETE - 6º ao 8º /EF">BASQUETE - 6º ao 8º /EF</option>
              <option value="BASQUETE - 9º/EF ao 3º E. Médio">BASQUETE - 9º/EF ao 3º E. Médio</option>
              <option value="CAPOEIRA - 1º e 2º /EF">CAPOEIRA - 1º e 2º /EF</option>
              <option value="CAPOEIRA - 3º /EF">CAPOEIRA - 3º /EF</option>
              <option value="CAPOEIRA - 4º e 5º /EF">CAPOEIRA - 4º e 5º /EF</option>
              <option value="CAPOEIRA - 6º ao 9º /EF">CAPOEIRA - 6º ao 9º /EF</option>
              <option value="ESCOLA DA BOLA - 1º /EF">ESCOLA DA BOLA - 1º /EF</option>
              <option value="ESCOLA DA BOLA - 2º/EF">ESCOLA DA BOLA - 2º/EF</option>
              <option value="FUTSAL (masc) - 5º /EF">FUTSAL (masc) - 5º /EF</option>
              <option value="FUTSAL (masc) - 6º e 7º /EF">FUTSAL (masc) - 6º e 7º /EF</option>
              <option value="FUTSAL (masc) - 8º e 9º /EF">FUTSAL (masc) - 8º e 9º /EF</option>
              <option value="FUTSAL (masc) - E. Médio">FUTSAL (masc) - E. Médio</option>
              <option value="FUTSAL (misto) - 1º e 2º / EF">FUTSAL (misto) - 1º e 2º / EF</option>
              <option value="FUTSAL (misto)- 3º e 4º EF">FUTSAL (misto)- 3º e 4º EF</option>
              <option value="HANDEBOL - 3º ao 5º /EF">HANDEBOL - 3º ao 5º /EF</option>
              <option value="HANDEBOL - 6º ao 8º /EF">HANDEBOL - 6º ao 8º /EF</option>
              <option value="HANDEBOL - 9º /EF ao 3º/E. Médio">HANDEBOL - 9º /EF ao 3º/E. Médio</option>
              <option value="JUDÔ - 3º e 4º / EF">JUDÔ - 3º e 4º / EF</option>
              <option value="JUDÔ - 5º e 6 º /EF">JUDÔ - 5º e 6 º /EF</option>
              <option value="JUDÔ - 7º ao 9º /EF">JUDÔ - 7º ao 9º /EF</option>
              <option value="JUDÔ -1° e 2º /EF">JUDÔ -1° e 2º /EF</option>
              <option value="VOLEIBOL - 3º ao 5ª /EF">VOLEIBOL - 3º ao 5ª /EF</option>
              <option value="VOLEIBOL - 6º ao 9º /EF">VOLEIBOL - 6º ao 9º /EF</option>
              <option value="XADREZ - 2º ao 4º /EF">XADREZ - 2º ao 4º /EF</option>
              <option value="XADREZ - 5º ao 8º /EF">XADREZ - 5º ao 8º /EF</option>
              <option value="Coral - 1º e 2º /EF">Coral - 1º e 2º /EF</option> 
              <option value="Coral -  3º /EF ao E. Médio">Coral -  3º /EF ao E. Médio</option>
              <option value="Flauta - 2º ao 5º /EF">Flauta - 2º ao 5º /EF</option>
              <option value="Ukulele - 5º /EF ao E. Médio">Ukulele - 5º /EF ao E. Médio</option>
              <option value="Desenho Artístico - 4º e 5º /EF">Desenho Artístico - 4º e 5º /EFF</option>
              <option value="Desenho Artístico - 6º /EF ao E. Médio">Desenho Artístico - 6º /EF ao E. Médio</option>
              
            
            </select>
          </div>
          
        <div className='text-sm text-justify mb-6'>Em caso de modificação de algum dado cadastral dos responsáveis que
          assinaram o contrato para o ano de 2022, solicitamos, por gentileza, a sinalização com o
          encaminhamento dos novos dados para o e-mail: secretaria@cambauba.org.br. <div className='mt-2'>Na hipótese de dúvidas, estaremos à disposição para esclarecimentos através do e-mail: matriculas2023@cambauba.org.br</div></div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar</button>
      </form>
    </div>
  )
}
