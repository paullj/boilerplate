import gql from 'graphql-tag';

export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginResponse;
};

export type MutationLoginArgs = {
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
};

export type HelloQueryVariables = {};

export type HelloQuery = { __typename?: 'Query' } & Pick<Query, 'hello'>;

export const HelloDocument = gql`
  query Hello {
    hello
  }
`;
