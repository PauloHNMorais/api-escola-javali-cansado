import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

async function main() {
  const users = {
    paulo: await prisma.user.create({
      data: {
        email: 'paulohnevesm37@gmail.com',
        firstName: 'Paulo H',
        lastName: 'N Morais',
        password: await bcrypt.hash('12345', 10),
      },
    }),
    joao: await prisma.user.create({
      data: {
        email: 'email1@gmail.com',
        firstName: 'Joao',
        lastName: 'Cicrano',
        password: await bcrypt.hash('12345', 10),
      },
    }),
    pedro: await prisma.user.create({
      data: {
        email: 'email2@gmail.com',
        firstName: 'Pedro',
        lastName: 'Cicrano',
        password: await bcrypt.hash('12345', 10),
      },
    }),
    alex: await prisma.user.create({
      data: {
        email: 'email3@gmail.com',
        firstName: 'Alex',
        lastName: 'Cicrano',
        password: await bcrypt.hash('12345', 10),
      },
    }),
    joana: await prisma.user.create({
      data: {
        email: 'email4@gmail.com',
        firstName: 'Alex',
        lastName: 'Cicrano',
        password: await bcrypt.hash('12345', 10),
      },
    }),
  };

  const courses = {
    sisInf: await prisma.course.create({
      data: {
        name: 'Sistemas de Informação',
      },
    }),
    admini: await prisma.course.create({
      data: {
        name: 'Administração',
      },
    }),
  };

  const members = {
    paulo: await prisma.member.create({
      data: {
        userId: users.paulo.id,
        courseId: courses.sisInf.id,
        memberType: 2,
      },
    }),
    joana: await prisma.member.create({
      data: {
        userId: users.joana.id,
        courseId: courses.sisInf.id,
        memberType: 2,
      },
    }),
    joao: await prisma.member.create({
      data: {
        userId: users.joao.id,
        courseId: courses.sisInf.id,
        memberType: 1,
      },
    }),
    pedro: await prisma.member.create({
      data: {
        userId: users.pedro.id,
        courseId: courses.sisInf.id,
        memberType: 1,
      },
    }),
    alex: await prisma.member.create({
      data: {
        userId: users.alex.id,
        courseId: courses.sisInf.id,
        memberType: 1,
      },
    }),
  };

  const subjects = {
    engSof: await prisma.subject.create({
      data: {
        name: 'Engenharia de Software',
        ownerMember: {
          connect: {
            userId_courseId: {
              userId: users.paulo.id,
              courseId: courses.sisInf.id,
            },
          },
        },
      },
    }),
    teoAdm: await prisma.subject.create({
      data: {
        name: 'Teoria da Administração',
        ownerMember: {
          connect: {
            userId_courseId: {
              userId: users.paulo.id,
              courseId: courses.sisInf.id,
            },
          },
        },
      },
    }),
    calDif: await prisma.subject.create({
      data: {
        name: 'Cálculo Diferencial e Integral',
        ownerMember: {
          connect: {
            userId_courseId: {
              userId: users.paulo.id,
              courseId: courses.sisInf.id,
            },
          },
        },
      },
    }),
  };

  const courseSubject = await prisma.courseSubject.create({
    data: {
      courseId: courses.sisInf.id,
      subjectId: subjects.teoAdm.id,
    },
  });

  await prisma.subjectItem.create({
    data: {
      itemType: 1,
      title: 'Aulas',
      memberCreated: { connect: { id: members.paulo.id } },
      courseSubject: { connect: { id: courseSubject.id } },
      childrenSubjectItems: {
        create: [
          {
            itemType: 1,
            courseSubject: { connect: { id: courseSubject.id } },
            courseSubjectId: courseSubject.id,
            memberCreated: { connect: { id: members.paulo.id } },
            memberCreatedId: members.paulo.id,
            title: 'Fordismo e Taylorismo',
            childrenSubjectItems: {
              create: [
                {
                  itemType: 1,
                  courseSubject: { connect: { id: courseSubject.id } },
                  courseSubjectId: courseSubject.id,
                  memberCreated: { connect: { id: members.paulo.id } },
                  memberCreatedId: members.paulo.id,
                  title: 'Slides',
                  childrenSubjectItems: {
                    create: [
                      {
                        itemType: 2,
                        courseSubject: { connect: { id: courseSubject.id } },
                        courseSubjectId: courseSubject.id,
                        memberCreated: { connect: { id: members.paulo.id } },
                        memberCreatedId: members.paulo.id,
                        title: 'Fordismo',
                        subtitle: 'Resumo sobre o Fordismo',
                      },
                      {
                        itemType: 2,
                        courseSubject: { connect: { id: courseSubject.id } },
                        courseSubjectId: courseSubject.id,
                        memberCreated: { connect: { id: members.paulo.id } },
                        memberCreatedId: members.paulo.id,
                        title: 'Taylorismo',
                      },
                      {
                        itemType: 2,
                        courseSubject: { connect: { id: courseSubject.id } },
                        courseSubjectId: courseSubject.id,
                        memberCreated: { connect: { id: members.paulo.id } },
                        memberCreatedId: members.paulo.id,
                        title: 'Diagramas',
                      },
                    ],
                  },
                },
                {
                  itemType: 2,
                  courseSubject: { connect: { id: courseSubject.id } },
                  courseSubjectId: courseSubject.id,
                  memberCreated: { connect: { id: members.paulo.id } },
                  memberCreatedId: members.paulo.id,
                  title: 'Fordismo - Conceitos',
                },
              ],
            },
          },
        ],
      },
    },
  });
  await prisma.subjectItem.create({
    data: {
      itemType: 1,
      title: 'Atividades',
      courseSubjectId: courseSubject.id,
      memberCreatedId: members.paulo.id,
      childrenSubjectItems: {
        create: [
          {
            courseSubjectId: courseSubject.id,
            itemType: 1,
            memberCreatedId: members.paulo.id,
            title: '4Cs do Marketing',
            childrenSubjectItems: {
              create: [
                {
                  courseSubjectId: courseSubject.id,
                  itemType: 2,
                  memberCreatedId: members.paulo.id,
                  title: 'Questionário',
                  startDate: dayjs().startOf('day').toDate(),
                  endDate: dayjs().add(7, 'days').toDate(),
                },
                {
                  courseSubjectId: courseSubject.id,
                  itemType: 2,
                  memberCreatedId: members.paulo.id,
                  title: 'Avaliação',
                  startDate: dayjs().startOf('day').toDate(),
                  endDate: dayjs().endOf('day').toDate(),
                },
              ],
            },
          },
          {
            courseSubjectId: courseSubject.id,
            itemType: 1,
            memberCreatedId: members.paulo.id,
            title: 'Fordismo x Taylorismo',
            childrenSubjectItems: {
              create: [
                {
                  courseSubjectId: courseSubject.id,
                  itemType: 2,
                  memberCreatedId: members.paulo.id,
                  title: 'Atividades de Fixação',
                  startDate: dayjs().startOf('day').toDate(),
                  endDate: dayjs().add(5, 'days').toDate(),
                },
              ],
            },
          },
        ],
      },
    },
  });
}

main();
