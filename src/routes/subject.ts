import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';

export async function subjectRoutes(fastify: FastifyInstance) {
  fastify.get('/subjects', async (req, res) => {
    const subjects = await prisma.subject.findMany({
      include: {
        coursesSubjects: {
          include: {
            course: true,
          },
        },
      },
    });

    return subjects;
  });
}
