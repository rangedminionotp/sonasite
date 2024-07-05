import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import { Credentials, User } from './schema';

import secrets from '../../../../../data/secrets.json'
import {pool} from '@/db';

export class AuthService {
  public async login(credentials: Credentials): Promise<User>  {
    const select = `SELECT id, data FROM Users WHERE data->>'email' ~* $1`;
    const query = {
      text: select,
      values: [credentials.email],
    };
    const {rows} = await pool.query(query);
const user = rows[0].data;  
    const userid = rows[0].id;
    
const valid = bcrypt.compareSync(credentials.password, user.password);

return new Promise((resolve, reject) => {
  if (valid) {
    const accessToken = jwt.sign(
      { id: userid, email: user.email, name: user.name, roles: user.roles }, 
      secrets.accessToken,
      { expiresIn: '7d', algorithm: 'HS256' }
    );
    return resolve({ id: userid, name: user.name, accessToken: accessToken, email: user.email, roles: user.roles });
  } else { 
    return reject(new Error("Unauthorized"));
  }
});
  }
 
  public async check(authHeader?: string, roles?: string[]): Promise<any> {
    return new Promise((resolve, reject) => { 
      if (!authHeader) {
        return reject(new Error("Unauthorized"));
      } else {
        const tokens = authHeader.split(' ');
        if (tokens.length !== 2 || tokens[0] !== 'Bearer') {
          console.log('invalid token', tokens[0], tokens[1])
          return reject(new Error("Invalid token format"));
        }

        jwt.verify(tokens[1], secrets.accessToken, (err: any, user: any) => {
          if (err) {
            return reject(new Error("Invalid token"));
          } else if (roles && roles.length > 0) {
            if (!user.roles || !roles.some(role => user.roles.includes(role))) {
              return reject(new Error("Unauthorized"));
            }
          }
          return resolve({ id: user.id, email: user.email, name: user.name });
        });
      }
    });
  }
}