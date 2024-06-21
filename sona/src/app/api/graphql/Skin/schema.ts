import { Field, ObjectType, InputType, ArgsType} from "type-graphql"
import { Matches, Length } from "class-validator";

@ObjectType()
export class SkinInfo {
    @Field()
    lore!: string
    @Field()
    price!: string
    @Field()
    releaseDate!: Date
    @Field()
    artist!: string
    @Field()
    threeDURL!: string
    @Field()
    voiceActor!: string
}

@ObjectType()
export class SkinOverview { 
    @Field()
    id!: string
    @Field()
    name!: string
    @Field()
    data!: SkinInfo
}

