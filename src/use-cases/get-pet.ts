import { IOngsRepository } from '../repositories/ong-repository'
import { IPetsRepository } from '../repositories/pet-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface SearchPetUseCaseRequest {
  id: string
}

interface SearchPetUseCaseResponse {
  name: string
  description: string
  age: string
  size: string
  energy: string
  ong: {
    name: string
    email: string
    phone: string
    person_in_charge: string
    country: string
    uf: string
    city: string
    district: string
    street: string
    address_number: number
  }
}

export class GetPetUseCase {
  constructor(
    private petsRepository: IPetsRepository,
    private ongsRepository: IOngsRepository,
  ) {}

  async execute({
    id,
  }: SearchPetUseCaseRequest): Promise<SearchPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    const ong = await this.ongsRepository.findById(pet.ong_id)

    if (!ong) {
      throw new ResourceNotFoundError()
    }

    return {
      name: pet.name,
      description: pet.description,
      age: pet.age,
      size: pet.size,
      energy: pet.energy,
      ong: {
        name: ong.name,
        email: ong.email,
        phone: ong.phone,
        person_in_charge: ong.person_in_charge,
        country: ong.country,
        uf: ong.uf,
        city: ong.city,
        district: ong.district,
        street: ong.street,
        address_number: ong.address_number,
      },
    }
  }
}
