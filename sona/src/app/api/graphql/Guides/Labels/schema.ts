import { Field, ObjectType, InputType, ArgsType, Float} from "type-graphql"
import { Matches, Length } from "class-validator";
import { uuid } from "../../../../types/custom";

@ObjectType()
export class GuidesLabelsType {
  @Field()
  @Matches(uuid)
    id!: string; 
  @Field()
  @Length(1, 30)
  label!: string; 
}

@ObjectType()
export class GuidesCustomLabelsType {
  @Field()
  @Matches(uuid)
    id!: string; 
  @Field()
  @Length(1, 30)
  label!: string; 
  @Field()
  @Matches(uuid)
  owner_id!: string;
}