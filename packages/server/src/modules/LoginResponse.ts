import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

export { LoginResponse };
