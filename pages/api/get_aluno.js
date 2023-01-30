// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '../lib/db'

export default async function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body

  if (!body.naluno) {

    return res.status(400).json({ error: 'Número do aluno inválido' })
  }

  const getAluno = await prisma.alunos.findMany({
    where: {
      naluno: body.naluno,
    },
    include: {
      autorizados: true,
      usuarios: true,
    },
  })

  return res.status(200).json({ aluno: getAluno })

}