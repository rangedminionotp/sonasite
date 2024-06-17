// import { createYoga } from 'graphql-yoga';
// import 'reflect-metadata'; // must come before buildSchema
// import { buildSchemaSync } from 'type-graphql';
// import { AuthResolver } from './Auth/resolver';
// import { UserResolver } from './User/resolver';
// import { AbilityResolver } from './Ability/resolver';
// import { AbilityTipsResolver } from './AbilityTips/resolver';
// import { nextAuthChecker } from './Auth/checker';
// // Build the schema with resolvers
// const schema = buildSchemaSync({
//   resolvers: [AuthResolver, UserResolver, AbilityResolver, AbilityTipsResolver],
//   validate: true,
//   authChecker: nextAuthChecker,
// });

// // Create the Yoga handler
// export const { handleRequest } = createYoga({
//   schema,
//   graphqlEndpoint: '/api/graphql',
// });

// // // Explicitly export handleRequest for different HTTP methods
// // export const GET = handleRequest;
// // export const POST = handleRequest;
// // export const OPTIONS = handleRequest;

// export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }

import { createYoga } from 'graphql-yoga';
import 'reflect-metadata'; // must come before buildSchema
import { buildSchemaSync } from 'type-graphql';
import { AuthResolver } from './Auth/resolver'; 
import { UserResolver } from './User/resolver';
import { AbilityResolver } from './Ability/resolver';
import { AbilityTipsResolver } from './AbilityTips/resolver';
import { nextAuthChecker } from './Auth/checker';

// Build the schema with resolvers
const schema = buildSchemaSync({
  resolvers: [AuthResolver, UserResolver, AbilityResolver, AbilityTipsResolver],
  validate: true,
  authChecker: nextAuthChecker,
});

// Create the Yoga handler
export const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
  context: ({ req, res }) => ({ req, res }), // Ensure context is passed
});

// Explicitly export handleRequest for different HTTP methods
export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS };