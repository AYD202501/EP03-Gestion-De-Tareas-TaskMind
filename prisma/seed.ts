import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'Administrator'
      },
      {
        name: 'Project Manager',
        email: 'pm@example.com',
        password: 'pm123',
        role: 'Project_Manager'
      },
      {
        name: 'Collaborator',
        email: 'colab@example.com',
        password: 'colab123',
        role: 'Colaborator'
      }
    ],
    skipDuplicates: true
  })
  console.log('✅ Seed completo')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
