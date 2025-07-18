/* eslint-disable no-var */
import { PrismaClient } from '@prisma/client';

declare global {
  var prismaGlobal: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // En producción, crear nueva instancia cada vez para evitar problemas serverless
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    log: ['error'],
  });
} else {
  // En desarrollo, usar singleton para evitar múltiples conexiones
  if (!global.prismaGlobal) {
    global.prismaGlobal = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
      log: ['query', 'error', 'warn'],
    });
  }
  prisma = global.prismaGlobal;
}

export default prisma;