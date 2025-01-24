import type { PrismaClient } from '../generated/prisma'

export type PrismaTransactionClient = Parameters<Parameters<PrismaClient['$transaction']>[0]>[0]