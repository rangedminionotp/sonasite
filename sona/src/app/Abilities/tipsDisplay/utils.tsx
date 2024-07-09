import { GraphQLClient, gql } from "graphql-request";
import { useCookies } from "react-cookie";

export const createGraphQLClient = (bearerToken) => {
  return new GraphQLClient("http://localhost:3000/api/graphql", {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });
};

export const updateVotes = async (graphQLClient, tipId, userId, votes) => {
  try {
    const update = gql`
      mutation MyMutation {
        updateVotes(owner_id: "${userId}", tip_id: "${tipId}", votes: ${votes} ) {
          owner_id
          tip_id
          voted
        }
      }
    `;
    await graphQLClient.request(update);
  } catch (error) {
    console.error("Error updating votes:", error);
  }
};

export const checkIfVoted = async (graphQLClient, tipId, userId) => {
  try {
    const checker = gql`
      query checkIfVoted {
        checkIfVoted(tip_id: "${tipId}", owner_id: "${userId}")
      }
    `;
    const response = await graphQLClient.request(checker);
    return response?.checkIfVoted ?? -1; // Default to -1 if no vote found
  } catch (error) {
    console.error("Error checking if voted:", error);
    return -1; // Default to -1 on error
  }
};

export const updateUpvotes = async (graphQLClient, tipId, upvotes) => {
  try {
    const mutation = gql`
      mutation MyMutation {
        updateUpvotes(tip_id: "${tipId}", upvotes: ${upvotes}) {
          tip_id
          ability_id
          date
          downvotes
          description
          ownerId
          ownerName
          upvotes
          version
        }
      }
    `;
    const response = await graphQLClient.request(mutation);
    return response?.updateUpvotes ?? null;
  } catch (error) {
    console.error("Error updating upvotes:", error);
    return null;
  }
};

export const updateDownvotes = async (graphQLClient, tipId, downvotes) => {
  try {
    const mutation = gql`
      mutation MyMutation {
        updateDownvotes(tip_id: "${tipId}", downvotes: ${downvotes}) {
          tip_id
          ability_id
          date
          downvotes
          description
          ownerId
          ownerName
          upvotes
          version
        }
      }
    `;
    const response = await graphQLClient.request(mutation);
    return response?.updateDownvotes ?? null;
  } catch (error) {
    console.error("Error updating downvotes:", error);
    return null;
  }
};

export const createTipVote = async (graphQLClient, tipId, userId, vote) => {
  try {
    const mutation = gql`
      mutation MyMutation {
        createTipVote(ability_tip_id: "${tipId}", voted: ${vote}, owner_id: "${userId}") {
          owner_id
          tip_id
          voted
        }
      }
    `;
    await graphQLClient.request(mutation);
  } catch (error) {
    console.error("Error creating/updating tip vote:", error);
  }
};

export const deleteTipVote = async (graphQLClient, tipId, userId) => {
  try {
    const mutation = gql`
      mutation MyMutation {
        deleteTipVote(owner_id: "${userId}", ability_tip_id: "${tipId}") {
          owner_id
          tip_id
          voted
        }
      }
    `;
    await graphQLClient.request(mutation);
  } catch (error) {
    console.error("Error deleting tip vote:", error);
  }
};
export const sortByDateDescending = (allTips) => {
  return [...allTips].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};
