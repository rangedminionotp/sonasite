import { pool } from '@/db'
import { AbilityTipsInfo, AbilityTipsData } from './schema'

export class AbilityTipsService {
    public async getAllTips(): Promise<AbilityTipsInfo[]> {
        const select = `SELECT * FROM AbilityTips`
        const query = {
            text: select,
            values: []
        }
        const { rows } = await pool.query(query)
        const abilityTips = []
        for (const item in rows) {
            const TipsObj = {
                tip_id: rows[0].id,
                ability_id: rows[0].ability_id,
                description: rows[0].data.description,
                ownerId: rows[0].owner_id,
                ownerName: rows[0].owner_name,
                date: rows[0].data.date,
                version: rows[0].data.version,
                upvotes: rows[0].upvotes,
                downvotes: rows[0].downvotes
            }
            abilityTips.push(TipsObj)
        }
        return abilityTips;
    }
    public async getTipsByAbilityId(ability_id: string): Promise<AbilityTipsInfo[]>{
        const select = `SELECT * FROM AbilityTips WHERE ability_id = $1`
         const query = {
            text: select,
            values: [ability_id]
        }
        const { rows } = await pool.query(query)
        const abilityTips = []
        for (const item in rows) {
            const TipsObj = {
                tip_id: rows[0].id,
                ability_id: rows[0].ability_id,
                description: rows[0].data.description,
                ownerId: rows[0].owner_id,
                ownerName: rows[0].owner_name,
                date: rows[0].data.date,
                version: rows[0].data.version,
                upvotes: rows[0].upvotes,
                downvotes: rows[0].downvotes
            }
            abilityTips.push(TipsObj)
        }
        return abilityTips;
    }
    public async getTipsByOwnerId(owner_id: string): Promise<AbilityTipsInfo[]>{
        const select = `SELECT * FROM AbilityTips WHERE owner_id = $1`
         const query = {
            text: select,
            values: [owner_id]
        }
        const { rows } = await pool.query(query)
        const abilityTips = []
        for (const item in rows) {
            const TipsObj = {
                tip_id: rows[0].id,
                ability_id: rows[0].ability_id,
                description: rows[0].data.description,
                ownerId: rows[0].owner_id,
                ownerName: rows[0].owner_name,
                date: rows[0].data.date,
                version: rows[0].data.version,
                upvotes: rows[0].upvotes,
                downvotes: rows[0].downvotes
            }
            abilityTips.push(TipsObj)
        }
        return abilityTips;
    }

    public async createAbilityTip(owner_id: string, owner_name: string, description: string, ability_id: string, version: string): Promise<AbilityTipsInfo> {
        const data : AbilityTipsData = {
            'description': description,
            'date': new Date().toISOString(),
            'version': version
        }
        
        const insert = `INSERT INTO AbilityTips(owner_id, ability_id, owner_name, data, upvotes, downvotes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING owner_id, ability_id, owner_name, data, upvotes, downvotes`
        const query = {
            text: insert,
            values: [owner_id, ability_id, owner_name, data, 0, 0],
            
        }
        const { rows } = await pool.query(query);
        const tipsObj: AbilityTipsInfo = {
            tip_id: rows[0].id,
            ability_id: rows[0].ability_id,
            description: rows[0].data.description,
            ownerId: rows[0].owner_id,
            ownerName: rows[0].owner_name,
            date: rows[0].data.date,
            upvotes: rows[0].upvotes,
            downvotes: rows[0].downvotes,
             version: rows[0].data.version,
        }
        return tipsObj;
    }
    public async updateUpvotes(tip_id: string, upvotes: number): Promise<AbilityTipsInfo>{
        const update = `UPDATE AbilityTips SET upvotes = $1 WHERE id = $2 RETURNING *`
        const query = {
            text: update,
            values: [upvotes, tip_id]
        }
        const { rows } = await pool.query(query)
        const tipsObj: AbilityTipsInfo = {
            tip_id: rows[0].id,
            ability_id: rows[0].ability_id,
            description: rows[0].data.description,
            ownerId: rows[0].owner_id,
            ownerName: rows[0].owner_name,
            date: rows[0].data.date,
            upvotes: rows[0].upvotes,
            downvotes: rows[0].downvotes,
             version: rows[0].data.version
        }
        return tipsObj;
    }
    public async updateDownvotes(tip_id: string, downvotes: number): Promise<AbilityTipsInfo>{
        const update = `UPDATE AbilityTips SET downvotes = $1 WHERE id = $2 RETURNING *`
        const query = {
            text: update,
            values: [downvotes, tip_id]
        }
        const { rows } = await pool.query(query)
        const tipsObj: AbilityTipsInfo = {
            tip_id: rows[0].id,
            ability_id: rows[0].ability_id,
            description: rows[0].data.description,
            ownerId: rows[0].owner_id,
            ownerName: rows[0].owner_name,
            date: rows[0].data.date,
            upvotes: rows[0].upvotes,
            downvotes: rows[0].downvotes,
             version: rows[0].data.version
        }
        return tipsObj;
    }
}