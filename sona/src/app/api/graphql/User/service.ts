import { pool } from '@/db'
import { UserData, UserInfo, GmailUserInfo } from './schema'
import * as bcrypt from 'bcrypt'
import { generateRandomPassword } from '@/app/utils/common'
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
    public async getGmailUser(email: string): Promise<GmailUserInfo | null>{
        const select = `SELECT * FROM Users WHERE data->>\'email\' = $1`
        const query = {
            text: select,
            values: [email]
        }
        const { rows } = await pool.query(query);
        if (rows.length > 0) {
            const userObj: GmailUserInfo = {
                id: rows[0].id,
                name: rows[0].data['name'],
                roles: rows[0].data['roles'],
                email: rows[0].data['email'],
                password: rows[0].data['password'],
                ogPassword: rows[0].data['ogPassword']
            }
            return userObj
        } 
        return null; 
    } 

    public async AddGmailUser(user: UserData): Promise<GmailUserInfo>{
        const userExist = await this.getGmailUser(user.email)
        if (userExist) {
            return userExist;
        }
        user['password'] = generateRandomPassword(12);
        user['ogPassword'] = user['password']
        user['password'] = bcrypt.hashSync(user['password'], 10); 
        const insert = 'INSERT INTO Users(data) VALUES ($1) RETURNING *'
        const query = {
            text: insert,
            values: [user],
        };
        const { rows } = await pool.query(query);
        const gmailUserObj: GmailUserInfo = {
            id: rows[0].id,
            name: rows[0].data['name'],
            roles: rows[0].data['roles'],
            email: rows[0].data['email'],
            password: rows[0].data['password']
        }
        return gmailUserObj;
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
        const insert = 'INSERT INTO Users(data) VALUES ($1) RETURNING *'
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