import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class User {
  id!: string;

  @Field()
  name!: string;

  tokenVersion!: string;
}

export { User };
