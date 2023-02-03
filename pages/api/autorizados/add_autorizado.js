// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "../../../lib/db"


export default async function handler(req, res) {
 
  // Get data submitted in request's body.
  const body = req.body

  if (!body.documento) {

    return res.status(400).json({ error: 'Dados do autorizado inválido' })
  }

  const addAutorizado = await prisma.autorizados.create({
    data: {
      nome: body.nome,
      documento: body.documento,
      parentesco: body.parentesco,
      telefone: body.telefone,
      celular: body.celular,
      naluno: body.naluno,
      user_id: body.user_id,
    },
  })

  return res.status(200).json({ autorizado: addAutorizado })

}