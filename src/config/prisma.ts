/* eslint-disable no-var */
import { PrismaClient } from '@prisma/client';

declare global {
  var prismaGlobal: PrismaClient;
}
<<<<<<< HEAD

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // En producción, crear nueva instancia cada vez para evitar problemas serverless
  prisma = new PrismaClient({
=======
let prisma: PrismaClient;
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    // Esta opción es clave para Vercel:
>>>>>>> parent of 4779758 (feat: limit login access)
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
<<<<<<< HEAD
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

=======
    // Evita el uso de prepared statements (workaround seguro para serverless)
    // Puedes quitar esto si usas Prisma Accelerate
    log: ['error'],
  });
} else {
  if (!global.prismaGlobal) {
    global.prismaGlobal = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    log: ['error'],
  });
  }
  prisma = global.prismaGlobal;
}
>>>>>>> parent of 4779758 (feat: limit login access)
export default prisma;