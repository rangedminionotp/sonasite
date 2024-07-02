import { pool } from "@/db";

import { SkinInfo, SkinOverview, SkinRating } from "./schema";
import { SkinReviewsService } from "../SkinReviews/service";

export class SkinService {
    public async getSkinRatingsUpdate(skin_id: string): Promise<SkinRating> {
        const skinReviewsService = new SkinReviewsService(); 
        const skinRatings = await skinReviewsService.getReviewsBySkinId(skin_id);
        let totalRating = 0;
        let totalRatingCount = 0;
        for (const item of skinRatings) {
            totalRating += item.rating;
            totalRatingCount += 1;
        }
        const avgRating = totalRating / totalRatingCount;
        const skinRating: SkinRating = {
            "rating": avgRating,
            "rating_count": totalRatingCount,
            'id': skin_id
        }
        const updatedRating: SkinRating = await this.updateSkinRating(skinRating);
        return updatedRating;
    }

    public async updateSkinRating(skinRating: SkinRating): Promise<SkinRating> {
        const update = `UPDATE SkinRating SET rating = $1, rating_count = $2 WHERE skin_id = $3 RETURNING *`
        const query = {
            text: update,
            values: [skinRating.rating, skinRating.rating_count, skinRating.id]
        }
        const { rows } = await pool.query(query);
        const updatedRating: SkinRating = {
            "rating": rows[0].rating,
            "rating_count": rows[0].rating_count,
            "id": rows[0].id
        }
        return updatedRating;
    }

    public async getSkin(): Promise<SkinOverview[]> {
        const select = `
            SELECT si.id, si.name, si.data, sr.rating, sr.rating_count
            FROM SkinItem si
            LEFT JOIN SkinRating sr ON si.id = sr.skin_id
        `;
        const query = {
            text: select,
            values: []
        };
        const { rows } = await pool.query(query);
        const skin: SkinOverview[] = [];
        for (const item of rows) {
            const rating: SkinRating = await this.getSkinRatingsUpdate(item.id);
            const skinObj: SkinInfo = {
                "lore": item.data.lore,
                "price": item.data.price,
                "releaseDate": item.data.releaseDate,
                "artist": item.data.artist,
                "threeDURL": item.data.threeDURL, 
                "voiceActor": item.data.voiceActor
            }; 
            const itemObj: SkinOverview = {
                "id": item.id,
                "name": item.name,
                "data": skinObj,
                "rating": rating.rating,
                "rating_count": rating.rating_count
            };
            skin.push(itemObj);
        }
        return skin;
    } 
}