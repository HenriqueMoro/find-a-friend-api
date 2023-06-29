export class OngAlreadyExistsError extends Error {
  constructor() {
    super('Email already exists.')
  }
}
