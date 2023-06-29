import { Ong } from '@prisma/client'
import { compare } from 'bcryptjs'
import { IOngsRepository } from '../repositories/ong-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  ong: Ong
}

export class AuthenticateUseCase {
  constructor(private ongsRepository: IOngsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const ong = await this.ongsRepository.findByEmail(email)

    if (!ong) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, ong.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      ong,
    }
  }
}
