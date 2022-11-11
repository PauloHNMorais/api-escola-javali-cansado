import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function subjectItemRoutes(fastify: FastifyInstance) {
  fastify.get('/subjectItem', async (req, res) => {
    const subjects = await prisma.subjectItem.findMany({});

    return subjects;
  });

  fastify.get('/subjectItem/:id', async (req, res) => {
    const { id } = z.object({ id: z.string() }).parse(req.params);

    const subjects = await prisma.subjectItem.findMany({
      where: {
        id,
      },
      include: {
        memberCreated: true,
        childrenSubjectItems: {
          include: {
            memberCreated: {
              include: {
                user: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return subjects;
  });
}
