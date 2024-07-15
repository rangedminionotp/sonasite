import { Field, ObjectType, InputType, ArgsType, Float} from "type-graphql"
import { Matches, Length } from "class-validator";
import { uuid } from "../../../../types/custom";

//  https://ddragon.canisback.com/img/
@ObjectType()
export class Rune{
    @Field()
    id!: string
    @Field()
    key!: string
    @Field()
    icon!: string
    @Field()
    name!: string
    @Field()
    shortDesc!: string
    @Field()
    longDesc!: string
}

@ObjectType()
export class RuneSlot{
    @Field(() => [Rune])
    keystone!: Rune[]
    @Field(() => [Rune])
    normalRunes!: Rune[] 
}


@ObjectType()
export class RuneTree {
    @Field()
    id!: string
    @Field()
    key!: string
    @Field()
    icon!: string
    @Field()
    name!: string
    @Field(() => [RuneSlot])
    slots!: RuneSlot[]
}