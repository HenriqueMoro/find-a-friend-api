import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { OngAlreadyExistsError } from '../../../use-cases/errors/ong-already-exists-error'
import { makeRegisterUseCase } from '../../../use-cases/factories/make-register-ong-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    person_in_charge: z.string(),
    phone: z.string(),
    country: z.string(),
    uf: z.string().max(2),
    city: z.string(),
    district: z.string(),
    street: z.string(),
    address_number: z.number(),
  })

  const ong = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute(ong)
  } catch (err) {
    if (err instanceof OngAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
