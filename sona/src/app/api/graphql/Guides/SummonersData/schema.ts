import { Field, ObjectType, InputType, ArgsType, Float} from "type-graphql"
import { Matches, Length } from "class-validator";
import { uuid } from "../../../../types/custom";

@ObjectType()
export class SummonersDataType {
    @Field()
    version!:string
    @Field() 
    id!: string
    @Field()
    name!: string
    @Field()
    description!: string
    @Field()
    cooldown!: string
    @Field()
    imageURL!: string
}

@ObjectType()
@InputType("SummonersDataInput")
export class SummonersDataInput {
    @Field()
    version!:string
    @Field() 
    id!: string
    @Field()
    name!: string
    @Field()
    description!: string
    @Field()
    cooldown!: string
    @Field()
    imageURL!: string 
}