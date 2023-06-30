import { expect, describe, it, beforeEach } from 'vitest'
import { randomUUID } from 'crypto'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet'

let petRepository: InMemoryPetsRepository
let petUseCase: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetsRepository()
    petUseCase = new CreatePetUseCase(petRepository)
  })

  it('should be able create a pet', async () => {
    const { pet } = await petUseCase.execute({
      name: 'Friozinho',
      description: 'Grande cachorro',
      age: 'Filhote',
      size: 'Medio',
      energy: 'Baixa',
      ong_id: randomUUID(),
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
