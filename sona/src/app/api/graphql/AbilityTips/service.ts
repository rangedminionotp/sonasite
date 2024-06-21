import { pool } from '@/db'
import { AbilityTipsInfo, AbilityTipsData, AbilityTipsVotes } from './schema'

export class AbilityTipsService {
    public async getAllTips(): Promise<AbilityTipsInfo[]> {
        const select = `SELECT * FROM AbilityTips`
        const query = {
            text: select,
            values: []
        }
        const { rows } = await pool.query(query)
        const abilityTips:AbilityTipsInfo[]= []
        for (const item in rows) {
            const TipsObj = {
                tip_id: rows[item].id,
                ability_id: rows[item].ability_id,
                description: rows[item].data.description,
                ownerId: rows[item].owner_id,
                ownerName: rows[item].owner_name,
                date: rows[item].data.date,
                version: rows[item].data.version,
                upvotes: rows[item].upvotes,
                downvotes: rows[item].downvotes, 
                            edited: false

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
            console.log(item)
            const TipsObj = {
                tip_id: rows[item].id,
                ability_id: rows[item].ability_id,
                description: rows[item].data.description,
                ownerId: rows[item].owner_id,
                ownerName: rows[item].owner_name,
                date: rows[item].data.date,
                version: rows[item].data.version,
                upvotes: rows[item].upvotes,
                downvotes: rows[item].downvotes,
                            edited: false

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
                tip_id: rows[item].id,
                ability_id: rows[item].ability_id,
                description: rows[item].data.description,
                ownerId: rows[item].owner_id,
                ownerName: rows[item].owner_name,
                date: rows[item].data.date,
                version: rows[item].data.version,
                upvotes: rows[item].upvotes,
                downvotes: rows[item].downvotes, 
                            edited: false

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
        
        const insert = `INSERT INTO AbilityTips(owner_id, ability_id, owner_name, data, upvotes, downvotes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`
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
            edited: false
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
            version: rows[0].data.version,
            edited: false
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
            version: rows[0].data.version,
                        edited: false

        }
        return tipsObj;
    }
    public async checkIfVoted(owner_id: string, tip_id: string): Promise<number> {
    const select = `SELECT voted FROM AbilityTipsVotes WHERE owner_id = $1 AND ability_tip_id = $2`;
    const query = {
        text: select,
        values: [owner_id, tip_id]
    }; 

    const { rows } = await pool.query(query); 

    if (rows.length > 0) {
        return rows[0].voted;
    }
    
    return -1;  
}
    public async updateVotes(owner_id: string, ability_tip_id:string, voted: number): Promise<AbilityTipsVotes>{
        const update = `UPDATE AbilityTipsVotes SET voted = $1 WHERE owner_id = $2 AND ability_tip_id = $3 RETURNING *` 
        const query = {
            text: update,
            values: [voted, owner_id, ability_tip_id]
        }
        const { rows } = await pool.query(query)
         const tipObj: AbilityTipsVotes = {
            tip_id: rows[0].ability_tip_id,
            owner_id: rows[0].owner_id,
            voted: rows[0].voted
        }
        return tipObj;
    }

    public async addVote(owner_id: string, tip_id: string, voted: number): Promise<AbilityTipsVotes>{
        const insert = `INSERT INTO AbilityTipsVotes (ability_tip_id, owner_id, voted) VALUES ($1, $2, $3) RETURNING *`
        const query = {
            text: insert,
            values: [tip_id, owner_id, voted]
        }
        const { rows } = await pool.query(query)
        const tipObj: AbilityTipsVotes = {
            tip_id: rows[0].ability_tip_id,
            owner_id: rows[0].owner_id,
            voted: rows[0].voted
        }
        return tipObj;
    }

    public async updateAbilityTip(owner_id: string, ability_tip_id:string, description:string, version: string): Promise<AbilityTipsInfo>{
        const update = `
    UPDATE AbilityTips 
    SET data = jsonb_set(
                jsonb_set(
                    jsonb_set(data, '{description}', $1::jsonb, false), 
                    '{date}', $2::jsonb, false
                ),
                '{version}', $3::jsonb, false
            )
    WHERE owner_id = $4 AND id = $5 
    RETURNING *
`;  
        const query = {
    text: update,
    values: [`"${description}"`, 
      `"${new Date().toISOString()}"`, 
     `"${version}"`, owner_id, ability_tip_id]
  };
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
            version: rows[0].data.version,
            edited: true
        } 
        return tipsObj;
    }

    public async deleteAbilityTip(owner_id: string, ability_tip_id: string): Promise<AbilityTipsInfo> {
        const remove = `DELETE FROM AbilityTips WHERE owner_id = $1 AND id = $2 RETURNING *;`
        const query = {
            text: remove, 
            values: [owner_id, ability_tip_id]
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
            version: rows[0].data.version,
            edited: true
        } 
        return tipsObj;
    }
}