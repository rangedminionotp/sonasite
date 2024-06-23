import { Field, ObjectType, InputType, ArgsType, Float} from "type-graphql"
import { Matches, Length } from "class-validator";
import { uuid } from "../../../types/custom";


@ObjectType()
export class SkinReviewsData{
    @Field()
    description!: string
    @Field()
    date!: Date
}


@ObjectType()
export class SkinReviewsInfo {
    @Field()
    @Matches(uuid)
    id!: string;
    @Field()
    @Matches(uuid)
    owner_id!: string;
    @Field()
    @Matches(uuid)
    skin_id!: string;
    @Field(type => Float)
    rating!: number;
    @Field()
    data!: SkinReviewsData;
}

@ObjectType()
export class SkinReviewsVote {
    @Field()
    @Matches(uuid)
    skin_id !: string;
    @Field()
    @Matches(uuid)
    owner_id!: string;
    @Field()
    voted!: boolean;
}

@ObjectType()
export class SkinReviewsAdd {
    @Field()
    @Matches(uuid)
    owner_id!: string;
    @Field()
    @Matches(uuid)
    skin_id!: string;
    @Field()
    data!: SkinReviewsData;
}