import { prisma } from '../../lib/prisma'
import { Prisma } from '@prisma/client'

import { IOngsRepository } from '../ong-repository'

export class PrismaOngsRepository implements IOngsRepository {
  async findByEmail(email: string) {
    const ong = await prisma.ong.findUnique({
      where: {
        email,
      },
    })

    return ong
  }

  async create(data: Prisma.OngCreateInput) {
    const ong = await prisma.ong.create({
      data,
    })

    return ong
  }

  async findById(id: string) {
    const ong = await prisma.ong.findUnique({
      where: {
        id,
      },
    })

    return ong
  }

  async findManyByCityAndUf(city: string, uf: string) {
    const ongs = await prisma.ong.findMany({
      select: {
        id: true,
      },
      where: {
        city,
        uf,
      },
    })

    return ongs
  }
}
