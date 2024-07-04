import React, { useEffect, useContext, useState } from "react";
import AbilitiesContext from "../SharedContext";
import Button from "@mui/joy/Button";

import TipsSearch from "./TipsSearch";
import {
  getUserFromLocalStorage,
  createGraphQLClient,
  updateVotes,
  checkIfVoted,
  updateUpvotes,
  updateDownvotes,
  createTipVote,
} from "./utils";
import TipsSortBtnsMenu from "./TipsSortBtnsMenu";
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
  const [isPopularityAsc, setIsPopularityAsc] = useState(true);
  const [isVotesAsc, setIsVotesAsc] = useState(true);
  const [search, setSearch] = useState<string>(null);
  const [searchTips, setSearchTips] = useState(null);

  useEffect(() => {
    if (searchTips) {
      const pages = Math.ceil(searchTips.length / tipsPerPage);
      setTotalPages(pages);

      const tips = searchTips.slice(
        (currentPage - 1) * tipsPerPage,
        currentPage * tipsPerPage
      );
      setCurrentTips(tips);
    } else if (abilityTips) {
      const pages = Math.ceil(abilityTips.length / tipsPerPage);
      setTotalPages(pages);

      const tips = abilityTips.slice(
        (currentPage - 1) * tipsPerPage,
        currentPage * tipsPerPage
      );
      setCurrentTips(tips);
    }
  }, [abilityTips, currentPage, searchTips]);

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

  const sortByPopularity = () => {
    const sorted = [...abilityTips].sort((a, b) => {
      const popularityComparison =
        b.upvotes - b.downvotes - (a.upvotes - a.downvotes);
      return isPopularityAsc ? popularityComparison : -popularityComparison;
    });
    setabilityTips(sorted);
    setIsPopularityAsc(!isPopularityAsc);
  };

  const sortByTotalVotes = () => {
    const sorted = [...abilityTips].sort((a, b) => {
      const votesComparison =
        b.upvotes - a.upvotes + (b.downvotes - a.downvotes);
      return isVotesAsc ? votesComparison : -votesComparison;
    });
    setabilityTips(sorted);
    setIsVotesAsc(!isVotesAsc);
  };
  return (
    <div className="max-w-4xl mx-auto p-6 max-h-72" name="TipsDisplay">
      <div className="flex justify-between items-center">
        <TipsSortBtnsMenu
          sortByDate={sortByDate}
          sortByTotalVotes={sortByTotalVotes}
          sortByPopularity={sortByPopularity}
          sortByUpvotes={sortByUpvotes}
          sortByDownvotes={sortByDownvotes}
        />
        <TipsSearch
          search={search}
          setSearch={setSearch}
          setSearchTips={setSearchTips}
        />
      </div>
      {currentTips && currentTips.length > 0 ? (
        currentTips.map((tip, idx) => <TipItem key={idx} tip={tip} />)
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
