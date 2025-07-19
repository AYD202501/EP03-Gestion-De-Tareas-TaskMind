import { PrismaClient } from '@prisma/client';
declare global {
  var prismaGlobal: PrismaClient;
}
let prisma: PrismaClient;
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    // Esta opción es clave para Vercel:
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
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

export default prisma;