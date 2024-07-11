import { Query, Resolver, Mutation, Arg, Authorized ,  Ctx} from "type-graphql"
import type { NextApiRequest } from 'next'
import { GuideLabelsService } from "./service"
import { GuidesLabelsType } from "./schema"

@Resolver()
export class GuideLabelsResolver {
    @Query(() => [GuidesLabelsType])
    async getGuidesLabels(): Promise<GuidesLabelsType[]> {
        return new GuideLabelsService().getGuidesLabels();
    }
}