import { Field, ObjectType, InputType, ArgsType} from "type-graphql"
import { Matches, Length,MaxLength } from "class-validator";
import { uuid } from "../../../types/custom";

@ObjectType()
export class SkinLore {
    @Field()
    @Matches(uuid)
    id: string;
    @Field()
    @Matches(uuid)
    skin_id: string;
    @Field()
    @Matches(uuid)
    owner_id: string;
    @Field(() => String)
    @Length(1, 250)
                @MaxLength(250)

    lore: string;
    @Field(() => Date)
    time: Date;
}

@ObjectType()
@InputType('SkinLoreInput')
export class SkinLoreInput {
    @Field()
    @Matches(uuid)
    skin_id: string;
    @Field()
    @Matches(uuid)
    owner_id: string;
    @Field(() => String)
    @Length(1, 250)
    @MaxLength(250)
    lore: string;
}