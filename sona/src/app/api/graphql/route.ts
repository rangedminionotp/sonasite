import { createYoga } from 'graphql-yoga';
import 'reflect-metadata'; // must come before buildSchema
import { buildSchemaSync } from 'type-graphql';
import { AuthResolver } from './Auth/resolver';

const schema = buildSchemaSync({
  resolvers: [AuthResolver],
  validate: true,
});

export const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
});

export { handleRequest as GET, handleRequest as POST, handleRequest as OPTIONS }