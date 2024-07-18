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
        let boots: ItemDataType[] = []
        let consumablesTrinkets: ItemDataType[] = []
        for (let item in items) {  
            items[item].tags = items[item].tags.map(element => element.toLowerCase());  
            const excludeJGBoots = !items[item].tags.includes('boots') && !items[item].tags.includes('jungle') 
            const buildInto = items[item].into
            const buildFrom = items[item].from
            const includesJg = items[item].tags.includes('jungle')
            const includesLane = items[item].tags.includes('lane')
            const consumable = items[item].tags.includes('consumable')
            const depth = items[item].depth 
            const tear = items[item].name === 'Tear of the Goddess' 
            const darkseal = items[item].name === 'Dark Seal'
            const trinket = items[item].tags.includes('trinket')
            const watchful = items[item].name === 'Watchful Wardstone'
            const armguard = items[item].name === 'Shattered Armguard'
            // exclude boots and jg starter items as legendary since they are not  
            if (!buildInto && buildFrom && excludeJGBoots ) {
                items[item].tags.push('legendary')
            }
            const excludeLegendary = !items[item].tags.includes('legendary')
            if ((includesJg && excludeLegendary && !consumable && !trinket) || (  includesLane && excludeLegendary && !consumable && !trinket) || tear || darkseal ) {
                items[item].tags.push('starter')
            } 
            // epic items are those that can be made into other items 
            if (buildFrom && buildInto ||  watchful) {
                items[item].tags.push('epic')
            }
            // basic items are those that cannot be made from other items 
            if (buildInto && !buildFrom && !tear && !darkseal && !watchful) {
                items[item].tags.push('basic')
            } 
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
                inStore: items[item].inStore || null,
                // stats: items[item].stats || null,
            } 
            if (items[item].inStore === false || items[item].maps[11] === false || items[item].name === 'Obsidian Edge' || armguard) { 
            } else {
           if (items[item].tags.includes('boots')){
                boots.push(itemData)
            } else if (items[item].tags.includes('basic')) {
                basic.push(itemData)
            } else if (items[item].tags.includes('epic')) {
                epic.push(itemData)
            } else if (items[item].tags.includes('starter')) {
                starter.push(itemData)
            } else if (items[item].tags.includes('legendary')) {
                legendary.push(itemData)
            } else if (items[item].tags.includes('consumable') || items[item].tags.includes('trinket')) {
                consumablesTrinkets.push(itemData)
            }
            }
        }
        itemDataList.starter = starter.sort((a,b) => a.gold.total - b.gold.total);
        itemDataList.basic = basic.sort((a,b) => a.gold.total - b.gold.total);
        itemDataList.epic = epic.sort((a,b) => a.gold.total - b.gold.total);
        itemDataList.legendary = legendary.sort((a,b) => a.gold.total - b.gold.total);
        itemDataList.boots = boots.sort((a,b) => a.gold.total - b.gold.total);
        itemDataList.consumablesTrinkets = consumablesTrinkets.sort((a,b) => a.gold.total - b.gold.total);
        return itemDataList
    }
    async fetchItemTree(): Promise<ItemTree[]> {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchItemData`) 
        const data = await res.json()
        let itemTreeList: ItemTree[] = [] 
        let items = data.tree
        for (let item in items) {
            const itemTree: ItemTree = {
                header: items[item].header.toLowerCase(),
                tags: items[item].tags.map(element => element.toLowerCase())
            }
            itemTreeList.push(itemTree)
        }
        return itemTreeList
    }
}