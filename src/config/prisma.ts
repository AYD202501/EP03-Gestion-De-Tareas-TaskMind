/* eslint-disable no-var */
import { PrismaClient } from '@prisma/client';

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

const createPrismaClient = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = createPrismaClient();
} else {
  // En desarrollo, usar singleton para hot reload
  if (!global.prismaGlobal) {
    global.prismaGlobal = createPrismaClient();
  }
  prisma = global.prismaGlobal;
}

// Manejar limpieza en el cierre
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export default prisma;