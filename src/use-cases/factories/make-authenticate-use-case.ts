import { PrismaOngsRepository } from '../../repositories/prisma/prisma-ongs-repository'
import { AuthenticateUseCase } from '../authenticate-ong'

export function makeAuthenticateUseCase() {
  const ongsRepository = new PrismaOngsRepository()
  const authenticateUseCase = new AuthenticateUseCase(ongsRepository)

  return authenticateUseCase
}
