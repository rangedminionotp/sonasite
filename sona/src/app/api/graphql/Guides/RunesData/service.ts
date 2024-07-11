import { pool } from "@/db";

import { RuneTree, RuneSlot, Rune } from "./schema";

export class RuneDataService {
    async fetchRuneData(): Promise<RuneTree[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchRuneData`);
  const data = await res.json();
  let runeDataList: RuneTree[] = [];

        for (const item of data) {
            let runeSlots: RuneSlot[] = []
            for (const slot of item.slots) {
                let runes: Rune[] = []
                for (const rune of slot.runes) {
                    let runeData: Rune = {
                        id: rune.id,
                        key: rune.key,
                        icon: rune.icon,
                        name: rune.name,
                        shortDesc: rune.shortDesc,
                        longDesc: rune.longDesc
                    }
                    runes.push(runeData)
                }
                runeSlots.push({ runes })
            }
            let runeTree: RuneTree = {
                id: item.id,
                key: item.key,
                icon: item.icon,
                name: item.name,
                slots: runeSlots
            }
            runeDataList.push(runeTree)
     
  }

  return runeDataList;
}
}