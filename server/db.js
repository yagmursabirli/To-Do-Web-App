// server/db.js
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis

export const prisma =
    globalForPrisma.prisma || 
        new PrismaClient({
             log: ['warn', 'error'], 
        })

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
}   

export async function testDbConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`
  } catch (err) {
    console.error('DB bağlantısı düştü, yeniden bağlanılıyor...')
    await prisma.$disconnect()
    await prisma.$connect()
  }
}


const shutdown = async (signal) => {
    try {
        console.log(`\n[DB] ${signal}, prisma disconnect`)
        await prisma.$disconnect()
        process.exit(0)
    } catch (err) {
        console.error('[DB] disconnect failure', err)
        process.exit(1)
    }
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('beforeExit', async () => {
  await prisma.$disconnect()
})