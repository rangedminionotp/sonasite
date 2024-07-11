import { Query, Resolver, Args } from "type-graphql"
import { SummonersDataType } from "./schema"
import { SummonersDataService } from "./service"

@Resolver()
export class SummonersDataResolver {
    @Query(() => [SummonersDataType])
    async fetchSummonerData() {
        const summonerService = new SummonersDataService()
        return summonerService.fetchData()
    }
}