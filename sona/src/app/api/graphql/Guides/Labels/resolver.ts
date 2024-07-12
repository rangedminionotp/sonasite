import { Query, Resolver, Mutation, Arg, Authorized ,  Ctx} from "type-graphql"
import type { NextApiRequest } from 'next'
import { GuideLabelsService } from "./service"
import { GuidesLabelsType, GuidesCustomLabelsType } from "./schema"

@Resolver()
export class GuideLabelsResolver {
    @Query(() => [GuidesLabelsType])
    async getGuidesLabels(): Promise<GuidesLabelsType[]> {
        return new GuideLabelsService().getGuidesLabels();
    }
    @Authorized('member')
    @Query(() => [GuidesCustomLabelsType])
    async getGuidesCustomLabels(@Ctx() request: NextApiRequest): Promise<GuidesCustomLabelsType[]> {
        return new GuideLabelsService().getGuidesCustomLabels(request.request.user.id);
    }

    @Authorized('member')
    @Mutation(() => GuidesCustomLabelsType)
    async addCustomGuideLabel(@Arg("label") label: string, @Ctx() request: NextApiRequest): Promise<GuidesCustomLabelsType> {
        return new GuideLabelsService().addCustomGuideLabel(label, request.request.user.id);
    }
    @Authorized('member')
    @Mutation(() => GuidesCustomLabelsType)
    async deleteCustomGuideLabel(@Arg("labelId") labelId: string): Promise<GuidesCustomLabelsType> {
        return new GuideLabelsService().deleteCustomGuideLabel(labelId);
    }
    @Authorized('member')
    @Mutation(() => GuidesCustomLabelsType)
    async updateCustomGuideLabel(@Arg("labelId") labelId: string, @Arg("label") label: string): Promise<GuidesCustomLabelsType> {
        return new GuideLabelsService().updateCustomGuideLabel(labelId, label);
    }
    @Authorized('member')
    @Query(() => Number)
    async checkHowManyCustomsByUser(@Ctx() request: NextApiRequest): Promise<number> {
        return new GuideLabelsService().checkHowManyCustomsByUser(request.request.user.id);
    }
}