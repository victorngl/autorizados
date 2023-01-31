// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '../../lib/db'

export default async function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body

  if (!body.cpf_responsavel) {

    return res.status(400).json({ error: 'CPF do Responsável Inválido' })
  }

  const getAlunos = await prisma.alunos_Responsaveis.findMany({
    where: {
      cpf_responsavel: body.cpf_responsavel,
    },
    include: {
      alunos: true,
      usuarios: true,
    },
  })

  return res.status(200).json({ alunos: getAlunos })

}