import { pool } from "@/db";

import { SonaOverview, SonaAbilities, SonaPassive,SonaRawStatsQ, SonaRawStatsW,  SonaRawStatsE, SonaRawStatsR, SonaSkins } from "./schema";

const sona = 'Sona'

function decimalToPercentage(decimalValue: number, precision: number = 2): string {
    const roundedValue: number = Math.round(decimalValue * 100); // Round to the nearest integer
    return `${roundedValue}%`;
}

function decimalToSmallPercentage(decimalValue: number, precision: number = 2): string {
    const roundedValue: number = Math.round(decimalValue * 10000) / 100; // Round to two decimal places
    return `${roundedValue.toFixed(precision)}%`; // Format the value with the specified precision
}

export class SonaService { 
  public async FetchVersion(): Promise<SonaOverview> { 
      try {
        const response = await fetch("http://localhost:3000/api/fetchdata")
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const version = await response.json()
        let sonaData: SonaAbilities[] = []
        for (const index of [0, 1, 2, 3]) {
          sonaData.push({
            "id": version.data.Sona.spells[index].id,
            "name": version.data.Sona.spells[index].name,
            "tooltip": version.data.Sona.spells[index].tooltip,
            "description": version.data.Sona.spells[index].description
          })
        }
        let sonaSkins: SonaSkins[] = []
        let skinArray = version.data.Sona.skins
        console.log(skinArray)
        const skinName = []
        const ide = []
        for (const items of skinArray) { 
          const skinObj: SonaSkins = {
            "id": items.id,
            "num": items.num,
            "name": items.name,
            "chromas": items.chromas,
            "imgURL": `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Sona_${items.num}.jpg`
          }
          ide.push(`https://modelviewer.lol/model-viewer?id=${items.id}`)
          skinName.push(items.name)
          sonaSkins.push(skinObj)
        }
        console.log(ide)
        console.log(skinName)
        let sonaPassive: SonaPassive = {
          'name':version.data.Sona.passive.name,
          'description':version.data.Sona.passive.description
        }
         sonaData.push(sonaPassive)
          const SonaOverview: SonaOverview = {
            'name': version.data.Sona.name,
            'title': version.data.Sona.title,
            'lore': version.data.Sona.lore,
            'abilities': sonaData,
            'version': version.version ,
            'skins':sonaSkins
        }
        return SonaOverview;
        } catch (error) {
            console.error('Error fetching version data', error);
            return 'meow' //not a right return type btw xdddd
        }
  } 

  public async FetchRawQ(): Promise<SonaRawStatsQ>{
    try {
      const response = await fetch("http://localhost:3000/api/fetchRawData")
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      // raw data json fetched & stored in **data** 
      const data = await response.json()

      // paths 
      const sonaQPath = data[`Characters/${sona}/Spells/${sona}QAbility/${sona}Q`]['mSpell']
      const totalDamagePath:number = sonaQPath['mSpellCalculations']['TotalDamage']['mFormulaParts'][1]['mCoefficient']
      const convertedTotalDmg :string = decimalToPercentage(totalDamagePath, 2)
      const TotalStaccatoDamagePath:number = sonaQPath['mSpellCalculations']['TotalStaccatoDamage']['mFormulaParts'][1]['mCoefficient']
      const convertedTotalStacc:string = decimalToPercentage(TotalStaccatoDamagePath, 2)
      
      const cooldownPath:string[]= sonaQPath['cooldownTime'].slice(1, -1);
      const manaPath:string[] = sonaQPath['mana'].slice(0, -1);
      const auraPath:string[] = sonaQPath['mDataValues'][5]['mValues']
      const damageActivePath: string[] = sonaQPath['mDataValues'][0]['mValues'].slice(1, -1);
      const damageMelodyPath: string[] = sonaQPath['mDataValues'][1]['mValues'].slice(1, -1);
      const onhitdurationPath: string[] = sonaQPath['mDataValues'][3]['mValues'] 
      const totalonhitdamage: string[] = []
      const totaldamage:string[] = [] 
      const OnhitradioPath: string = sonaQPath['mDataValues'][8]['mValues'][0]
      const convertedOnhitradio:string = decimalToPercentage(OnhitradioPath, 2)
      totalonhitdamage.push(`${damageMelodyPath.map((item, index) => item + ' / ').join('')}(+ ${convertedOnhitradio})`);
      totaldamage.push(`${damageActivePath.map((item, index) => item + ' / ').join('')}(+ ${convertedTotalDmg})`);

      
      let sonaRawStatsQ: SonaRawStatsQ = {
        'totaldamage': totaldamage,
        'totalstaccatodamage': convertedTotalStacc,
        'cooldown': cooldownPath, 
        'manaCost': manaPath,
        'auraduration': auraPath[0],
        'damageActive': damageActivePath,
        'damageMelody': damageMelodyPath,
        'onhitduration': onhitdurationPath[0],
        'onhitradio':convertedOnhitradio,
        'totalonhitdamage': totalonhitdamage,
        'spellmodifierdescriptionappend': ""
      }
      return sonaRawStatsQ
    }
    catch (error) {
            console.error('Error fetching raw data', error);
            return 'meow' //not a right return type btw xdddd
        } 
  }

