import { pool } from '@/db'
import { SkinLore, SkinLoreInput } from './schema' 

export class SkinLoreService {
    public async getAllUserLores():Promise<AbilityLore[]> {
        const result = await pool.query<AbilityLore>('SELECT * FROM UserSkinLore')
        const lore: AbilityLore[] = []
        for (const item of result.rows) { 
            const loreObj : AbilityLore = {
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

    public async getLoreBySkinId(skin_id: string):Promise<AbilityLore[]> {
        const result = await pool.query<AbilityLore>('SELECT * FROM UserSkinLore WHERE skin_id = $1', [skin_id])
        const lore: AbilityLore[] = []
        for (const item of result.rows) { 
            const loreObj : AbilityLore = {
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
}