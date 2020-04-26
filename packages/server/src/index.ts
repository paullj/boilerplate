import 'reflect-metadata';
import env from 'dotenv';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import { generateSchema } from './utils/buildSchema';

env.config();
const port = process.env.PORT || 4000;

const startServer = async () => {
  const schema = await generateSchema();
  const server = new ApolloServer({ schema });

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port }, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`,
    );
  });
};

startServer();
