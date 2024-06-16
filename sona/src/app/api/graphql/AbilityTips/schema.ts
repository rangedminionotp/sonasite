import { Field, ObjectType, InputType, ArgsType} from "type-graphql"
import { Matches, Length } from "class-validator";

@ObjectType()
export class AbilityTipsInfo {
    @Field()
    tip_id!:string
    @Field()
    ability_id!: string
    @Field()
    description!: string
    @Field()
    ownerId!: string
    @Field()
    date!: string
    @Field()
    ownerName!: string
    @Field()
    version!: string
    @Field()
    upvotes!: number
    @Field()
    downvotes!: number
}

@ObjectType()
export class AbilityTipsData {
    @Field()
    description!: string
    @Field()
    date!:string
}