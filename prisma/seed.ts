import prisma from "../src/lib/prisma"
import { BcryptPassword } from "../src/utils/bcryptPassword"

async function main() {
  const hashedPassword = await BcryptPassword.hash('12345678')

  await prisma.user.create({
    data: {
      email: 'alice@gmail.com',
      username: 'alice',
      password: hashedPassword
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })