import { pool } from '@/db'
import { SkinLore, SkinLoreInput, SkinLoreUpdateInput } from './schema' 

export class SkinLoreService {
    public async getAllUserLores(): Promise<SkinLore[]> {
        
        const select = `SELECT * FROM UserSkinLore`
        const query = {
            text: select,
            values: []
        }
        const { rows } = await pool.query(query) 
        const lore: SkinLore[] = []
        for (const item of rows) { 
            const loreObj : SkinLore = {
                id: item.id,
                skin_id: item.skin_id,
                lore: item.lore,
                time: item.time,
                owner_id: item.owner_id
            }
            lore.push(loreObj)
        }
        return lore
    }
    public async getLoreBySkinId(skin_id: string): Promise<SkinLore[]> {
        const select = `SELECT * FROM UserSkinLore WHERE skin_id = $1`
        const query = {
            text: select,
            values: [skin_id]
        }
        const { rows } = await pool.query(query)
        const lore: SkinLore[] = []
        for (const item of rows) { 
            const loreObj : SkinLore = {
                id: item.id,
                skin_id: item.skin_id,
                lore: item.lore,
                time: item.time,
                owner_id: item.owner_id
            }
            lore.push(loreObj)
        }
        return lore
    }
    public async getLoreByUserId(owner_id: string, skin_id: string): Promise<SkinLore[]> {
        const select = `SELECT * FROM UserSkinLore WHERE owner_id = $1 AND skin_id = $2`
        const query = {
            text: select,
            values: [owner_id, skin_id]
        }
        const { rows } = await pool.query(query)
        const lore: SkinLore[] = []
        for (const item of rows) {
            const loreObj : SkinLore = {
                id: item.id,
                skin_id: item.skin_id,
                lore: item.lore,
                time: item.time,
                owner_id: item.owner_id
            }
            lore.push(loreObj)
        }
        return lore
    }
    public async createLore(loreInput: SkinLoreInput):Promise<SkinLore> {
        const insert = `INSERT INTO UserSkinLore (skin_id, lore, owner_id) VALUES ($1, $2, $3) RETURNING *`
        const query = {
            text: insert,
            values: [loreInput.skin_id, loreInput.lore, loreInput.owner_id]
        }
        const { rows } = await pool.query(query)
        const skinLore: SkinLore = {
            id: rows[0].id,
            skin_id: rows[0].skin_id,
            lore: rows[0].lore,
            time: rows[0].time,
            owner_id: rows[0].owner_id
        }
        
        return skinLore;
    }
    public async editLore(loreInput: SkinLoreUpdateInput):Promise<SkinLore> {
        const update = `UPDATE UserSkinLore SET lore = $1, time = $2 WHERE id = $3 RETURNING *`
        const query = {
            text: update,
            values: [loreInput.lore, new Date().toISOString(), loreInput.id]
        }
        const { rows } = await pool.query(query)

        const skinLore: SkinLore = {
            id: rows[0].id,
            skin_id: rows[0].skin_id,
            lore: rows[0].lore,
            time: rows[0].time,
            owner_id: rows[0].owner_id
        }
        
        return skinLore;
    }
    public async deleteLore(id: string): Promise<SkinLore> {
        const deleteQuery = `DELETE FROM UserSkinLore WHERE id = $1 RETURNING *`
        const query = {
            text: deleteQuery,
            values: [id]
        }
        const { rows } = await pool.query(query)
        const skinLore: SkinLore = {
            id: rows[0].id,
            skin_id: rows[0].skin_id,
            lore: rows[0].lore,
            time: rows[0].time,
            owner_id: rows[0].owner_id
        }
        
        return skinLore;
    }
}