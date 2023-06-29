import { compare } from 'bcryptjs'
import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterUseCase } from './register-ong'
import { InMemoryOngsRepository } from '../repositories/in-memory/in-memory-ongs-repository'
import { OngAlreadyExistsError } from './errors/ong-already-exists-error'

let ongsRepository: InMemoryOngsRepository
let registerUseCase: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    ongsRepository = new InMemoryOngsRepository()
    registerUseCase = new RegisterUseCase(ongsRepository)
  })

  it('should to register', async () => {
    const { ong } = await registerUseCase.execute({
      name: 'Cachorro Legal',
      person_in_charge: 'John Doe',
      email: 'cachorrolegal@gmail.com',
      phone: '+55279999999999',
      country: 'Brasil',
      uf: 'ES',
      city: 'Vila Velha',
      district: 'Praia de Itaparica',
      street: 'Avenida da Praia',
      address_number: 2135,
      password: '1234567',
    })

    expect(ong.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { ong } = await registerUseCase.execute({
      name: 'Cachorro Legal',
      person_in_charge: 'John Doe',
      email: 'cachorrolegal@gmail.com',
      phone: '+55279999999999',
      country: 'Brasil',
      uf: 'ES',
      city: 'Vila Velha',
      district: 'Praia de Itaparica',
      street: 'Avenida da Praia',
      address_number: 2135,
      password: '1234567',
    })
    const isPasswordCorrectlyHashed = await compare(
      '1234567',
      ong.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await registerUseCase.execute({
      name: 'Cachorro Legal',
      person_in_charge: 'John Doe',
      email,
      phone: '+55279999999999',
      country: 'Brasil',
      uf: 'ES',
      city: 'Vila Velha',
      district: 'Praia de Itaparica',
      street: 'Avenida da Praia',
      address_number: 2135,
      password: '1234567',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'Cachorro Legal',
        person_in_charge: 'John Doe',
        email,
        phone: '+55279999999999',
        country: 'Brasil',
        uf: 'ES',
        city: 'Vila Velha',
        district: 'Praia de Itaparica',
        street: 'Avenida da Praia',
        address_number: 2135,
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(OngAlreadyExistsError)
  })
})
