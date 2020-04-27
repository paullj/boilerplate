/* eslint-disable class-methods-use-this */
import { Resolver, Query } from 'type-graphql';

@Resolver()
class HelloResolver {
  @Query(() => String)
  async hello(): Promise<string> {
    return '👋🏼';
  }
}

export { HelloResolver };
