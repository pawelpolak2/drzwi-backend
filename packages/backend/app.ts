import Fastify from 'fastify'
import cors from '@fastify/cors'
import fastifyStatic from '@fastify/static'
import path from 'path'
import { PrismaClient } from 'database'
import {
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions,
} from '@trpc/server/adapters/fastify';
import { appRouter } from './src/router'
import { authorize } from './src/utils/auth'
import { registerArduinoApi } from './src/endpoints/arduino'

const fastify = Fastify({
  logger: false,
})
fastify.register(cors, {
  origin: '*',
})

fastify.register(fastifyTRPCPlugin, {
  prefix: '/',
  trpcOptions: { router: appRouter },
})

// Expose a simpler API for the arduino, so it doesn't have to parse JSON
registerArduinoApi(fastify)

fastify.listen({ port: 3000, host: '0.0.0.0' });
