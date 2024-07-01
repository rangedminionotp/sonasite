import { Field, ObjectType, ArgsType } from "type-graphql"
import { Length, Matches } from "class-validator";

@ArgsType()
export class Credentials {
  @Field()
  @Matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
    email!: string
  @Field()
  @Length(8, 20)
    password!: string
}

@ObjectType()
export class User {
  @Field()
    id!: string
  @Field()
    name!: string
  @Field()
  accessToken!: string
  @Field()
  @Matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
  email!: string 
}