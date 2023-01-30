// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '../../lib/db'


export default async function handler(req, res) {
 
  const body = req.body

  if (!body.autorizado_id) {

    return res.status(400).json({ error: 'Id do Autorizado Inválido' })
  }

  const autorizados = await prisma.autorizados.delete({
    where: {
      id: body.autorizado_id,
    }
  })
  
  return res.status(200).json({ autorizados })

}