import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('Test123456!', 10);

  const user = await prisma.user.update({
    where: {
      email: 'admin@scentora.com',
    },
    data: {
      password,
    },
  });

  console.log('Password reset for:', user.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());