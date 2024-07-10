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
    @Field(()=>[SonaAbilities])
    abilities!: SonaAbilities[] 
    @Field()
    version!: string
    @Field(()=>[SonaSkins])
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
    @Field(() => [SkinOverview], { nullable: true })
info?: SkinOverview[];
}
@ArgsType()
export class SonaPassive{ 
    @Field({ nullable: true })
    name?: string 
    @Field({ nullable: true })
    description?: string
    @Field({ nullable: true })
    imgURL?:string
}

@ArgsType()
export class SonaAbilities{
    @Field({ nullable: true })
        @Matches(uuid)
    id?:string
    @Field({ nullable: true })
    name?: string
    @Field()
    tooltip?: string
    @Field()
    description?: string
    @Field({ nullable: true }, ()=>SonaPassive)
    passive?: SonaPassive 
    @Field({ nullable: true })
    imgURL?: string
}


// maybe not hardcode variable names...? ._.
// k hardcode for now...

@ArgsType()
export class SonaRawStatsQ {
    @Field(()=>[string]) 
    totaldamage!: string[]
    @Field(()=>[string])
    auraduration!: string[] 
    @Field()
    totalstaccatodamage!:string
    @Field(()=>[string])
    onhitduration!: string[] 
    @Field(()=>[string])
    damageActive!: string[]
    @Field(()=>[string])
    damageMelody!: string[]
    @Field(()=>[string])
    manaCost!: string[]
    @Field(()=>[string])
    cooldown!: string[]  
    @Field()
    onhitradio!: string
    @Field(()=>[string])
    totalonhitdamage!: string[]
    @Field()
    spellmodifierdescriptionappend!: string
} 

@ArgsType()
export class SonaRawStatsW {
    @Field(()=>[string])
    totalheal!: string[]
    @Field(()=>[string])
    baseHeal!: string[]
    @Field()
    healRatio!: string
    @Field(()=>[string])
    totalshield!: string[]
    @Field(()=>[string])
    baseShield!: string[]
    @Field()
    shieldRatio!:string 
    @Field(()=>[string])
    accelerandoshieldbreakpoint!: string[]
    @Field()
    totaldiminuendoweakenpercent!: string
    @Field()
    diminuendoduration!: string
    @Field(()=>[string])
    manaCost!: string[]
    // cant find w cd in raw data json wutttt have to hardcode...
    @Field(()=>[string])
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
    @Field(()=>[string])
    totalallymovementspeed!: string[]
    @Field()
    allymovementspeedduration!: string
    @Field()
    totaltempomovespeedslow!: string
    @Field()
    tempoduration!: string
    @Field(()=>[string])
    manaCost!: string[]
    @Field(()=>[string])
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
    @Field(()=>[string])
    baseDamage!:string[]
    @Field(()=>[string])
    totaldamage!: string[]
    @Field(()=>[string])
    manaCost!: string[]
    @Field(()=>[string])
    cooldown!: string[]
    @Field()
    spellmodifierdescriptionappend!: string
}
 