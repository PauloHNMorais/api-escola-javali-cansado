import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = {
    paulo: await prisma.user.create({
      data: {
        email: 'paulohnevesm37@gmail.com',
        firstName: 'Paulo H',
        lastName: 'N Morais',
      },
    }),
    joao: await prisma.user.create({
      data: {
        email: 'email1@gmail.com',
        firstName: 'Joao',
        lastName: 'Cicrano',
      },
    }),
    pedro: await prisma.user.create({
      data: {
        email: 'email2@gmail.com',
        firstName: 'Pedro',
        lastName: 'Cicrano',
      },
    }),
    alex: await prisma.user.create({
      data: {
        email: 'email3@gmail.com',
        firstName: 'Alex',
        lastName: 'Cicrano',
      },
    }),
  };

  const course = await prisma.course.create({
    data: {
      name: 'Sistemas de Informação',
    },
  });

  const member = await prisma.member.create({
    data: {
      userId: users.paulo.id,
      courseId: course.id,
      memberType: 2,
    },
  });
}

main();
