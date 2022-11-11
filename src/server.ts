import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { subjectRoutes } from './routes/subject';
import { subjectItemRoutes } from './routes/subjectItem';

const port = process.env.PORT ? Number(process.env.PORT) : 3333;

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(jwt, { secret: String(process.env.JWT_SECRET) });
  await fastify.register(cors, { origin: true });
  await fastify.register(subjectRoutes);
  await fastify.register(subjectItemRoutes);

  await fastify.listen({ port, host: '0.0.0.0' });
}

bootstrap();
