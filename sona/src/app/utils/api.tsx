import { GraphQLClient, gql } from "graphql-request";
import { useCookies } from "react-cookie";

export const createGraphQLClient = (bearerToken) => {
  return new GraphQLClient("http://localhost:3000/api/graphql", {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });
};
