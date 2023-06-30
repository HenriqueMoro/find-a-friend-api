import { Prisma, Pet } from '@prisma/client'

export interface IPetsRepository {
  findById(id: string): Promise<Pet | null>
  findManyByOngId(
    ongs_ids: string[],
    age?: string,
    size?: string,
    energy?: string,
  ): Promise<any[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
