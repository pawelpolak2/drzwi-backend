import { z } from "zod"
import { trpc } from "../trpc"
import { authorize } from "../utils/auth"
import { getDoorState } from "../utils/doorState"

export const statusEndpoint = trpc.procedure.query(async (opts) => {
  return getDoorState()
})
