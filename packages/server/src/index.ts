import 'reflect-metadata';
import env from 'dotenv';

import fastify from 'fastify';
import gql from 'fastify-gql';
import cookie from 'fastify-cookie';

import { generateSchema } from './utils/buildSchema';

env.config();
const port = Number(process.env.PORT) || 4000;

const startServer = async () => {
  const app = fastify();

  app.register(cookie);

  // TODO: Look into graphql-jit
  app.register(gql, {
    schema: await generateSchema(),
    context: (req: any, res: any) => {
      return { req, res };
    },
    graphiql: process.env.NODE_ENV === 'development' ? 'playground' : false,
  });

  app.get('/refresh_token', async (req, res) => {
    console.log(req.headers);
    res.send(200);
  });

  app.listen(port, 'localhost', (error, address) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
    console.log(`🚀 Server ready at ${address}`);
    if (process.env.NODE_ENV === 'development') {
      console.log(`📈 GraphQL playground at ${address}/playground`);
    }
  });

  // FIXME: Still sometimes doesn't close properly
  process.once('SIGINT', () => {
    console.log('\n🛌 Server shutting down...');
    app.close(() => {
      // process.kill(process.pid, 'SIGUSR2');
      process.exit();
    });
  });
};

startServer();
