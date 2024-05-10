import { pool } from "../../../../db";

import { SonaOverview, SonaAbilities, SonaPassive } from "./schema";

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
}