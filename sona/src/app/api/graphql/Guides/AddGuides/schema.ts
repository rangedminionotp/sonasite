import { Field, ObjectType, InputType, ArgsType, Float} from "type-graphql"
import { Matches, Length } from "class-validator";
import { uuid } from "../../../../types/custom";


@ObjectType()
export class StepOne {
    @Field({nullable: true})
    @Length(1, 100)
    @Matches(/^[a-zA-Z0-9 ]+$/)
    title: string; 
    @Field({nullable: true})
    @Length(1, 255)
    @Matches(/^[a-zA-Z0-9 ]+$/)
    description: string; 
    @Field(() => [String], {nullable: true})
    selectedRoles: string[]; 
    @Field(() => [String], {nullable: true})
    selectedLabels: string[];
}


@ObjectType()
export class GuideInput {
    @Field()
    @Matches(uuid)
    id: string;
    @Field()
    @Matches(uuid)
    userId: string;
    @Field({nullable: true}) 
    StepOne?: StepOne;
}