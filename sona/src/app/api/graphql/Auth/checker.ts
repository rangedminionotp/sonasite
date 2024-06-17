// import { AuthChecker } from "type-graphql"
// import type { NextApiRequest } from 'next'

// import { AuthService } from "./service"

// export async function authChecker(context: NextApiRequest, authHeader: string, roles: string[]): Promise<boolean> {
//   try {
//     context.user = await new AuthService().check(authHeader, roles)
//   } catch (err) {
//     return false
//   }
//   return true
// }

// export const nextAuthChecker: AuthChecker<NextApiRequest> = async (
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   { root, args, context, info }, roles,) => 
// {
//   return await authChecker(context, context.req.headers.authorization, roles)
// };


import { AuthChecker } from 'type-graphql';
import type { NextApiRequest } from 'next';
import { AuthService } from './service'; // Adjust the import path as needed

export async function authChecker({ req }: NextApiRequest, authHeader: string, roles: string[]): Promise<boolean> {
  try {
    const authService = new AuthService();
    req.user = await authService.check(authHeader, roles);
    return true;
  } catch (err) {
    console.error('Authentication error:', err);
    return false;
  }
}

export const nextAuthChecker: AuthChecker<NextApiRequest> = async ({ context }, roles) => {
  const authHeader = context.req.headers.authorization || '';
  return await authChecker(context.req, authHeader, roles);
};