import { createYoga } from 'graphql-yoga'
import 'reflect-metadata'; // must come before buildSchema
import { buildSchemaSync } from "type-graphql"

import { SonaResolver } from '../graphql/fetchdata/resolver';

const schema = buildSchemaSync({
  resolvers: [SonaResolver],
  validate: true,  
});

export default createYoga({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
})