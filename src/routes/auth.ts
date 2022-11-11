import fastify, { FastifyInstance } from 'fastify';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';

export async function authRoutes(fastify: FastifyInstance) {
  fastify.get('/me', async (req, res) => {});

  fastify.post('/users', async (req, res) => {
    const createUserBody = z
      .object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        password: z.string().min(8),
      })
      .parse(req.body);

    const newPassword = await bcrypt.hash(createUserBody.password, 12);

    await prisma.user.create({
      data: {
        email: createUserBody.email,
        firstName: createUserBody.firstName,
        lastName: createUserBody.lastName,
      },
    });
  });
}
