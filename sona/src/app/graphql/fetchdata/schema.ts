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
// k hardcode for now...

@ArgsType()
export class SonaRawStatsQ {
    @Field() 
    totaldamage!: string
    @Field()
    auraduration!: string[] 
    @Field()
    totalstaccatodamage!:string
    @Field()
    onhitduration!: string[] 
    @Field()
    damageActive!: string[]
    @Field()
    damageMelody!: string[]
    @Field()
    manaCost!: string[]
    @Field()
    cooldown!: string[]  
    @Field()
    onhitradio!: string
    @Field()
    totalonhitdamage!: string[]
} 
 