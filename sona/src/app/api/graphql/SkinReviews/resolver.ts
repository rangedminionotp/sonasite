import { Query, Resolver, Mutation, Arg, Authorized ,  Ctx} from "type-graphql"
import type { NextApiRequest } from 'next'
import { SkinReviewsService } from './service'
import { SkinReviewsInfo, SkinReviewsVote, SkinReviewsData,  SkinReviewsAdd, SkinReviewsReviewed} from './schema'

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
    @Mutation(() => SkinReviewsInfo)
    async addReview(@Arg('input') input: SkinReviewsAdd): Promise<SkinReviewsInfo> {
        return new SkinReviewsService().createReview(input)
    }
    @Query(() => Boolean)
    async checkIfReviewed(@Arg('owner_id') owner_id: string, @Arg('skin_id') skin_id: string): Promise<boolean> {
        return new SkinReviewsService().checkIfReviewed(owner_id, skin_id)
    }
    @Mutation(()=>SkinReviewsReviewed)
    async createSkinReviewsReviewed(@Arg('skin_id') skin_id: string, @Arg('owner_id') owner_id: string, @Arg('skin_reviews_id') skin_reviews_id: string): Promise<SkinReviewsReviewed>{
        return new SkinReviewsService().createSkinReviewsReviewed(skin_id, owner_id, skin_reviews_id)
    }
    @Mutation(()=>SkinReviewsInfo)
    async deleteSkinReview(@Arg('skin_id') skin_id: string, @Arg('owner_id') owner_id: string): Promise<SkinReviewsInfo>{
        return new SkinReviewsService().deleteSkinReviews(owner_id,skin_id )
    }
}