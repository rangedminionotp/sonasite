import { Query, Resolver, Mutation, Arg, Authorized ,  Ctx} from "type-graphql"
import type { NextApiRequest } from 'next'

import { AbilityTipsService } from "./service"

import { AbilityTipsInfo } from "./schema"

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
    // @Authorized("member") 
    @Mutation(() => AbilityTipsInfo)
    async createAbilityTip(
        @Arg("owner_name") owner_name: string,
        @Arg("description") description: string,
        @Arg("ability_id") ability_id: string,
        @Arg("version") version: string,
        @Ctx() request: NextApiRequest
    ): Promise<AbilityTipsInfo> {
      return new AbilityTipsService().createAbilityTip(request.user.id, owner_name, description, ability_id, version);
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

}