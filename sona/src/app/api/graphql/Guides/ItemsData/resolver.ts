import { Query, Resolver, Args } from "type-graphql"
import { ItemDataService } from "./service"
import { ItemDataType, ItemTree, ItemsType } from "./schema"

@Resolver()
export class ItemDataResolver {
    @Query(() => ItemsType)
    async fetchItemData(): Promise<ItemsType> {
        const itemDataService = new ItemDataService()
        return itemDataService.fetchData()
    }

    @Query(() => [ItemTree])
    async fetchItemTree(): Promise<ItemTree[]> {
        const itemDataService = new ItemDataService()
        return itemDataService.fetchItemTree()
    }
} 