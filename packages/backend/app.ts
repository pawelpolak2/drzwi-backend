import Fastify from 'fastify'
import cors from '@fastify/cors'
import fastifyStatic from '@fastify/static'
import path from 'path'
import { authorize } from './utils/auth.js'
import { closeDoor, getDoorState, openDoor } from './utils/doorState.js'

const fastifyBackend = Fastify({
  logger: false,
})
fastifyBackend.register(cors, {
  origin: '*',
})

// open the door
fastifyBackend.get('/open', function (request, reply) {
  const params = request.query as { password: string }
  const login = authorize(params.password)
  if (login.success) {
    openDoor()
    reply.send({ success: true })
  } else {
    reply.send({ success: false })
  }
})

// close the door
fastifyBackend.get('/close', function (request, reply) {
  const params = request.query as { password: string }
  const login = authorize(params.password)
  if (login.success && login.admin) {
    closeDoor()
    reply.send({ success: true })
  } else {
    reply.send({ success: false })
  }
});

// get door status
fastifyBackend.get('/status', function (request, reply) {
  reply.send(getDoorState())
})

// Run the server!
fastifyBackend.listen({ port: 3000, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastifyBackend.log.error(err)
    process.exit(1)
  }
  // Server is now listening!
})

// Serve the frontend
const fastifyFrontend = Fastify({
  logger: true,
})
fastifyFrontend.register(fastifyStatic, {
  root: path.resolve('../../apps/frontend/dist')
})


fastifyFrontend.get('/', function (request, reply) {
  return reply.sendFile('index.html')
})

fastifyFrontend.listen({ port: 80, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastifyFrontend.log.error(err)
    process.exit(1)
  }
  // Server is now listening!
})
