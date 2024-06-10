import { Query, Resolver, Mutation, Arg, Authorized } from "type-graphql"

import { AbilityService } from "./service"

import { AbilityInfo } from "./schema"

@Resolver()
export class AbilityResolver {
    @Query(() => [AbilityInfo])
    async getAllAbility(): Promise<AbilityInfo[]>{
        return new AbilityService().getAllAbility()
    }
}