import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@streamx.com' },
    update: {},
    create: {
      email: 'admin@streamx.com',
      name: 'مدير النظام',
      password: 'admin123',
      role: 'ADMIN',
    },
  })

  const testUser = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      email: 'user@test.com',
      name: 'مستخدم تجريبي',
      password: 'user123',
      role: 'USER',
    },
  })

  console.log('Admin user created:', adminUser.email)
  console.log('Test user created:', testUser.email)
  console.log('\nLogin credentials:')
  console.log('Admin: admin@streamx.com / admin123')
  console.log('User: user@test.com / user123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })