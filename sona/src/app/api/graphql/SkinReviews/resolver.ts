import { Query, Resolver, Mutation, Arg, Authorized ,  Ctx} from "type-graphql"
import type { NextApiRequest } from 'next'
import { SkinReviewsService } from './service'
import { SkinReviewsInfo, SkinReviewsVote, SkinReviewsData,  SkinReviewsAdd, SkinReviewsReviewed, SkinReviewsEdit} from './schema'

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
    @Authorized("member") 
    @Mutation(() => SkinReviewsInfo)
    async addReview(@Arg('input') input: SkinReviewsAdd): Promise<SkinReviewsInfo> {
        return new SkinReviewsService().createReview(input)
    }
    @Query(() => Boolean)
    async checkIfReviewed(@Arg('owner_id') owner_id: string, @Arg('skin_id') skin_id: string): Promise<boolean> {
        return new SkinReviewsService().checkIfReviewed(owner_id, skin_id)
    }
    @Authorized("member") 
    @Mutation(()=>SkinReviewsReviewed)
    async createSkinReviewsReviewed(@Arg('skin_id') skin_id: string, @Arg('owner_id') owner_id: string, @Arg('skin_reviews_id') skin_reviews_id: string): Promise<SkinReviewsReviewed>{
        return new SkinReviewsService().createSkinReviewsReviewed(skin_id, owner_id, skin_reviews_id)
    }
    @Authorized("member") 
    @Mutation(()=>SkinReviewsInfo)
    async deleteSkinReview(@Arg('skin_id') skin_id: string, @Arg('owner_id') owner_id: string): Promise<SkinReviewsInfo>{
        return new SkinReviewsService().deleteSkinReviews(owner_id,skin_id )
    }
    @Authorized("member") 
    @Mutation(()=>SkinReviewsInfo)
    async editSkinReview(@Arg('input') input: SkinReviewsEdit): Promise<SkinReviewsInfo>{
        return new SkinReviewsService().editSkinReviews(input)
    } 
    
    @Query(() => SkinReviewsInfo)
    async getReviewsByOwnerAndSkinId(@Arg('owner_id') owner_id: string, @Arg('skin_id') skin_id: string): Promise<SkinReviewsInfo> {
        return new SkinReviewsService().getReviewsByOwnerAndSkinId(owner_id, skin_id)
    }
}