// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma, PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body

  if (!body.resposta) {

    return res.status(400).json({ error: 'Resposta inválida' })
  }

  const prisma = new PrismaClient()

  let dataJsonRelatorio = {};

  if (body.resposta) {
    dataJsonRelatorio = { ...dataJsonRelatorio, atividade_esportiva: body.atividade_esportiva}
    dataJsonRelatorio = { ...dataJsonRelatorio, atividade_optativa: body.atividade_optativa }
    dataJsonRelatorio = { ...dataJsonRelatorio, atividade_cultural: body.atividade_cultural }
    dataJsonRelatorio = { ...dataJsonRelatorio, atividade_prioridade: body.atividade_prioridade }
    dataJsonRelatorio = { ...dataJsonRelatorio, resposta: body.resposta }
    dataJsonRelatorio = { ...dataJsonRelatorio, user_registro: body.user_registro }
    dataJsonRelatorio = { ...dataJsonRelatorio, date_registro: body.date_registro }
    
  }

  const updateAluno = await prisma.alunos.update({
    where: {
      naluno: body.responsavel.naluno,
    },
    data: dataJsonRelatorio,
    include: {
      responsaveis: true, // Return all fields
    },
  })

  
  const updateUsuario = await prisma.responsaveis.findMany({
    where: {
      username: body.responsavel.username,
    },
    include: {
      aluno: true, // Return all fields
    },
  })

  return res.status(200).json({aluno: updateAluno, usuario: updateUsuario})

}

