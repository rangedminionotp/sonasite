import { pool } from '@/db'
import { SkinLore, SkinLoreInput, SkinLoreUpdateInput } from './schema' 

export class SkinLoreService {
    public async getAllUserLores():Promise<SkinLore[]> {
        const result = await pool.query<AbilityLore>('SELECT * FROM UserSkinLore')
        const lore: SkinLore[] = []
        for (const item of result.rows) { 
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
    public async getLoreBySkinId(skin_id: string):Promise<SkinLore[]> {
        const result = await pool.query<AbilityLore>('SELECT * FROM UserSkinLore WHERE skin_id = $1', [skin_id])
        const lore: SkinLore[] = []
        for (const item of result.rows) { 
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
        const result = await pool.query<SkinLore>('SELECT * FROM UserSkinLore WHERE owner_id = $1 AND skin_id = $2', [owner_id, skin_id])
        const lore: SkinLore[] = []
        for (const item of result.rows) {
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
        const result = await pool.query<SkinLore>('INSERT INTO UserSkinLore (skin_id, lore, owner_id) VALUES ($1, $2, $3) RETURNING *', [loreInput.skin_id, loreInput.lore, loreInput.owner_id])
        const skinLore: SkinLore = {
            id: result.rows[0].id,
            skin_id: result.rows[0].skin_id,
            lore: result.rows[0].lore,
            time: result.rows[0].time,
            owner_id: result.rows[0].owner_id
        }
        
        return skinLore;
    }
    public async editLore(loreInput: SkinLoreUpdateInput):Promise<SkinLore> {
        const result = await pool.query<SkinLore>('UPDATE UserSkinLore SET lore = $1 AND TIME = $3 WHERE id = $2 RETURNING *', [loreInput.lore, loreInput.id, `"${new Date().toISOString()}"`])
        const skinLore: SkinLore = {
            id: result.rows[0].id,
            skin_id: result.rows[0].skin_id,
            lore: result.rows[0].lore,
            time: result.rows[0].time,
            owner_id: result.rows[0].owner_id
        }
        
        return skinLore;
    }
    public async deleteLore(id: string): Promise<SkinLore> {
        const result = await pool.query<SkinLore>('DELETE FROM UserSkinLore WHERE id = $1 RETURNING *', [id])
        const skinLore: SkinLore = {
            id: result.rows[0].id,
            skin_id: result.rows[0].skin_id,
            lore: result.rows[0].lore,
            time: result.rows[0].time,
            owner_id: result.rows[0].owner_id
        }
        
        return skinLore;
    }
}