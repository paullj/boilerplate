/* eslint-disable class-methods-use-this */
import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { User } from '../entities/user';
import { database } from '../services/useDatabase';

@Resolver()
class HelloResolver {
  @Query(() => String)
  async hello(): Promise<string> {
    return '👋🏼';
  }

  @Mutation(() => User)
  async createUser(@Arg('name') name: string): Promise<User | null> {
    return database
      .query(`INSERT INTO users(name) VALUES('${name}') RETURNING *`)
      .then((result) => result.rows[0])
      .catch((error) => console.error(error));
  }
}

export { HelloResolver };
