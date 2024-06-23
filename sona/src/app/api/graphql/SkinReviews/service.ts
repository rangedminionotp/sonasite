import { pool } from '@/db'
import { SkinReviewsInfo, SkinReviewsVote, SkinReviewsData, SkinReviewsAdd, SkinReviewsDataInput} from './schema'

export class SkinReviewsService {
    public async getAllSkinReviews(): Promise<SkinReviewsInfo[]>{ 
        const select = `SELECT * FROM SkinReviews`
        const query = {
            text: select,
            values: []
        }
        const {rows} = await pool.query(query)
        const SkinReviews: SkinReviewsInfo[] = []
        for (const item in rows) {
            const dataObj: SkinReviewsData = {
                description: rows[item].data.description,
                date: rows[item].data.date
            }
            const reviewObj:SkinReviewsInfo = {
                id: rows[item].id,
                owner_id: rows[item].owner_id,
                skin_id: rows[item].skin_id,
                rating: rows[item].rating,
                data: dataObj,
                voted: rows[item].voted,
                owner_name: rows[item].owner_name
            }
            SkinReviews.push(reviewObj)
        }
        return SkinReviews;
    }
    public async getReviewsBySkinId(skin_id:string):Promise<SkinReviewsInfo[]>{
        const select = `SELECT * FROM SkinReviews WHERE skin_id = $1`
        const query = {
            text: select,
            values: [skin_id]
        }
        const { rows } = await pool.query(query) 
        const SkinReviews: SkinReviewsInfo[] = []
        for (const item in rows) {
            const dataObj: SkinReviewsData = {
                description: rows[item].data.description,
                date: rows[item].data.date
            }
            const reviewObj: SkinReviewsInfo = {
                id: rows[item].id,
                owner_id: rows[item].owner_id,
                skin_id: rows[item].skin_id,
                rating: rows[item].rating,
                data: dataObj,
                voted: rows[item].voted,
                owner_name: rows[item].owner_name
            }
            SkinReviews.push(reviewObj)
        }
        return SkinReviews;
    } 
    public async createReview(input:SkinReviewsAdd): Promise<SkinReviewsInfo>{
        const { skin_id, rating, data, owner_id, owner_name } = input
        data.date = new Date().toISOString()
        const insert = `INSERT INTO SkinReviews (skin_id, rating, data, owner_id, owner_name) VALUES ($1, $2, $3, $4, $5) RETURNING *`
        const query = {
            text: insert,
            values: [skin_id, rating, data, owner_id, owner_name]
        }
        const {rows} = await pool.query(query)
        const skinReviewsInfo: SkinReviewsInfo = {
            id: rows[0].id,
            owner_id: rows[0].owner_id,
            skin_id: rows[0].skin_id,
            rating: rows[0].rating,
            data: rows[0].data,
            voted: rows[0].voted,
            owner_name: rows[0].owner_name
        }
        return skinReviewsInfo
    } 
}