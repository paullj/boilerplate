import { buildSchema } from 'type-graphql';

import { UserResolver } from '../modules/UserResolver';

const environment = process.env.NODE_ENV || 'development';

const generateSchema = async () => {
  const schema = buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: environment === 'development',
  });
  return schema;
};

export { generateSchema };
