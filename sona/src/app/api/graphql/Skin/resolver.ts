import { Query, Resolver, Mutation, Arg, Authorized ,  Ctx} from "type-graphql"
import type { NextApiRequest } from 'next'
import { SkinService } from "./service"
import { SkinInfo, SkinOverview} from "./schema"

@Resolver()
export class SkinResolver {
    @Query(() => [SkinOverview]) 
    async getAllSkins(): Promise<SkinOverview[]>{
        return new SkinService().getSkin()
    } 
}