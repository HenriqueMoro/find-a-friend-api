import { PrismaOngsRepository } from '../../repositories/prisma/prisma-ongs-repository'
import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets-repository'

import { SearchPetUseCase } from '../search-pet'

export function makeSearchPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const ongsRepository = new PrismaOngsRepository()
  const searchPetsUseCase = new SearchPetUseCase(petsRepository, ongsRepository)

  return searchPetsUseCase
}
