import { IOngsRepository } from '../repositories/ong-repository'
import { IPetsRepository } from '../repositories/pet-repository'

interface SearchPetUseCaseRequest {
  city: string
  uf: string
  age?: string
  size?: string
  energy?: string
}

interface SearchPetUseCaseResponse {
  id: string
  name: string
}

export class SearchPetUseCase {
  constructor(
    private petsRepository: IPetsRepository,
    private ongsRepository: IOngsRepository,
  ) {}

  async execute({
    city,
    uf,
    age,
    size,
    energy,
  }: SearchPetUseCaseRequest): Promise<SearchPetUseCaseResponse[]> {
    const ongs = await this.ongsRepository.findManyByCityAndUf(city, uf)
    const formatOngsId = ongs.map((ong) => ong.id)

    const pets = await this.petsRepository.findManyByOngId(
      formatOngsId,
      age,
      size,
      energy,
    )

    return pets
  }
}
