import { Field, ObjectType, InputType, ArgsType, Float} from "type-graphql"
import { Matches, Length } from "class-validator";
import { uuid } from "../../../../types/custom";

@ObjectType()
export class GuidesLabelsType {
  @Field()
  @Matches(uuid)
    id!: string;
     @Field()
  @Matches(uuid)
    role_id!: string
  @Field()
  @Length(1, 30)
  label!: string; 
}

