/* eslint-disable class-methods-use-this */
import { Arg, Mutation, Resolver, Query, Ctx, Authorized } from 'type-graphql';
import { User } from '../entity/User';
import { database } from '../services/useDatabase';
import { LoginResponse } from './LoginResponse';
import { createAccessToken, createRefreshToken } from '../utils/createToken';
import { Context } from '../types/Context';

@Resolver()
class UserResolver {
  @Authorized()
  @Query(() => User, { nullable: true })
  me(@Ctx() context: Context): Promise<User> | null {
    return database
      .query('SELECT * FROM users WHERE id = $1', [context.payload!.userId])
      .then((result) => result.rows[0]);
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('name') name: string,
    @Ctx() context: Context,
  ): Promise<LoginResponse> {
    const user: User = await database
      .query('INSERT INTO users(name) VALUES($1) RETURNING *', [name])
      .then((result) => result.rows[0])
      .catch((error) => console.error(error));

    context.res.setCookie('jwt', createRefreshToken(user), {
      httpOnly: true,
      secure: true,
    });

    return {
      accessToken: createAccessToken(user),
    };
  }
}

export { UserResolver };
