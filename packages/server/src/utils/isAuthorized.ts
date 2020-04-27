import { AuthChecker } from 'type-graphql';
import { verify } from 'jsonwebtoken';
import { Context, ContextPayload } from '../types/Context';

export const isAuthorized: AuthChecker<Context> = ({ context }) => {
  const { authorization } = context.req.headers;

  if (!authorization) {
    return false;
  }

  try {
    const token = authorization.split(' ')[1];
    const payload: ContextPayload = <ContextPayload>(
      verify(token, process.env.ACCESS_TOKEN_SECRET!)
    );
    if (payload) {
      // eslint-disable-next-line no-param-reassign
      context.payload = payload;
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
};
