import React, { useEffect, useContext, useState } from "react";
import AbilitiesContext from "../SharedContext";
import Button from "@mui/joy/Button";
import {
  getUserFromLocalStorage,
  createGraphQLClient,
  updateVotes,
  checkIfVoted,
  updateUpvotes,
  updateDownvotes,
  createTipVote,
} from "./utils";
import TipItem from "./TipItem";
import { sortByDateDescending } from "./utils";
const TipsDisplay = ({ index }) => {
  const { abilities, abilityTips, setabilityTips, activeIndex } =
    useContext(AbilitiesContext);
  const [isDateAsc, setIsDateAsc] = useState(true);
  const [isUpvotesAsc, setIsUpvotesAsc] = useState(true);
  const [isDownvotesAsc, setIsDownvotesAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const tipsPerPage = 4;
  const [totalPages, setTotalPages] = useState(1);
  const [currentTips, setCurrentTips] = useState([]);
  const [upvote, setUpvote] = React.useState<boolean>(false);
  const [downvote, setDownvote] = React.useState<boolean>(false);

  useEffect(() => {
    if (abilityTips) {
      const pages = Math.ceil(abilityTips.length / tipsPerPage);
      setTotalPages(pages);

      const tips = abilityTips.slice(
        (currentPage - 1) * tipsPerPage,
        currentPage * tipsPerPage
      );
      setCurrentTips(tips);
    }
  }, [abilityTips, currentPage]);

  // Handle page navigation
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
            const allTips = json.data.getAbilityTipsByAbilityId;
            const sortedTips = sortByDateDescending(allTips);
            setabilityTips(sortedTips);
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
          setUpvote(true);
        } else if (voted === -1) {
          await createTipVote(graphQLClient, tipId, user.id, 1); // Vote = 1 for upvote
          setDownvote(false);
          setUpvote(false);
        } else if (voted === 1) {
          await deleteTipVote(graphQLClient, tipId, user.id);
          setUpvote(false);
        }
      }
    } catch (error) {
      console.error("Error upvoting:", error);
    }
  };

  const handleDownvote = async (tipId, downvotes, upvotes) => {
    try {
      const user = getUserFromLocalStorage();
      const bearerToken = user?.accessToken;

      if (!bearerToken) {
        throw new Error("User not authenticated");
      }

      const graphQLClient = createGraphQLClient(bearerToken);
      const voted = await checkIfVoted(graphQLClient, tipId, user.id);

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
          setDownvote(true);
        } else if (voted === -1) {
          await createTipVote(graphQLClient, tipId, user.id, 0); // Vote = 0 for downvote
          setUpvote(false);
          setDownvote(false);
        } else if (voted === 0) {
          await deleteTipVote(graphQLClient, tipId, user.id);
          setDownvote(false);
        }
      }
    } catch (error) {
      console.error("Error downvoting:", error);
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
    <div className="max-w-4xl mx-auto p-6 max-h-72" name="TipsDisplay">
      <div className="flex flex-col md:flex-row md:justify-between mb-4">
        <Button
          onClick={sortByDate}
          className="w-full md:w-auto px-4 py-2 mb-2 md:mb-0 md:mr-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Sort by Date
        </Button>
        <Button
          onClick={sortByUpvotes}
          className="w-full md:w-auto px-4 py-2 mb-2 md:mb-0 md:mr-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Sort by Upvotes
        </Button>
        <Button
          onClick={sortByDownvotes}
          className="w-full md:w-auto px-4 py-2 mb-2 md:mb-0 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Sort by Downvotes
        </Button>
      </div>
      {currentTips && currentTips.length > 0 ? (
        currentTips.map((tip, idx) => (
          <TipItem
            key={idx}
            tip={tip}
            handleUpvote={handleUpvote}
            handleDownvote={handleDownvote}
            upvote={upvote}
            downvote={downvote}
            setUpvote={setUpvote}
            setDownvote={setDownvote}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No tips available.</p>
      )}
      <div className="flex justify-center space-x-4 mt-4">
        <Button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`w-full md:w-auto px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </Button>
        <p className="text-gray-300">
          Page {currentPage} of {totalPages}
        </p>
        <Button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`w-full md:w-auto px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TipsDisplay;
