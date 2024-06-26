import { Query, Resolver, Mutation, Arg, Authorized ,  Ctx} from "type-graphql"
import type { NextApiRequest } from 'next'

import { AbilityTipsService } from "./service"

import { AbilityTipsInfo, AbilityTipsVotes } from "./schema"

@Resolver()
export class AbilityTipsResolver {
    @Query(() => [AbilityTipsInfo])
    async getAllAbilityTips(): Promise<AbilityTipsInfo[]>{
        return new AbilityTipsService().getAllTips()
    }

    @Query(() => [AbilityTipsInfo])
    async getAbilityTipsByAbilityId(
        @Arg("ability_id") ability_id: string
    ): Promise<AbilityTipsInfo[]>{
        return new AbilityTipsService().getTipsByAbilityId(ability_id)
    }

    @Query(() => [AbilityTipsInfo])
    async getAbilityTipsByOwnerId(
        @Arg("owner_id") owner_id: string
    ): Promise<AbilityTipsInfo[]>{
        return new AbilityTipsService().getTipsByOwnerId(owner_id)
    } 

      @Authorized("member") 
    @Mutation(() => AbilityTipsInfo)
    async createAbilityTip(
        @Arg("owner_name") owner_name: string,
        @Arg("description") description: string,
        @Arg("ability_id") ability_id: string,
        @Arg("version") version: string,
        @Ctx() request: NextApiRequest
      ): Promise<AbilityTipsInfo> {
        console.log('request user id', request.request.user);
      return new AbilityTipsService().createAbilityTip(request.request.user.id, owner_name, description, ability_id, version);
    }



    // @Authorized("member") 
    @Mutation(() => AbilityTipsInfo)
    async updateUpvotes(
        @Arg("tip_id") tip_id: string,
        @Arg("upvotes") upvotes: number
    ): Promise<AbilityTipsInfo> {
      return new AbilityTipsService().updateUpvotes(tip_id, upvotes)
    }

    // @Authorized("member") 
    @Mutation(() => AbilityTipsInfo)
    async updateDownvotes(
        @Arg("tip_id") tip_id: string,
        @Arg("downvotes") downvotes: number
    ): Promise<AbilityTipsInfo> {
      return new AbilityTipsService().updateDownvotes(tip_id, downvotes)
    }

    // @Mutation(() => AbilityTipsVotes)
    // async createTipVote( 
    //     @Arg("voted") voted:number,
    //     @Arg("ability_tip_id") ability_tip_id: string, 
    //     @Ctx() request: NextApiRequest
    // ): Promise<AbilityTipsVotes> {
    //   return new AbilityTipsService().addVote(request.user.id, ability_tip_id, voted);
    // }
    @Mutation(() => AbilityTipsVotes)
    async createTipVote( 
        @Arg("voted") voted:number,
        @Arg("ability_tip_id") ability_tip_id: string, 
        @Arg("owner_id") owner_id: string
    ): Promise<AbilityTipsVotes> {
      return new AbilityTipsService().addVote(owner_id, ability_tip_id, voted);
    }
    
    @Mutation(() => AbilityTipsVotes)
    async deleteTipVote(
        @Arg("owner_id") owner_id: string,
        @Arg("ability_tip_id") ability_tip_id: string
    ): Promise<AbilityTipsVotes> {
      return new AbilityTipsService().deleteVote(owner_id, ability_tip_id);
    }
    // @Authorized("member") 
    // @Query(() => Number)
    // async checkIfUpvoted(
    //     @Arg("tip_id") tip_id: string,
    //     @Ctx() request: NextApiRequest 
    // ): Promise<number>{
    //     return new AbilityTipsService().checkIfUpvoted(request.user.id, tip_id);
    // }
    
        @Query(() => Number)
    async checkIfVoted(
        @Arg("tip_id") tip_id: string,
            // @Ctx() request: NextApiRequest 
        @Arg("owner_id") owner_id: string
    ): Promise<number>{
        return new AbilityTipsService().checkIfVoted(owner_id, tip_id);
    }
    // // @Authorized("member") 
    // @Query(() => Number)
    // async checkIfDownvoted(
    //     @Arg("tip_id") tip_id: string,
    //     @Ctx() request: NextApiRequest 
    // ): Promise<number>{
    //     return new AbilityTipsService().checkIfDownvoted(request.user.id, tip_id);
    // }

    @Mutation(() => AbilityTipsVotes)
    async updateVotes(
        @Arg("tip_id") tip_id: string,
        @Arg("votes") votes: number,
        @Arg("owner_id") owner_id: string
    ): Promise<AbilityTipsVotes> {
      return new AbilityTipsService().updateVotes(owner_id, tip_id, votes)
    }
    @Mutation(() => AbilityTipsInfo)
    async editTips(
        @Arg("owner_id") owner_id: string,
        @Arg("ability_tip_id") ability_tip_id: string,
        @Arg("description") description: string,
         @Arg("version") version: string
    ): Promise<AbilityTipsInfo> {
      return new AbilityTipsService().updateAbilityTip(owner_id, ability_tip_id, description, version)
    }
    @Mutation(() => AbilityTipsInfo)
    async deleteTips(
        @Arg("owner_id") owner_id: string,
        @Arg("ability_tip_id") ability_tip_id: string 
    ): Promise<AbilityTipsInfo> {
      return new AbilityTipsService().deleteAbilityTip(owner_id, ability_tip_id)
    }
}