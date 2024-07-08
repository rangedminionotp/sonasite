import { AuthChecker } from 'type-graphql';
import type { NextApiRequest } from 'next';
import { AuthService } from './service';
import {headers} from 'next/headers'
async function authChecker(req: NextApiRequest, authHeader: string, roles: string[]): Promise<boolean> {
  try {
    req.user = await new AuthService().check(authHeader, roles); 
  } catch (err) {
    return false;
  }
  return true;
} 

export const nextAuthChecker: AuthChecker<{ req: NextApiRequest }> = async ({ context }, roles) => {
  const authHeader = headers().get('Authorization')

  if (!authHeader) {
    throw new Error('Authorization header is missing');
  }

  return await authChecker(context.req, authHeader, roles);
};