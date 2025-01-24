import { prisma } from "./prismClient";
import crypto from "crypto";

export async function getUser(password: string) {
  return prisma.user.findFirst({
    select: {
      name: true,
      isAdmin: true,
    },
    where: {
      password_hash: crypto.createHash('sha256').update(password).digest('hex')
    },
  })
}
