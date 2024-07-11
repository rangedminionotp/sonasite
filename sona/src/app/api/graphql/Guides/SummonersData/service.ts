import { pool } from "@/db";

import {SummonersDataType, SummonersDataInput} from "./schema"
 
export class SummonersDataService {
    public async fetchData() : Promise<SummonersDataType[]> { 
        const res = await fetch(`http://localhost:3000/api/fetchSummonerData`)
        const data = await res.json()
        // console.log('data', data) 
        let summonerData: SummonersDataType[] = []
        let summoner = data.data;
        for (const item in summoner) {
            if (summoner[item].modes.includes('CLASSIC')) {
                const ssummonerData: SummonersDataType = {
                    version: data.version,
                    id: summoner[item].id,
                    name: summoner[item].name,
                    description: summoner[item].description,
                    cooldown: summoner[item].cooldownBurn,
                    imageURL: summoner[item].image.full
                }
                summonerData.push(ssummonerData)
            }
        }
            return summonerData  
    }
}