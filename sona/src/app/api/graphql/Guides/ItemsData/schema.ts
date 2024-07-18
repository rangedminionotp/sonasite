import { Field, ObjectType, InputType, ArgsType, Float} from "type-graphql"
import { Matches, Length } from "class-validator";
import { uuid } from "../../../../types/custom";
// import { GraphQLJSONObject } from "graphql-type-json";

@ObjectType()
export class goldType {
    @Field()
    base!: number
    @Field()
    purchasable!: boolean
    @Field()
    total!: number
    @Field()
    sell!: number
}
@ObjectType()
export class ItemDataType {
    @Field()
    id!: string
    @Field()
    name!: string
    @Field()
    image!: string
    @Field()
    plaintext!: string
    @Field(() => goldType, {nullable: true})
    gold?: goldType | null
    @Field(() => [String], {nullable: true})
    tags?: string[] | null  
     
    // @Field({ nullable: true })
    // description?: string | null
    @Field(() => [String], {nullable: true})
    buildInto?: string[] | null
    @Field(() => [String], {nullable: true})
    buildFrom?: string[] | null 
    @Field({nullable: true})
    inStore?: boolean
    // @Field(() => GraphQLJSONObject, {nullable: true})
    // maps?: Record<string, number> | null
    // @Field(() => GraphQLJSONObject, { nullable: true })
    // stats?: Record<string, number> | null; // Assuming stats is a JSON object with key-value pairs
}

@ObjectType()
export class ItemTree {
    @Field()
    header!: string
    @Field(()=>[String] )
    tags!: string[] 
}         


@ObjectType()
export class ItemsType {
    @Field(() => [ItemDataType])
    starter!: ItemDataType[]
    @Field(() => [ItemDataType])
    basic!: ItemDataType[]
    @Field(() => [ItemDataType])
    epic!: ItemDataType[]
    @Field(() => [ItemDataType])
    legendary!: ItemDataType[]
    @Field(() => [ItemDataType])
    boots!: ItemDataType[]
    @Field(() => [ItemDataType])
    consumablesTrinkets!: ItemDataType[]
}