import { Field, ObjectType, ArgsType } from "type-graphql"
import { Length, Matches } from "class-validator";
import { SkinOverview, SkinInfo } from "../Skin/schema";
import { uuid } from "../../../types/custom";

@ArgsType()
export class SonaOverview {
    @Field()
    name!: string
    @Field()
    title!: string 
    @Field()
    lore!: string
    @Field()
    abilities!: SonaAbilities[] 
    @Field()
    version!: string
    @Field()
    skins!: SonaSkins[]
}


@ArgsType()
export class SonaSkins {
    @Field()
    @Matches(uuid) 
    id!: string
    @Field()
    num!: number
    @Field()
    name!: string
    @Field()
    chromas!: boolean
    @Field()
    imgURL!: string
    @Field()
    info?: SkinOverview[]
}

@ArgsType()
export class SonaAbilities{
    @Field()
        @Matches(uuid)
    id?:string
    @Field()
    name?: string
    @Field()
    tooltip?: string
    @Field()
    description?: string
    @Field()
    passive?: SonaPassive 
    @Field()
    imgURL?: string
}

@ArgsType()
export class SonaPassive{ 
    @Field()
    name?: string 
    @Field()
    description?: string
    @Field()
    imgURL?:string
}

// maybe not hardcode variable names...? ._.
// k hardcode for now...

@ArgsType()
export class SonaRawStatsQ {
    @Field() 
    totaldamage!: string[]
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
    @Field()
    spellmodifierdescriptionappend!: string
} 

@ArgsType()
export class SonaRawStatsW {
    @Field()
    totalheal!: string[]
    Field()
    baseHeal!: string[]
    @Field()
    healRatio!: string
    @Field()
    totalshield!: string[]
    @Field()
    baseShield!: string[]
    @Field()
    shieldRatio!:string 
    @Field()
    accelerandoshieldbreakpoint!: string[]
    @Field()
    totaldiminuendoweakenpercent!: string
    @Field()
    diminuendoduration!: string
    @Field()
    manaCost!: string[]
    // cant find w cd in raw data json wutttt have to hardcode...
    @Field()
    cooldown!: string[]
    @Field()
    auraduration!: string 
    @Field()
    shieldduration!: string
    @Field()
    spellmodifierdescriptionappend!: string
}

@ArgsType()
export class SonaRawStatsE {
    @Field()
    totalselfmovementspeed!: string
    @Field()
    selfMSBaseRatio!:string
    @Field()
    selfmovementspeeddurationmin!: string
    @Field()
    selfmovementspeeddurationmax!: string
    @Field()
    totalallymovementspeed!: string[]
    @Field()
    allymovementspeedduration!: string
    @Field()
    totaltempomovespeedslow!: string
    @Field()
    tempoduration!: string
    @Field()
    manaCost!: string[]
    @Field()
    cooldown!: string[]
    @Field()
    spellmodifierdescriptionappend!: string
    @Field()
    auraduration!:string
}

@ArgsType()
export class SonaRawStatsR {
    @Field()
    stunduration!: string
    @Field()
    baseDamage!:string[]
    @Field()
    totaldamage!: string[]
    @Field()
    manaCost!: string[]
    @Field()
    cooldown!: string[]
    @Field()
    spellmodifierdescriptionappend!: string
}
 