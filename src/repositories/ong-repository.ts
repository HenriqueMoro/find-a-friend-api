import { Prisma, Ong } from '@prisma/client'

export interface IOngsRepository {
  findByEmail(email: string): Promise<Ong | null>
  findManyByCityAndUf(city: string, uf: string): Promise<any[]>
  findById(id: string): Promise<Ong | null>
  create(data: Prisma.OngCreateInput): Promise<Ong>
}
