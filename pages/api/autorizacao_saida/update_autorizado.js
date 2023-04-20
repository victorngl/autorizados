// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '../../../lib/db'


export default async function handler(req, res) {
 
  // Get data submitted in request's body.
  const body = req.body

  if (!body.naluno) {

    return res.status(400).json({ error: 'Número do aluno inválido' })
  }

  const autorizados = await prisma.autorizados.findMany({
    where: {
      naluno: body.naluno,
    }
  })
  
  return res.status(200).json({ autorizados })

}