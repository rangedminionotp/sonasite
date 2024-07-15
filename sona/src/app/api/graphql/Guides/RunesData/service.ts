import { pool } from "@/db";

import { RuneTree, RuneSlot, Rune } from "./schema";

export class RuneDataService {
    async fetchRuneData(): Promise<RuneTree[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchRuneData`);
  const data = await res.json();
  let runeDataList: RuneTree[] = [];

        for (const item of data) {
            let runeSlots: RuneSlot[] = []
            let keystone: Rune[] = []
                let normalRunes: Rune[] = []
            let count = 0
            for (const slot of item.slots) {
                
                 for (const rune of slot.runes) {
                    let runeData: Rune = {
                        id: rune.id,
                        key: rune.key,
                        icon: `https://ddragon.canisback.com/img/${rune.icon}`,
                        name: rune.name,
                        shortDesc: rune.shortDesc,
                        longDesc: rune.longDesc
                    } 
                    if (count < 3) {
                        keystone.push(runeData);
                    } else {    
                        normalRunes.push(runeData);
                    }
                    count += 1
                } 
                
            }
            runeSlots.push({ keystone, normalRunes })
            let runeTree: RuneTree = {
                id: item.id,
                key: item.key,
                icon: `https://ddragon.canisback.com/img/${item.icon}`,
                name: item.name,
                slots: runeSlots
            }
            runeDataList.push(runeTree)
     
  }

  return runeDataList;
}
}