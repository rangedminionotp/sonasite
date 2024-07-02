import { pool } from "@/db";

import { SkinInfo, SkinOverview, AvgSkinRatingInput } from "./schema";

export class SkinService {
    public async getSkin(): Promise<SkinOverview[]> {
        const select = `SELECT * FROM SkinItem`
        const query = {
            text: select,
            values: []
        }
        const { rows } = await pool.query(query) 
        const skin: SkinOverview[] = []
        for (const item of rows) {
            const skinObj: SkinInfo = {
                "lore": item.data.lore,
                "price": item.data.price,
                "releaseDate": item.data.releaseDate,
                "artist": item.data.artist,
                "threeDURL": item.data.threeDURL, 
                "voiceActor": item.data.voiceActor
            }
            const itemObj: SkinOverview = {
                "id": item.id,
                "name": item.name,
                "data": skinObj, 
                "rating": item.rating 
            }
            skin.push(itemObj)
        }
        return skin
    }

    public async editSkinRating(input: AvgSkinRatingInput): Promise<SkinOverview> {
        const { id, rating } = input
        const select = `UPDATE SkinItem SET rating = $2 WHERE id = $1 RETURNING *`
        const query = {
            text: select,
            values: [id, rating]
        }
        const {rows} = await pool.query(query)
        const skinObj: SkinOverview = {
            "id": rows[0].id,
            "name": rows[0].name,
            "data": rows[0].data,
            "rating": rows[0].rating
        }
        return skinObj
    }
}