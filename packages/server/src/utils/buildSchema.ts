import { buildSchema } from 'type-graphql';

import { HelloResolver } from '../modules/HelloResolver';
import { UserResolver } from '../modules/UserResolver';
import { isAuthorized } from './isAuthorized';

const environment = process.env.NODE_ENV || 'development';

const generateSchema = async () => {
  const schema = buildSchema({
    resolvers: [HelloResolver, UserResolver],
    emitSchemaFile: environment === 'development',
    authChecker: isAuthorized,
  });
  return schema;
};

export { generateSchema };
