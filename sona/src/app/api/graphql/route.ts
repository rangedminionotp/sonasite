import { createYoga } from "graphql-yoga";
import "reflect-metadata"; // must come before buildSchema
import { buildSchemaSync } from "type-graphql";
import { AuthResolver } from "./Auth/resolver";
import { UserResolver } from "./User/resolver";
import { AbilityResolver } from "./Ability/resolver";
import { AbilityTipsResolver } from "./AbilityTips/resolver";
import { nextAuthChecker } from "./Auth/checker";
import { SkinResolver } from "./Skin/resolver";
import { SkinReviewsResolver } from "./SkinReviews/resolver";
import { SkinLoreResolver } from "./SkinLore/resolver";
import { NextRequest, NextResponse } from "next/server";

// Build the schema with resolvers
const schema = buildSchemaSync({
  resolvers: [
    AuthResolver,
    UserResolver,
    AbilityResolver,
    AbilityTipsResolver,
    SkinResolver,
    SkinReviewsResolver,
    SkinLoreResolver,
  ],
  validate: true,
  authChecker: nextAuthChecker,
});

// Create the Yoga handler with context setup
const { handleRequest } = createYoga<{
  req: NextRequest;
  res: NextResponse;
}>({
  schema,
  graphqlEndpoint: "/api/graphql",
  context: ({ request, params }) => {
    //console.log('Request headers:', request.headers); // Debugging log
    return { req: request, params };
  },
});

// Explicitly export handleRequest for different HTTP methods
export { handleRequest as GET, handleRequest as POST };
