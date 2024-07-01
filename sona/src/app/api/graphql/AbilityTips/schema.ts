import { Field, ObjectType, InputType, ArgsType} from "type-graphql"
import { Matches, Length,MaxLength } from "class-validator";

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
    date!: Date
    @Field()
    ownerName!: string
    @Field()
    version!: string
    @Field()
    upvotes!: number
    @Field()
    downvotes!: number
    @Field()
    edited?: boolean
}

@ObjectType()
export class AbilityTipsData {
    @Field()
    description!: string
    @Field()
    date!: Date
}

@ObjectType()
export class AbilityTipsVotes { 
    @Field()
    tip_id!: string
    @Field()
    owner_id!: string
    @Field()
    voted!: boolean
}