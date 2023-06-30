import { PrismaOngsRepository } from '../../repositories/prisma/prisma-ongs-repository'
import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets-repository'
import { GetPetUseCase } from '../get-pet'

export function makeGetPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const ongsRepository = new PrismaOngsRepository()
  const getPetsUseCase = new GetPetUseCase(petsRepository, ongsRepository)

  return getPetsUseCase
}
