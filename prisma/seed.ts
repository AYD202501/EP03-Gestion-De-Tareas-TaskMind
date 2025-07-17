import { PrismaClient, Enum_RoleName } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.user.createMany({
    data: [
      {
        email: 'admin@example.com',
        password: 'admin123',
        role: Enum_RoleName.ADMIN
      },
      {
        email: 'pm@example.com',
        password: 'pm123',
        role: Enum_RoleName.PROJECT_MANAGER
      },
      {
        email: 'colab@example.com',
        password: 'colab123',
        role: Enum_RoleName.COLLABORATOR
      }
    ],
    skipDuplicates: true
  })
  console.log('✅ Seed completo')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
