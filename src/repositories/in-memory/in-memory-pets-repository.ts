import { Prisma, Pet } from '@prisma/client'
import { IPetsRepository } from '../pet-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements IPetsRepository {
  public pets: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      age: data.age,
      size: data.size,
      energy: data.energy,
      ong_id: data.ong_id,
    }
    this.pets.push(pet)
    return pet
  }

  async findById(id: string) {
    const pet = this.pets.find((pet) => pet.id === id)
    return pet || null
  }

  async findManyByOngId(
    ongs_ids: string[],
    age?: string,
    size?: string,
    energy?: string,
  ) {
    return this.pets.filter((pets) => ongs_ids.includes(pets.ong_id))
  }
}
