import { Query, Resolver, Mutation, Arg, Authorized ,  Ctx} from "type-graphql"
import type { NextApiRequest } from 'next'

import { SkinLore, SkinLoreInput } from './schema'
import { SkinLoreService } from './service' 

@Resolver()
export class SkinLoreResolver {
    @Query(() => [SkinLore])
    async getAllSkinLore(): Promise<SkinLore[]>{
        return new SkinLoreService().getAllUserLores()
    }
    @Query(() => [SkinLore])
    async getLoreBySkinId(@Arg('skin_id') skin_id: string): Promise<SkinLore[]>{
        return new SkinLoreService().getLoreBySkinId(skin_id)
    }
}