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
    @Authorized('member')
    @Mutation(() => SkinLore)
    async createLore(@Arg('loreInput') loreInput: SkinLoreInput): Promise<SkinLore>{
        return new SkinLoreService().createLore(loreInput)
    }
    @Authorized('member')
    @Mutation(() => SkinLore)
    async editLore(@Arg('loreInput') loreInput: SkinLoreInput): Promise<SkinLore>{
        return new SkinLoreService().editLore(loreInput)
    }
    @Authorized('member')
    @Query(() => [SkinLore])
    async getLoreByUserId(@Arg('owner_id') owner_id: string, @Arg('skin_id') skin_id: string): Promise<SkinLore[]>{
        return new SkinLoreService().getLoreByUserId(owner_id, skin_id)
    }
    @Authorized('member')
    @Mutation(() => SkinLore)
    async deleteLore(@Arg('id') id: string): Promise<SkinLore>{
        return new SkinLoreService().deleteLore(id)
    }
}