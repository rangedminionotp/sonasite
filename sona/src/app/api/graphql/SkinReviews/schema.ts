import { Field, ObjectType, InputType, ArgsType, Float} from "type-graphql"
import { Matches, Length } from "class-validator";
import { uuid } from "../../../types/custom";


// Define the ObjectType for SkinReviewsData
@ObjectType()
export class SkinReviewsData {
    @Field()
    description!: string;
    @Field()
    date!: Date;
}

// Define the InputType for SkinReviewsData input
@InputType()
export class SkinReviewsDataInput {
    @Field()
    description!: string;
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
    @Field()
    owner_name!: string 
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
@InputType('SkinReviewsAdd')
export class SkinReviewsAdd {
    @Field()
    @Matches(uuid)
    owner_id!: string;
    @Field()
    @Matches(uuid)
    skin_id!: string;
    @Field(() => SkinReviewsDataInput)
    data!: SkinReviewsDataInput;
    @Field(type => Float)
    rating!: number
    @Field()
    owner_name!: string
}

@ObjectType()
export class SkinReviewsReviewed {
    @Field() 
    @Matches(uuid)
    skin_id!: string;
    @Field()
    @Matches(uuid)
    owner_id!: string; 
}