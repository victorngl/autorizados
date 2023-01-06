
import React, { useEffect, useState } from 'react';
/* Material Tailwind Imports */
import {
  Chip,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";



export default function CardForm({ usuario, setResponsavel }) {

  const handleClick = (event, index) => {
    event.preventDefault();
    setResponsavel(usuario[index]);
  }

  function isEmptyObject(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }


  return (
    <div>
      {!isEmptyObject(usuario) ?
        <div className='md:flex  md:w-10/12gap-3'>
          {usuario.map((user, index) => (
           
            
            <Card key={user.naluno} className="mb-5 shadow-xl border-2">
              <CardBody className="text-left md:h-80 sm:h-80">
                <Typography variant="h6" className="mb-4 text-center">
                  
                  {user.aluno.resposta == 0 ? (<Chip className='m-5' value="Incrição Pendente" />):(<Chip color='green' className='m-5' value="Incrição Realizada" />)}
                  
                </Typography>
                

                <ul className='mb-15 text-center font-bold'>
                  <li className='mb-5'>{user.aluno.nome}</li>
                  
                </ul>

               
                
                <div className='mt-8 mb-10 text-justify pr-10 pl-10'>
                  <div className='font-medium'>A arte da educação deve ser cultivada em todos os aspectos, para se tornar uma ciência construída a partir do conhecimento profundo da natureza humana.</div>
                  <div className='mt-2 text-right text-[16px]'>Johann Heinrich Pestalozzi</div>
                </div>
               
                
              </CardBody>
              <CardFooter divider className="text-center py-3">

                {user.aluno.resposta == 0 &&
                  <Button onClick={e => handleClick(e, index)} color='green'>Realizar Inscrição</Button>
                  }

              </CardFooter>
            </Card>
          ))}
        </div>
        : <div className='p-4 text-justify text-lg'>Não existem alunos elegíveis para inscrição em atividades relacionados a este usuário. Entre em contato com suporte@cambauba.org.br</div>}
    </div>
  )
}