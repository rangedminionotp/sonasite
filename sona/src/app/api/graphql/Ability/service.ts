import { pool } from '@/db'
import { AbilityInfo } from './schema'

export class AbilityService {
    public async getAllAbility(): Promise<AbilityInfo[]>{
        const select = `SELECT * FROM Ability`
        const query = {
            text: select,
            values: []
        }
        const { rows } = await pool.query(query)
        const ability = []
        for (const item in rows) {
             const ABilityObj = {
            abilityId: rows[item].id,
            abilityName: rows[item].name
            }
            ability.push(ABilityObj)
        } 
        return ability;
    }
}