  public async FetchRawW(): Promise<SonaRawStatsW> {
    try {
      const response = await fetch("http://localhost:3000/api/fetchRawData")
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      // raw data json fetched & stored in **data** 
      const data = await response.json() 
       // paths 
      const sonaWPath = data[`Characters/${sona}/Spells/${sona}WAbility/${sona}W`]['mSpell']
      const baseHealPath: string[] = sonaWPath['mDataValues'][0]['mValues'].slice(1, -1)
      const baseShieldPath: string[] = sonaWPath['mDataValues'][1]['mValues'].slice(1, -1)
      const auradurationPath: string = sonaWPath['mDataValues'][2]['mValues'][0]
      const diminuendodurationPath: string = sonaWPath['mDataValues'][5]['mValues'][0]
      const healRatio: string = sonaWPath['mDataValues'][9]['mValues'][0]
      const convertedHealratio: string = decimalToPercentage(healRatio, 2) 
      const shieldRatio: string = sonaWPath['mSpellCalculations']['TotalShield']['mFormulaParts'][1]['mCoefficient']
      const convertedShieldratio: string = decimalToPercentage(shieldRatio, 2)
      const accelerandoshieldbreakpointPath: string[] = sonaWPath['mDataValues'][8]['mValues'].slice(1, -1)
      const accelerandoshieldbreakpoint: string[] = []
      accelerandoshieldbreakpoint.push(`[${accelerandoshieldbreakpointPath.map((item, index) => index === accelerandoshieldbreakpointPath.length - 1 ? item : item + ' / ').join('')}]`);
      const totaldiminuendoweakenpercentPath: string = sonaWPath['mSpellCalculations']['TotalDiminuendoWeakenPercent']['mFormulaParts'][1]['mCoefficient']
      const totaldiminuendoweakenpercentratio: string = decimalToSmallPercentage(totaldiminuendoweakenpercentPath, 2)
      const manaPath:string[] = sonaWPath['mana'].slice(0, -1);
      const totalheal: string[] = []
      totalheal.push(`${baseHealPath.map((item, index) => index === baseHealPath.length - 1 ? item : item + ' / ').join('')}(+ ${convertedHealratio})`);
      const totalShield: string[] = []
      totalShield.push(`${baseShieldPath.map((item, index) => index === baseShieldPath.length - 1 ? item : item + ' / ').join('')}(+ ${convertedShieldratio})`);
      const cooldown: string[] = [10, 10, 10, 10, 10];
      const shielddurationPath:string =  sonaWPath['mDataValues'][7]['mValues'][0]
      let sonaRawStatsW: SonaRawStatsW = {
        'baseHeal': baseHealPath,
        'baseShield': baseShieldPath,
        'auraduration': auradurationPath,
        'diminuendoduration': diminuendodurationPath,
        'healRatio': convertedHealratio,
        'shieldRatio': convertedShieldratio,
        'accelerandoshieldbreakpoint': accelerandoshieldbreakpoint,
        'totaldiminuendoweakenpercent': totaldiminuendoweakenpercentratio,
        'manaCost': manaPath,
        'totalheal': totalheal,
        'totalshield': totalShield,
        "shieldduration": shielddurationPath,
        'cooldown': cooldown,
        "spellmodifierdescriptionappend": ""
      }  
      return sonaRawStatsW;
    } catch (error) {
            console.error('Error fetching raw data W', error);
            return 'meow' //not a right return type btw xdddd
        }
  }

