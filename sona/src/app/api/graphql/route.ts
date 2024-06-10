import { createYoga } from 'graphql-yoga';
import 'reflect-metadata'; // must come before buildSchema
import { buildSchemaSync } from 'type-graphql';
import { AuthResolver } from './Auth/resolver'; 
import { UserResolver } from './User/resolver';
import { AbilityResolver } from './Ability/resolver';
// Build the schema with resolvers
const schema = buildSchemaSync({
  resolvers: [AuthResolver, UserResolver, AbilityResolver],
  validate: true,
});

// Create the Yoga handler
export const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
});

// // Explicitly export handleRequest for different HTTP methods
// export const GET = handleRequest;
// export const POST = handleRequest;
// export const OPTIONS = handleRequest;

export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }