import { Query, Resolver, Mutation, Arg, Authorized ,  Ctx} from "type-graphql"
import type { NextApiRequest } from 'next'
import { SkinReviewsService } from './service'
import { SkinReviewsInfo, SkinReviewsVote, SkinReviewsData} from './schema'

@Resolver()
export class SkinReviewsResolver{
    @Query(()=>[SkinReviewsInfo])
    async getAllSkinReviews():Promise<SkinReviewsInfo[]>{
        return new SkinReviewsService().getAllSkinReviews()
    }
    @Query(() => [SkinReviewsInfo])
    async getReviewsBySkinId(@Arg('skin_id') skin_id: string): Promise<SkinReviewsInfo[]> {
        return new SkinReviewsService().getReviewsBySkinId(skin_id)
    }
}