  public async FetchRawE(): Promise<SonaRawStatsE> {
    
    try {
      const response = await fetch("http://localhost:3000/api/fetchRawData")
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      // raw data json fetched & stored in **data** 
      const data = await response.json() 
      // paths 
      const sonaEPath = data[`Characters/${sona}/Spells/${sona}EAbility/${sona}E`]['mSpell']
      const selfMSBaseRatioPath : string = sonaEPath["mDataValues"][0]["mValues"][0]
      const convertedselfMSBaseRatio : string = decimalToPercentage(selfMSBaseRatioPath, 2)
      const allyMSBaseRatioPath : string[] = sonaEPath["mDataValues"][1]["mValues"].slice(1, -1)
      const convertedallyMSBaseRatio: string[] = allyMSBaseRatioPath.map((item, index) => decimalToSmallPercentage(item, 2));
      
      const selfmovementspeeddurationminPath: string = sonaEPath["mDataValues"][2]["mValues"][0]
      const selfmovementspeeddurationmaxPath: string = sonaEPath["mDataValues"][3]["mValues"][0]
      const allymovementspeeddurationPath: string = sonaEPath["mDataValues"][4]["mValues"][0]
      const tempodurationPath: string = sonaEPath["mDataValues"][8]["mValues"][0] 
      const totalallymovementspeedRatio : string = sonaEPath['mSpellCalculations']['TotalAllyMovementSpeed']['mFormulaParts'][1]['mCoefficient']
      const totalselfmovementspeedRatio : string = sonaEPath['mSpellCalculations']['TotalSelfMovementSpeed']['mFormulaParts'][1]['mCoefficient']
      const totaltempomovespeedslowRatio : string = sonaEPath['mSpellCalculations']['TotalTempoMoveSpeedSlow']['mFormulaParts'][1]['mCoefficient']
      
      const convertedtotalallymovementspeedRatio: string = decimalToSmallPercentage(totalallymovementspeedRatio, 2) // 0.02%
      const convertedtotalselfmovementspeedRatio: string = decimalToSmallPercentage(totalselfmovementspeedRatio, 2) // 0.02%
      const convertedtotaltempomovespeedslowRatioRatio: string = decimalToSmallPercentage(totaltempomovespeedslowRatio, 2) //0.04%
      
      const TotalTempoMoveSpeedSlowBaseRatio: string = sonaEPath['mSpellCalculations']['TotalTempoMoveSpeedSlow']['mFormulaParts'][0]['mNumber']
      const convertedTotalTempoMoveSpeedSlowBaseRatio: string = decimalToPercentage(TotalTempoMoveSpeedSlowBaseRatio, 2) //50%
 
      const totalselfmovementspeed: string = `${convertedselfMSBaseRatio} + ${convertedtotalselfmovementspeedRatio}`
      const totaltempomovespeedslow: string = `${convertedTotalTempoMoveSpeedSlowBaseRatio} + ${convertedtotaltempomovespeedslowRatioRatio}`
      const totalallymovementspeed: string[] = []
      totalallymovementspeed.push(`${convertedallyMSBaseRatio.map((item, index) => index === convertedallyMSBaseRatio.length - 1 ? item : item + ' / ').join('')}(+ ${convertedtotalallymovementspeedRatio})`);
      const cooldown: string[] = sonaEPath['cooldownTime'].slice(1, -1);
      const mana: string[] = sonaEPath['mana'].slice(0, -1);
      const auradurationPath: string = sonaEPath['mDataValues'][2]['mValues'][0]

      const SonaRawStatsE: SonaRawStatsE = {
        'selfMSBaseRatio': convertedselfMSBaseRatio,
        'selfmovementspeeddurationmin': selfmovementspeeddurationminPath,
        'selfmovementspeeddurationmax': selfmovementspeeddurationmaxPath,
        'allymovementspeedduration': allymovementspeeddurationPath, 
        'tempoduration': tempodurationPath,
         'totalselfmovementspeed': totalselfmovementspeed,
        'totaltempomovespeedslow': totaltempomovespeedslow, 
        "totalallymovementspeed": totalallymovementspeed,
        'manaCost': mana,
        'cooldown': cooldown,
        'auraduration': auradurationPath,
        'spellmodifierdescriptionappend': ""
      }
      return SonaRawStatsE;
    } catch (error) {
            console.error('Error fetching raw data E', error);
            return 'meow' //not a right return type btw xdddd
        } 
  } 

  public async FetchRawR(): Promise<SonaRawStatsR>{
    try {
      const response = await fetch("http://localhost:3000/api/fetchRawData")
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      // raw data json fetched & stored in **data** 
      const data = await response.json() 
      // paths 
      const sonaRPath = data[`Characters/${sona}/Spells/${sona}RAbility/${sona}R`]['mSpell']
      const baseDamagePath: string[] = sonaRPath['mDataValues'][0]['mValues'].slice(1, 4)
      const stundurationPath: string[] = sonaRPath['mDataValues'][1]['mValues'][0]
      const cooldownPath: string[] = sonaRPath['cooldownTime'].slice(1, 4)
      const manaPath: string[] = sonaRPath['mana'].slice(0, 3)
      const damageRatio: string = sonaRPath['mSpellCalculations']['TotalDamage']['mFormulaParts'][1]['mCoefficient']
      const convertedDamageRatio: string = decimalToPercentage(damageRatio, 2)
      const totalDamage: string[] = []
      totalDamage.push(`${baseDamagePath.map((item, index) => index === baseDamagePath.length - 1 ? item : item + ' / ').join('')} (+ ${convertedDamageRatio})`);
      let sonaRawStatsR: SonaRawStatsR = {
        'stunduration': stundurationPath,
        'baseDamage': baseDamagePath,
        'totaldamage': totalDamage,
        'manaCost': manaPath,
        'cooldown': cooldownPath,
        'spellmodifierdescriptionappend': ""
      }
      return sonaRawStatsR;
    } catch (error) {
            console.error('Error fetching raw data R', error);
            return 'meow' //not a right return type btw xdddd
        } 
  } 
}