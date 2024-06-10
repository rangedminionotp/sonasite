import { Field, ObjectType, InputType, ArgsType} from "type-graphql"
import { Matches, Length } from "class-validator";


@ObjectType()
export class AbilityInfo {
    @Field()
    abilityId!: string
    @Field()
    abilityName!:string
}
