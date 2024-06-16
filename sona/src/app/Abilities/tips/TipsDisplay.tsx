import React, { useEffect, useContext } from "react";
import AbilitiesContext from "../SharedContext";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import Avatar from "@mui/joy/Avatar";

const TipsDisplay = () => {
  const { abilities, abilityTips, setabilityTips, activeIndex } =
    useContext(AbilitiesContext);
  const index = activeIndex;

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
            const sortedTips = json.data.getAbilityTipsByAbilityId.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            );
            setabilityTips(sortedTips);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [abilities, index, setabilityTips]);

  const handleUpvote = (tipId, upvotes) => {
    // API call to upvote
    console.log("inside handleupvote", tipId, upvotes);
    const query = {
      query: `mutation MyMutation {
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
      .then((data) => {
        if (data.success) {
          // Update state
          setabilityTips((prevTips) =>
            prevTips.map((tip) =>
              tip.tip === tipId ? { ...tip, upvotes: tip.upvotes + 1 } : tip
            )
          );
        }
      })
      .catch((error) => {
        console.error("Error upvoting:", error);
      });
  };

  const handleDownvote = (tipId) => {
    // API call to downvote
    fetch("/api/downvote", {
      method: "POST",
      body: JSON.stringify({ tipId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Update state
          setabilityTips((prevTips) =>
            prevTips.map((tip) =>
              tip.id === tipId ? { ...tip, downvotes: tip.downvotes + 1 } : tip
            )
          );
        }
      })
      .catch((error) => {
        console.error("Error downvoting:", error);
      });
  };

  return (
    <div name="Player Tips" className="max-w-4xl mx-auto p-6">
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
                onClick={() => handleUpvote(tip.tip_id, tip.upvotes + 1)}
              >
                <span className="text-green-600">▲</span>
                <span className="text-gray-800">{tip.upvotes}</span>
              </div>
              <div
                className="flex items-center space-x-1 cursor-pointer"
                onClick={() => handleDownvote(tip.tip_id)}
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
