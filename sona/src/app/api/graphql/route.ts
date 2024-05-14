import { createYoga } from 'graphql-yoga';
import 'reflect-metadata';
import { buildSchemaSync } from 'type-graphql';
import AuthResolver from '../graphql/Auth/resolver'; // Check the import path
import { nextAuthChecker } from '../graphql/Auth/checker'; // Check the import path

const schema = buildSchemaSync({
  resolvers: [AuthResolver],
  validate: true,
  authChecker: nextAuthChecker // Add the authChecker option
});

export default createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
});