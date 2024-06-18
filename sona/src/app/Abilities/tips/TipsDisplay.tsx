import React, { useEffect, useContext, setState } from "react";
import AbilitiesContext from "../SharedContext";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import Avatar from "@mui/joy/Avatar";
import Button from "@mui/joy/Button";
import { GraphQLClient, gql } from "graphql-request";

const TipsDisplay = () => {
  const { abilities, abilityTips, setabilityTips, activeIndex } =
    useContext(AbilitiesContext);
  const index = activeIndex;
  const [votes, setVotes] = React.useState(abilityTips);
  const [isDateAsc, setIsDateAsc] = React.useState(true);
  const [isUpvotesAsc, setIsUpvotesAsc] = React.useState(true);
  const [isDownvotesAsc, setIsDownvotesAsc] = React.useState(true);

  useEffect(() => {
    if (abilities && abilities[index]) {
      const query = {
        query: `query MyQuery {
          getAbilityTipsByAbilityId(ability_id: "${abilities[index].abilityId}") {
            ability_id
            date
            description
            ownerId
            ownerName
            version
            upvotes
            downvotes
            tip_id
          }
        }`,
      };

      fetch("/api/graphql", {
        method: "POST",
        body: JSON.stringify(query),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.errors) {
            alert("Error fetching tips, please try again");
          } else {
            setabilityTips(json.data.getAbilityTipsByAbilityId);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [abilities, index, setabilityTips]);

  const handleUpvote = async (tipId, upvotes, downvotes) => {
    try {
      const user = getUserFromLocalStorage();
      const bearerToken = user?.accessToken;

      if (!bearerToken) {
        throw new Error("User not authenticated");
      }

      const graphQLClient = createGraphQLClient(bearerToken);
      const voted = await checkIfVoted(graphQLClient, tipId, user.id);

      if (voted !== 1) {
        const updatedTip = await updateUpvotes(graphQLClient, tipId, upvotes);

        if (updatedTip) {
          setabilityTips((prevTips) =>
            prevTips.map((tip) =>
              tip.tip_id === updatedTip.tip_id ? updatedTip : tip
            )
          );
        }
        if (voted === 0) {
          const updatedDownTip = await updateDownvotes(
            graphQLClient,
            tipId,
            downvotes
          );
          if (updatedDownTip) {
            setabilityTips((prevTips) =>
              prevTips.map((tip) =>
                tip.tip_id === updatedDownTip.tip_id ? updatedDownTip : tip
              )
            );
          }
          await updateVotes(graphQLClient, tipId, user.id, 1); // Vote = 1 for upvote
        } else if (voted === -1) {
          await createTipVote(graphQLClient, tipId, user.id, 1); // Vote = 1 for upvote
        }
      }
    } catch (error) {
      console.error("Error upvoting:", error);
    }
  };

  const handleDownvote = async (tipId, downvotes, upvotes) => {
    try {
      // Get the user and bearer token from local storage
      const user = getUserFromLocalStorage();
      const bearerToken = user?.accessToken;

      if (!bearerToken) {
        throw new Error("User not authenticated");
      }

      // Initialize GraphQL client
      const graphQLClient = createGraphQLClient(bearerToken);

      // Check if the tip has been upvoted by the user
      const voted = await checkIfVoted(graphQLClient, tipId, user.id);
      console.log("vote", voted);

      // If the tip has not been upvoted yet, update the upvotes and create/update tip vote
      if (voted !== 0) {
        const updatedTip = await updateDownvotes(
          graphQLClient,
          tipId,
          downvotes
        );
        if (updatedTip) {
          setabilityTips((prevTips) =>
            prevTips.map((tip) =>
              tip.tip_id === updatedTip.tip_id ? updatedTip : tip
            )
          );
        }
        if (voted === 1) {
          const updatedUpTip = await updateUpvotes(
            graphQLClient,
            tipId,
            upvotes
          );
          if (updatedUpTip) {
            setabilityTips((prevTips) =>
              prevTips.map((tip) =>
                tip.tip_id === updatedUpTip.tip_id ? updatedUpTip : tip
              )
            );
          }
          await updateVotes(graphQLClient, tipId, user.id, 0); // Vote = 0 for downvote
        } else if (voted === -1) {
          await createTipVote(graphQLClient, tipId, user.id, 0); // Vote = 0 for downvote
        }
      }
    } catch (error) {
      console.error("Error upvoting:", error);
    }
  };

  const getUserFromLocalStorage = () => {
    const item = localStorage.getItem("user");
    return JSON.parse(item);
  };

  const createGraphQLClient = (bearerToken) => {
    return new GraphQLClient("http://localhost:3000/api/graphql", {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  };

  const updateVotes = async (GraphQLClient, tipId, userId, votes) => {
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
      await GraphQLClient.request(update);
    } catch (error) {
      console.error("Error checking if voted:", error);
    }
  };
  const checkIfVoted = async (graphQLClient, tipId, userId) => {
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

  const updateUpvotes = async (graphQLClient, tipId, upvotes) => {
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

  const updateDownvotes = async (graphQLClient, tipId, downvotes) => {
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

  const createTipVote = async (graphQLClient, tipId, userId, vote) => {
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

  const sortByDate = () => {
    const sorted = [...abilityTips].sort((a, b) => {
      const dateComparison =
        new Date(a.date).getTime() - new Date(b.date).getTime();
      return isDateAsc ? dateComparison : -dateComparison;
    });
    setabilityTips(sorted);
    setIsDateAsc(!isDateAsc);
  };

  const sortByUpvotes = () => {
    const sorted = [...abilityTips].sort((a, b) => {
      const upvoteComparison = b.upvotes - a.upvotes;
      return isUpvotesAsc ? upvoteComparison : -upvoteComparison;
    });
    setabilityTips(sorted);
    setIsUpvotesAsc(!isUpvotesAsc);
  };

  const sortByDownvotes = () => {
    const sorted = [...abilityTips].sort((a, b) => {
      const downvoteComparison = b.downvotes - a.downvotes;
      return isDownvotesAsc ? downvoteComparison : -downvoteComparison;
    });
    setabilityTips(sorted);
    setIsDownvotesAsc(!isDownvotesAsc);
  };

  return (
    <div name="Player Tips" className="max-w-4xl mx-auto p-6">
      <div>
        <Button onClick={sortByDate}>Sort by Date</Button>
        <Button onClick={sortByUpvotes}>Sort by Upvotes</Button>
        <Button onClick={sortByDownvotes}>Sort by Downvotes</Button>
      </div>
      {abilityTips && abilityTips.length > 0 ? (
        abilityTips.map((tip, idx) => (
          <div
            key={idx}
            className="bg-gray-300 shadow-md rounded-lg p-4 mb-4 border border-gray-200"
          >
            <div className="flex items-center space-x-2">
              <Avatar>{tip.ownerName.charAt(0)}</Avatar>
              <p className="text-gray-800 font-bold text-lg">{tip.ownerName}</p>
              <div className="border-l border-gray-300 h-6 mx-2"></div>
              <p className="text-gray-600 text-sm">
                {format(parseISO(tip.date), "MMMM dd, yyyy h:mm a")} (
                {formatDistanceToNow(parseISO(tip.date), { addSuffix: true })})
              </p>
              <div className="border-l border-gray-300 h-6 mx-2"></div>
              <p className="text-gray-500">
                Version: {tip.version.slice(0, 5)}
              </p>
            </div>
            <p className="text-gray-800 font-semibold mt-2">
              {tip.description}
            </p>
            <div className="flex items-center space-x-4 mt-2">
              <div
                className="flex items-center space-x-1 cursor-pointer"
                onClick={() =>
                  handleUpvote(tip.tip_id, tip.upvotes + 1, tip.downvotes - 1)
                }
              >
                <span className="text-green-600">▲</span>
                <span className="text-gray-800">{tip.upvotes}</span>
              </div>
              <div
                className="flex items-center space-x-1 cursor-pointer"
                onClick={() =>
                  handleDownvote(tip.tip_id, tip.downvotes + 1, tip.upvotes - 1)
                }
              >
                <span className="text-red-600">▼</span>
                <span className="text-gray-800">{tip.downvotes}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No tips available.</p>
      )}
    </div>
  );
};

export default TipsDisplay;
