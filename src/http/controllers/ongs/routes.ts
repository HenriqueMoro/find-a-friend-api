import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'

export async function ongRoutes(app: FastifyInstance) {
  app.post('/ongs', register)
  app.post('/sessions', authenticate)
}
