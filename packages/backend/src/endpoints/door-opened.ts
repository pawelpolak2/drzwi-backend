import { z } from "zod"
import { trpc } from "../trpc"
import { authorize } from "../utils/auth"
import { reportDoorOpened } from "../utils/doorState"

const getVaultInputType = z.object({
  password: z.string(),
})

export const dooOpenedEndpoint = trpc.procedure.input(getVaultInputType).query(async (opts) => {
  const { password } = opts.input
  const user = await authorize(password)
  if(user.success && user.isAdmin) reportDoorOpened()
  return user  
})
