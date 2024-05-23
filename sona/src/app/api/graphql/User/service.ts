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
        const UserObj = {
            id: rows[0].id,
            name: rows[0].data['name'],
            roles: rows[0].data['roles'],
            email: rows[0].data['email']
        }
        return UserObj;
    }
    public async AddUser(user: UserData): Promise<UserInfo> {
        const emailCheckQuery = {
        text: 'SELECT 1 FROM Users WHERE data->>\'email\' = $1',
        values: [user.email],
    };
        const emailCheckResult = await pool.query(emailCheckQuery);

        if (emailCheckResult.rows.length > 0) {
            throw new Error('Email already exists');
        }
        user['password'] = bcrypt.hashSync(user['password'], 10);
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