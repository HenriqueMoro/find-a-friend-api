import { prisma } from '../../lib/prisma'
import { Prisma } from '@prisma/client'

import { IPetsRepository } from '../pet-repository'

export class PrismaPetsRepository implements IPetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findManyByOngId(
    ongs_ids: string[],
    age?: string,
    size?: string,
    energy?: string,
  ) {
    const pets = await prisma.pet.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        ong_id: { in: ongs_ids },
        age,
        size,
        energy,
      },
    })

    return pets
  }
}
