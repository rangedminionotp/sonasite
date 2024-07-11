import { Query, Resolver, Args } from "type-graphql"
import { RuneDataService } from "./service"
import {RuneTree} from "./schema"

@Resolver()
export class RuneDataResolver {
    @Query(() => [RuneTree])
    async fetchRuneData():Promise<RuneTree[]> {
        const service = new RuneDataService()
        return service.fetchRuneData()
    }
}