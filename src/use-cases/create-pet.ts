import { Pet } from '@prisma/client'
import { IPetsRepository } from '../repositories/pet-repository'

interface CreatePetUseCaseRequest {
  name: string
  description: string
  age: string
  size: string
  energy: string
  ong_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private snackRepository: IPetsRepository) {}

  async execute({
    name,
    description,
    age,
    size,
    energy,
    ong_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.snackRepository.create({
      name,
      description,
      age,
      size,
      energy,
      ong_id,
    })

    return {
      pet,
    }
  }
}
