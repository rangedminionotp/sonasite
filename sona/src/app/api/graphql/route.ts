import { createYoga } from 'graphql-yoga'
import 'reflect-metadata'; // must come before buildSchema
import { buildSchemaSync } from "type-graphql"

// import { SonaResolver } from './fetchdata/resolver';

import AuthResolver from '../graphql/Auth/resolver'
const schema = buildSchemaSync({
  resolvers: [AuthResolver],
  validate: true,  
});

export default createYoga({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
})