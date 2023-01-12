// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '../lib/db'

export default async function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body


  if (!body.cpf && !body.user_wpensar) {

    return res.status(400).json({ error: 'Credenciais inválidas' })
  }

  const login = await prisma.responsaveis.findMany({
    where: {
      cpf: body.cpf,
      username: body.user_wpensar,
    },
    include: {
      aluno: true, // Return all fields
    },
  })
  
  
  return res.status(200).json({ data: login })

}