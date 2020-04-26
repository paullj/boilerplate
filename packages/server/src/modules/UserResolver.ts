/* eslint-disable class-methods-use-this */
import { sign } from 'jsonwebtoken';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../entities/user';
import { database } from '../services/useDatabase';
import { LoginResponse } from './LoginResponse';

@Resolver()
class UserResolver {
  @Query(() => String)
  async hello(): Promise<string> {
    return '👋🏼';
  }

  @Mutation(() => LoginResponse)
  async login(@Arg('name') name: string): Promise<LoginResponse> {
    const user: User = await database
      .query('INSERT INTO users(name) VALUES($1) RETURNING *', [name])
      .then((result) => result.rows[0])
      .catch((error) => console.error(error));

    return {
      accessToken: sign({ userId: user.id }, 'SECRET', {
        expiresIn: '15m',
      }),
    };
  }
}

export { UserResolver };
