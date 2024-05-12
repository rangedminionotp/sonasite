import { pool } from "../../../../db";

import { SonaOverview, SonaAbilities, SonaPassive,SonaRawStatsQ } from "./schema";

const sona = 'Sona'

function decimalToPercentage(decimalValue: number, precision: number = 2): string {
    const roundedValue: number = Math.round(decimalValue * 100); // Round to the nearest integer
    return `${roundedValue}%`;
}

export class SonaService {
    public async FetchVersion():Promise<SonaOverview> {
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
        let sonaPassive: SonaPassive = {
          'name':version.data.Sona.passive.name,
          'description':version.data.Sona.passive.description
        }
         
          const SonaOverview: SonaOverview = {
            'name': version.data.Sona.name,
            'title': version.data.Sona.title,
            'lore': version.data.Sona.lore,
            'abilities': sonaData,
            'version': version.version,
            'passive': sonaPassive
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
      
      const cooldownPath:string[]= sonaQPath['cooldownTime']
      const manaPath:string[] = sonaQPath['mana']
      const auraPath:string[] = sonaQPath['mDataValues'][5]['mValues']
      const damageActivePath :string[]= sonaQPath['mDataValues'][0]['mValues'] 
      const damageMelodyPath :string[]= sonaQPath['mDataValues'][1]['mValues'] 
      const onhitdurationPath: string[] = sonaQPath['mDataValues'][3]['mValues'] 
      const totalonhitdamage: string[] = []
      const OnhitradioPath: string = sonaQPath['mDataValues'][8]['mValues'][0]
      const convertedOnhitradio:string = decimalToPercentage(OnhitradioPath, 2)
      for (const item of damageMelodyPath) {
        totalonhitdamage.push(`${item} + ${convertedOnhitradio}`)
      } 

      let sonaRawStatsQ: SonaRawStatsQ = {
        'totaldamage': convertedTotalDmg,
        'totalstaccatodamage': convertedTotalStacc,
        'cooldown': cooldownPath, 
        'manaCost': manaPath,
        'auraduration': auraPath[0],
        'damageActive': damageActivePath,
        'damageMelody': damageMelodyPath,
        'onhitduration': onhitdurationPath[0],
        'onhitradio':convertedOnhitradio,
        'totalonhitdamage': totalonhitdamage
      }
      return sonaRawStatsQ
    }
    catch (error) {
            console.error('Error fetching raw data', error);
            return 'meow' //not a right return type btw xdddd
        } 
  }
}