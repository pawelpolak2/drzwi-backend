import { z } from "zod"
import { trpc } from "../trpc"
import { authorize } from "../utils/auth"
import { openDoor } from "../utils/doorState"

const getVaultInputType = z.object({
  password: z.string(),
})

export const openEndpoint = trpc.procedure.input(getVaultInputType).query(async (opts) => {
  const { password } = opts.input
  const user = await authorize(password)
  if(user.success) openDoor()
  return user  
})
