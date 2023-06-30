import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchPetUseCase } from '../../../use-cases/factories/make-search-pet-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const validatePetParamsSchema = z.object({
    city: z.string(),
    uf: z.string().max(2).toUpperCase(),
  })

  const validatePetQuerySchema = z.object({
    age: z.enum(['Filhote', 'Adulto', 'Velho']).optional(),
    size: z.enum(['Pequeno', 'Medio', 'Grande']).optional(),
    energy: z.enum(['Baixa', 'Media', 'Alta']).optional(),
  })

  const { age, size, energy } = validatePetQuerySchema.parse(request.query)

  const { city, uf } = validatePetParamsSchema.parse(request.params)

  const searchPetUseCase = makeSearchPetUseCase()

  const pets = await searchPetUseCase.execute({
    city,
    uf,
    age,
    size,
    energy,
  })

  return reply.status(200).send({ pets })
}
