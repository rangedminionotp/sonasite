import { pool } from '@/db'
import { UserData, UserInfo } from './schema'
import * as bcrypt from 'bcrypt'

export class UserService {
    public async getAllUsers(): Promise<UserInfo[]>{
        const select = 'SELECT * FROM Users'
        const query = {
            text: select,
            values: []
        }
        const { rows } = await pool.query(query)

        const users:UserInfo[] = []
        for (const user of rows) {
            const UserObj: UserInfo = {
                id: user.id,
                name: user.data['name'],
                roles: user.data['roles'],
                email: user.data['email']
            }
            console.log('userobj', UserObj)
            users.push(UserObj)
        } 
        return users;
    }
    public async getUser(email: string): Promise<Boolean>{
        const select = `SELECT 1 FROM Users WHERE data->>\'email\' = $1`
        const query = {
            text: select,
            values: [email]
        }
        const { rows } = await pool.query(query);
        return rows.length > 0;
    }
    public async AddUser(user: UserData): Promise<UserInfo> { 
        const emailCheckResult = await pool.query(emailCheckQuery);

        if (emailCheckResult) {
            return null;
        }
        if (user['password']) {
            user['password'] = bcrypt.hashSync(user['password'], 10);
        } 
        const insert = 'INSERT INTO Users(data) VALUES ($1) RETURNING id, data'
        const query = {
            text: insert,
            values: [user],
        };
        const { rows } = await pool.query(query);
        const UserObj = {
            id: rows[0].id,
            name: rows[0].data['name'],
            roles: rows[0].data['roles'],
            email: rows[0].data['email']
        }
        return UserObj;
    }
}