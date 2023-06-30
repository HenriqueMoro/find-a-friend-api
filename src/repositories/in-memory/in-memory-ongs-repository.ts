import { Ong, Prisma } from '@prisma/client'
import { IOngsRepository } from '../ong-repository'
import { randomUUID } from 'crypto'

export class InMemoryOngsRepository implements IOngsRepository {
  public items: Ong[] = []

  async findById(id: string) {
    const ong = this.items.find((item) => item.id === id)

    if (!ong) {
      return null
    }

    return ong
  }

  async findByEmail(email: string) {
    const ong = this.items.find((item) => item.email === email)

    if (!ong) {
      return null
    }

    return ong
  }

  async create(data: Prisma.OngCreateInput) {
    const ong = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      person_in_charge: data.person_in_charge,
      phone: data.phone,
      country: data.country,
      uf: data.uf,
      city: data.city,
      district: data.district,
      street: data.street,
      address_number: data.address_number,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(ong)
    return ong
  }

  async findManyByCityAndUf(city: string, uf: string): Promise<any[]> {
    return this.items.filter((ongs) => ongs.city === city && ongs.uf === uf)
  }
}
