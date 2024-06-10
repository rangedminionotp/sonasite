import { Field, ObjectType, InputType, ArgsType} from "type-graphql"
import { Matches, Length } from "class-validator";

@ObjectType()
export class AbilityTipsInfo {
    @Field()
    ability!: string
    @Field()
    description!: string
    @Field()
    ownerId!: string
    @Field()
    date!: string
    @Field()
    ownerName!:string
}