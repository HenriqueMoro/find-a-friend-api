import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'
import { makeGetPetUseCase } from '../../../use-cases/factories/make-get-pet-use-case'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const validatePetParamsSchema = z.object({
    id: z.string(),
  })
  const { id } = validatePetParamsSchema.parse(request.params)

  try {
    const getPetUseCase = makeGetPetUseCase()
    const pet = await getPetUseCase.execute({
      id,
    })

    return pet
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
