import { pool } from "@/db";

import {ItemDataType, ItemsType, ItemTree } from "./schema"
 
export class ItemDataService {
    async fetchData(): Promise<ItemsType> { 
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchItemData`)
        const data = await res.json() 
        let itemDataList: ItemsType = {}
        let items = data.data

        let starter: ItemDataType[] = []
        let basic: ItemDataType[] = []
        let epic: ItemDataType[] = []
        let legendary: ItemDataType[] = []

        for (let item in items) {
            if (items[item].tags.includes('Jungle') || items[item].tags.includes('Lane')) {
                items[item].tags.push('starter')
            } 
            const excludeJGBoots = !items[item].tags.includes('Boots') && !items[item].tags.includes('Jungle')
            // exclude boots and jg starter items as legendary since they are not 
            if (!items[item].into && items[item].from && !excludeJGBoots || !items[item].into && !excludeJGBoots) {
                items[item].tags.push('legendary')
            }
            // epic items are those that can be made into other items 
            if (items[item].from && items[item].into) {
                items[item].tags.push('epic')
            }
            // basic items are those that cannot be made from other items 
            if (items[item].into && !items[item].from) {
                items[item].tags.push('basic')
            }
            
            let lowerCaseArray = []
            if (items[item].tags) {
                lowerCaseArray = items[item].tags.map(element => element.toLowerCase());
            }
            const itemData: ItemDataType = {
                id: item,
                name: items[item].name,
                // description: items[item].description || null,
                plaintext: items[item].plaintext,
                image: items[item].image.full,
                buildInto: items[item].into || null,
                buildFrom: items[item].from || null,
                tags: lowerCaseArray,
                gold: items[item].gold || null,
                // stats: items[item].stats || null,
            }
            if (items[item].tags.includes('starter')) {
                starter.push(itemData)
            } else if (items[item].tags.includes('basic')) {
                basic.push(itemData)
            } else if (items[item].tags.includes('epic')) {
                epic.push(itemData)
            } else if (items[item].tags.includes('legendary')) {
                legendary.push(itemData)
            }
        }
        itemDataList.starter = starter
        itemDataList.basic = basic
        itemDataList.epic = epic
        itemDataList.legendary = legendary
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