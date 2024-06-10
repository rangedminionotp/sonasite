import { pool } from '@/db'
import { AbilityTipsInfo } from './schema'

export class AbilityTipsService {
    public async getAllTips(): Promise<AbilityTipsInfo[]>{
        const select = 'SELECT * FROM AbilityTips'
        const query = {
            text: select,
            values: []
        }
        const { rows } = await pool.query(query)
        const TipsObj = {
            ability: rows[0].ability_id,
            description: rows[0].data.description,
            ownerId: rows[0].owner_id,
            ownerName: rows[0].owner_name,
            date: rows[0].data.date
        }
        return TipsObj;
    }
}