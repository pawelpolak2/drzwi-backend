import { z } from "zod"
import { trpc } from "../trpc"
import { authorize } from "../utils/auth"

const getVaultInputType = z.object({
  password: z.string(),
})

export const userEndpoint = trpc.procedure.input(getVaultInputType).query(async (opts) => {
  const { password } = opts.input
  return authorize(password)
})
