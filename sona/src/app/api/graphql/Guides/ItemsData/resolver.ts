import { Query, Resolver, Args } from "type-graphql"
import { ItemDataService } from "./service"
import { ItemDataType } from "./schema"

@Resolver()
export class ItemDataResolver {
    @Query(() => [ItemDataType])
    async fetchItemData(): Promise<ItemDataType[]> {
        const itemDataService = new ItemDataService()
        return itemDataService.fetchData()
    }
}