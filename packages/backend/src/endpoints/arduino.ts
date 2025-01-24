import { FastifyInstance } from "fastify";
import { authorize } from "../utils/auth";
import { getDoorState, reportDoorOpened } from "../utils/doorState";

export function registerArduinoApi(fastify: FastifyInstance) {
  fastify.get('/report-opened', async (request, reply) => {
    const params = request.query as { password: string }
    const login = await authorize(params.password)
    if (login.success && login.isAdmin) {
      reportDoorOpened()
    }
    reply.send(login)
  });
  
  fastify.get('/status', (_, reply) => {
    reply.send(getDoorState())
  })
}
