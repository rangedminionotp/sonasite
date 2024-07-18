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
            const { tags, into: buildInto, from: buildFrom, depth, name } = items[item];

            // Flag definitions
            const excludeJGBoots = !tags.includes('boots') && !tags.includes('jungle');
            const includesJg = tags.includes('jungle');
            const includesLane = tags.includes('lane');
            const consumable = tags.includes('consumable');
            const trinket = tags.includes('trinket');
            const tear = name === 'Tear of the Goddess';
            const darkseal = name === 'Dark Seal';
            const watchful = name === 'Watchful Wardstone';
            const armguard = name === 'Shattered Armguard';
            const mage = tags.includes('mana') || tags.includes('spelldamage') || tags.includes('cooldownreduction') || tags.includes('manaregen'); 
            const marksman = tags.includes('attackspeed') || tags.includes('criticalstrike') || tags.includes('damage') || tags.includes('lifesteal');
            const tank = tags.includes('health') || tags.includes('spellblock') || tags.includes('armor') || tags.includes('healthregen');
            const assassin = tags.includes('armorpenetration') || tags.includes('damage') || tags.includes('attackspeed') || tags.includes('criticalstrike');
            const support = tags.includes('healthregen') || tags.includes('manaregen') || tags.includes('cooldownreduction') || tags.includes('mana');
            //const fighter = 
            // Classifications
            if (!buildInto && buildFrom && excludeJGBoots) {
                tags.push('legendary');
            }
            const isLegendary = tags.includes('legendary');
            const excludeLegendary = !isLegendary;
            if ((includesJg && excludeLegendary && !consumable && !trinket) || 
                (includesLane && excludeLegendary && !consumable && !trinket) || 
                tear || darkseal) {
                tags.push('starter');
            }

            if ((buildFrom && buildInto) || watchful) {
                tags.push('epic');
            }

            if (buildInto && !buildFrom && !tear && !darkseal && !watchful) {
                tags.push('basic');
            }
            if (mage) {
                tags.push('mage');
            }
            if (marksman) {
                tags.push('marksman');
            }
            if (tank) {
                tags.push('tank');
            }
            if (assassin) {
                tags.push('assassin');
            }
            if (support) {
                tags.push('support');
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
            } else if (items[item].tags.includes('consumable') || items[item].tags.includes('trinket')) {
                consumablesTrinkets.push(itemData)
            }else if (items[item].tags.includes('basic')) {
                basic.push(itemData)
            } else if (items[item].tags.includes('epic')) {
                epic.push(itemData)
            } else if (items[item].tags.includes('starter')) {
                starter.push(itemData)
            } else if (items[item].tags.includes('legendary')) {
                legendary.push(itemData)
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