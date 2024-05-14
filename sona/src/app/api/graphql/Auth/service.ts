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
          {id: userid, email: user.email, name: user.name, roles: user.roles}, 
          secrets.accessToken, {
            expiresIn: '30m',
            algorithm: 'HS256'
          });
        resolve({id: userid, name: user.name, accessToken: accessToken});
      } else {
        console.log(credentials);
        reject(new Error("Unauthorised"));
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async check(authHeader?: string, roles?: string[]): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!authHeader) {
        reject(new Error("Unauthorised"));
      }
      else {
        const tokens = authHeader.split(' ');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        jwt.verify(tokens[1], secrets.accessToken, (err: any, user: any) => {
          if (err) {
            reject(err);
          } else if (roles){
            for (const role of roles) {
              if (!user.roles || !user.roles.includes(role)) {
                reject(new Error("Unauthorised"));
              }
            }
          }
          resolve({id: user.id, email: user.email, name: user.name});
        });
      }
    });
  }
}