// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '../../lib/db'

export default async function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body

  if (!body) {
    return res.status(400).json({ error: 'Requisição Inválida' })
  }

  const getAlunos = await prisma.alunos.findMany({
    include: {
      autorizados: true,
      usuarios: true,
    },
  })

  return res.status(200).json({ alunos: getAlunos })

}