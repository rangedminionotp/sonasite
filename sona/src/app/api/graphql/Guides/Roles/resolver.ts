import { Query, Resolver, Mutation, Arg, Authorized ,  Ctx} from "type-graphql"
import type { NextApiRequest } from 'next'
import { GuideRolesService } from "./service"
import { GuidesRolesType } from "./schema"

@Resolver()
export class GuideRowsResolver {
    @Query(() => [GuidesRolesType])
    async getGuidesRoles(): Promise<GuidesRolesType[]> {
        return new GuideRolesService().getGuidesRoles();
    }
}