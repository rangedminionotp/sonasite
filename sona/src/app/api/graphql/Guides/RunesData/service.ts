import { pool } from "@/db";

import { RuneTree, RuneSlot, Rune } from "./schema";

export class RuneDataService {
    async fetchRuneData(): Promise<RuneTree[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchRuneData`);
  const data = await res.json();
  let runeDataList: RuneTree[] = [];

        for (const item of data) {
            let runeSlots: RuneSlot[] = []
            let rowOne: Rune[] = []
            let rowTwo: Rune[] = []
            let rowThree: Rune[] = []
            let rowFour: Rune[] = []
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
                        rowOne.push(runeData);
                    } else if (count < 6) {
                        rowTwo.push(runeData);
                    } else if (count < 9) {
                        rowThree.push(runeData);
                    } else {
                        rowFour.push(runeData);
                    }
                    count += 1
                } 
                
            }
            runeSlots.push({ rowOne, rowTwo, rowThree, rowFour })
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