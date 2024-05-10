import { Query, Resolver, Args } from "type-graphql"

import { SonaService } from "./service"

import { SonaOverview } from "../schema"
@Resolver()

export class SonaResolver {
    async fetchData(
    ): Promise<SonaOverview> {
        return new SonaService().FetchVersion()
    }
}