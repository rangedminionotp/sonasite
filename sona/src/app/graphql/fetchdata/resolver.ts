import { Query, Resolver, Args } from "type-graphql"

import { SonaService } from "./service"

import { SonaOverview, SonaRawStatsQ, SonaRawStatsW, SonaRawStatsE } from "../schema"
@Resolver()

export class SonaResolver {
    async fetchData(
    ): Promise<SonaOverview> {
        return new SonaService().FetchVersion()
    }

    async fetchAbilityRawdataQ(): Promise<SonaRawStatsQ>{
        return new SonaService().FetchRawQ()
    }

    async fetchAbilityRawdataW(): Promise<SonaRawStatsW>{ 
        return new SonaService().FetchRawW()
    }

    async fetchAbilityRawdataE(): Promise<SonaRawStatsE>{ 
        return new SonaService().FetchRawE()
    }
}