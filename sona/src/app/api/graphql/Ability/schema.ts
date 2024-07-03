import { Field, ObjectType, InputType, ArgsType} from "type-graphql"
import { Matches, Length } from "class-validator";
import { uuid } from "../../../types/custom";


@ObjectType()
export class AbilityInfo {
    @Field()
    @Matches(uuid)
    abilityId!: string
    @Field()
    abilityName!: string
    @Field()
    fullName!:string
}
