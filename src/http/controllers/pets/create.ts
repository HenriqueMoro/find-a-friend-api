import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreatePetUseCase } from '../../../use-cases/factories/make-create-pet-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const createPetBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.enum(['Filhote', 'Adulto', 'Velho']),
    size: z.enum(['Pequeno', 'Medio', 'Grande']),
    energy: z.enum(['Baixa', 'Media', 'Alta']),
  })

  const { name, description, age, size, energy } = createPetBodySchema.parse(
    request.body,
  )

  const createPetUseCase = makeCreatePetUseCase()

  await createPetUseCase.execute({
    name,
    description,
    age,
    size,
    energy,
    ong_id: request.user.sub,
  })

  return reply.status(201).send()
}
