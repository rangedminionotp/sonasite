import { pool } from "@/db";

import {ItemDataType  } from "./schema"
 
export class ItemDataService {
    async fetchData(): Promise<ItemDataType[]> { 
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchItemData`)
        const data = await res.json() 
        let itemDataList: ItemDataType[] = []
        let items = data.data
        for (let item in items) { 
            const itemData: ItemDataType = {
                id: item,
                name: items[item].name,
                // description: items[item].description || null,
                plaintext: items[item].plaintext,
                image: items[item].image.full,
                buildInto: items[item].into || null,
                buildFrom: items[item].from || null,
                tags: items[item].tags || null,
                gold: items[item].gold || null,
                // stats: items[item].stats || null,
            }
            itemDataList.push(itemData)
        }
        return itemDataList
    }
    async fetchItemTree(): Promise<ItemTree[]> {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchItemData`) 
        const data = await res.json()
        let itemTreeList: ItemTree[] = [] 
        let items = data.tree
        for (let item in items) {
            const itemTree: ItemTree = {
                header: items[item].header,
                tags: items[item].tags
            }
            itemTreeList.push(itemTree)
        }
        return itemTreeList
    }
}