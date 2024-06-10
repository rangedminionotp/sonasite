import { Query, Resolver, Mutation, Arg, Authorized } from "type-graphql"

import { AbilityTipsService } from "./service"

import { AbilityTipsInfo } from "./schema"

@Resolver()
export class AbilityTipsResolver {
    @Query(() => [AbilityTipsInfo])
    async getAllAbilityTips(): Promise<AbilityTipsInfo[]>{
        return new AbilityTipsService().getAllTips()
    }
}