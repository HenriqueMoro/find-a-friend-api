import { hash } from 'bcryptjs'
import { describe, it, expect, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate-ong'
import { InMemoryOngsRepository } from '../repositories/in-memory/in-memory-ongs-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let ongsRepository: InMemoryOngsRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    ongsRepository = new InMemoryOngsRepository()
    authenticateUseCase = new AuthenticateUseCase(ongsRepository)
  })

  it('should be able to authenticate', async () => {
    await ongsRepository.create({
      name: 'Cachorro Legal',
      person_in_charge: 'John Doe',
      email: 'cachorrolegal@example.com',
      phone: '+55279999999999',
      country: 'Brasil',
      uf: 'ES',
      city: 'Vila Velha',
      district: 'Praia de Itaparica',
      street: 'Avenida da Praia',
      address_number: 2135,
      password_hash: await hash('123456', 6),
    })

    const { ong } = await authenticateUseCase.execute({
      email: 'cachorrolegal@example.com',
      password: '123456',
    })

    expect(ong.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      authenticateUseCase.execute({
        email: 'cachorrolegal@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await ongsRepository.create({
      name: 'Cachorro Legal',
      person_in_charge: 'John Doe',
      email: 'cachorrolegal@example.com',
      phone: '+55279999999999',
      country: 'Brasil',
      uf: 'ES',
      city: 'Vila Velha',
      district: 'Praia de Itaparica',
      street: 'Avenida da Praia',
      address_number: 2135,
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      authenticateUseCase.execute({
        email: 'cachorrolegal@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
