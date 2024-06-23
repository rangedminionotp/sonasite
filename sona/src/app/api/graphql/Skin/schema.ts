import { Field, ObjectType, InputType, ArgsType, Float} from "type-graphql"
import { Matches, Length } from "class-validator";
import { uuid } from "../../../types/custom";

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
    @Matches(uuid)
    id!: string
    @Field()
    name!: string
    @Field()
    data!: SkinInfo
    @Field(type => Float)
    rating!: number;
}

