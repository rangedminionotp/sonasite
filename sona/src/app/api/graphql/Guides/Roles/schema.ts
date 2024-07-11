import { Field, ObjectType, InputType, ArgsType, Float} from "type-graphql"
import { Matches, Length } from "class-validator";
import { uuid } from "../../../../types/custom";

@ObjectType()
export class dataType {
  @Field()
  imgurl!: string;
}

@ObjectType()
export class GuidesRolesType {
  @Field()
  @Matches(uuid)
  id!: string;
  @Field()
  @Length(1, 30)
  role!: string; 
  @Field()
  data!: dataType;
}


