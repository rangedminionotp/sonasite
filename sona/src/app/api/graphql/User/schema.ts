import { Field, ObjectType, InputType, ArgsType} from "type-graphql"
import { Matches, Length } from "class-validator";

@ObjectType()
@InputType("UserInput")
export class UserData {
    @Field()
    name!: string
    @Field(type => [String])
    roles!: Array<"member" | "admin">
    @Field()
    @Matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
    email!: string
    @Field({nullable: true})
    @Length(8, 16)
    password?: string
    @Field({nullable: true})
    ogPassword?: string
}

@ObjectType()
export class UserInfo {
    @Field()
    id!: string
    @Field()
    name!: string
    @Field()
    email!: string 
    @Field(type => [String])
    roles!: Array<string>
}

@ObjectType()
export class GmailUserInfo {
    @Field()
    id!: string
    @Field()
    name!: string
    @Field()
    email!: string
    @Field(type => [String])
    roles!: Array<string> 
    @Field()
    password!: string
    @Field({nullable: true})
    ogPassword?: string
}