import { Ong } from '@prisma/client'
import { hash } from 'bcryptjs'
import { IOngsRepository } from '../repositories/ong-repository'
import { OngAlreadyExistsError } from './errors/ong-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  person_in_charge: string
  email: string
  phone: string
  country: string
  uf: string
  city: string
  district: string
  street: string
  address_number: number
  password: string
}

interface RegisterUseCaseResponse {
  ong: Ong
}

export class RegisterUseCase {
  constructor(private usersRepository: IOngsRepository) {}

  async execute({
    name,
    person_in_charge,
    email,
    phone,
    country,
    uf,
    city,
    district,
    street,
    address_number,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const ongWithSameEmail = await this.usersRepository.findByEmail(email)

    if (ongWithSameEmail) {
      throw new OngAlreadyExistsError()
    }

    const ong = await this.usersRepository.create({
      name,
      person_in_charge,
      password_hash,
      email,
      phone,
      country,
      uf,
      city,
      district,
      street,
      address_number,
    })

    return {
      ong,
    }
  }
}
