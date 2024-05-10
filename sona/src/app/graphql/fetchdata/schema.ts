import { Field, ObjectType, ArgsType } from "type-graphql"
import { Length, Matches } from "class-validator";

@ArgsType()
export class SonaOverview {
    @Field()
    name!: string
    @Field()
    title!: string 
    @Field()
    lore!: string
    @Field()
    abilities: SonaAbilities[] 
    @Field()
    passive: SonaPassive
    @Field()
    version!: string
}

@ArgsType()
export class SonaAbilities{
    @Field()
    id!: string
    @Field()
    name!: string
    @Field()
    tooltip!: string
    @Field()
    description!:string
}

@ArgsType()
export class SonaPassive{ 
    @Field()
    name!: string 
    @Field()
    description!:string
}

// maybe not hardcode variable names...? ._. 
@ArgsType()
export class SonaRawStats {
    @Field()
    totaldamage!: string 

}