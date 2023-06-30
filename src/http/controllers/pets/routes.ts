import { FastifyInstance } from 'fastify'
import { create } from './create'
import { search } from './search'
import { get } from './get'

export async function petRoutes(app: FastifyInstance) {
  app.post('/pets', create)
  app.get('/pets/search/:city/:uf', search)
  app.get('/pets/:id', get)
}
