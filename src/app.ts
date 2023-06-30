import fastify from 'fastify'
import { ongRoutes } from './http/controllers/ongs/routes'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import { petRoutes } from './http/controllers/pets/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(ongRoutes)
app.register(petRoutes)
