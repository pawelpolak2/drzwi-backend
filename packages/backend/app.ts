import Fastify from 'fastify'
import cors from '@fastify/cors'
import { authorize } from './utils/auth'
import { closeDoor, getDoorState, openDoor } from './utils/doorState'

const fastify = Fastify({
  logger: true,
})
fastify.register(cors, {
  origin: '*',
})

// open the door
fastify.get('/open', function (request, reply) {
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
fastify.get('/close', function (request, reply) {
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
fastify.get('/status', function (request, reply) {
  reply.send(getDoorState())
})

// Run the server!
fastify.listen({ port: 3000, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening!
})
