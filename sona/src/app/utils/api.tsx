import { GraphQLClient, gql } from "graphql-request";

export const getUserFromLocalStorage = () => {
  const item = localStorage.getItem("user");
  return JSON.parse(item);
};

export const createGraphQLClient = (bearerToken) => {
  return new GraphQLClient("http://localhost:3000/api/graphql", {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });
};
