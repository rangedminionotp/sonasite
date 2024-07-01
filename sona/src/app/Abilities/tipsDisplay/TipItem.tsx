import React, { useEffect } from "react";
import Avatar from "@mui/joy/Avatar";
import Textarea from "@mui/joy/Textarea"; // Assuming you imported JoyUI Textarea component
import Button from "@mui/joy/Button";
import {
  getUserFromLocalStorage,
  createGraphQLClient,
  updateVotes,
  checkIfVoted,
  updateUpvotes,
  updateDownvotes,
  createTipVote,
  sortByDateDescending,
  deleteTipVote,
} from "./utils";
import { gql } from "graphql-request";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import TipsEditAndDelete from "./TipsEditAndDelete ";
import AbilitiesContext from "../SharedContext";
import Tooltip from "@mui/joy/Tooltip";

const TipItem = ({ tip }) => {
  const { fetchedData, abilityTips, setabilityTips } =
    React.useContext(AbilitiesContext);

  // if upvote = false, then current tip is not upvoted;
  // if upvote = true, then current tip is upvoted;
  const [upvote, setUpvote] = React.useState<boolean>(false);
  // if downvote = true, then current tip is not downvoted;
  // if downvote = false, then current tip is downvoted;
  const [downvote, setDownvote] = React.useState<boolean>(true);

  const user = getUserFromLocalStorage();
  // const [downvotes, setDownvotes] = React.useState(tip.downvotes);
  const [isEditing, setIsEditing] = React.useState(false); // State to manage editing mode
  const [editDescription, setEditDescription] = React.useState(tip.description);
  const [loading, setLoading] = React.useState(true); // State to track loading status
  useEffect(() => {
    const seeVoteStatus = async () => {
      const bearerToken = user?.accessToken;
      const graphQLClient = createGraphQLClient(bearerToken);
      if (user) {
        const voted = await checkIfVoted(graphQLClient, tip.tip_id, user.id);
        if (voted === 1) {
          setUpvote(true);
        } else if (voted === 0) {
          setDownvote(false);
        } else if (voted === -1) {
          setUpvote(false);
          setDownvote(true);
        }
      }
    };
    seeVoteStatus();
    setLoading(false);
  }, [downvote, upvote]);

  const toggleEditing = () => {
    setIsEditing(!isEditing); // Toggle editing state
  };
  const handleInputChange = (event) => {
    setEditDescription(event.target.value);
  };

  // edit tip
  const handleSubmit = async () => {
    const user = getUserFromLocalStorage();
    const bearerToken = user?.accessToken;
    const graphQLClient = createGraphQLClient(bearerToken);
    try {
      const mutation = gql`
        mutation MyMutation {
          editTips(
            ability_tip_id: "${tip.tip_id}"
            description: "${editDescription}"
            owner_id: "${user.id}"
            version: "${fetchedData.version}"
          ) {
            ability_id
            date
            description
            downvotes
            edited
            ownerId
            ownerName
            tip_id
            upvotes
            version
          }
        }
      `;
      const response = await graphQLClient.request(mutation);
      if (abilityTips) {
        const editedTip = response.editTips;
        // Create a new array with updated tips
        let updatedTips = abilityTips.map((item) => {
          // Check if the current tip's ID matches the one we want to update
          if (item.tip_id === tip.tip_id) {
            // Return a new object with updated tip_id (assuming editDescription is the new value)
            return {
              ...item,
              description: editedTip.description,
              date: editedTip.date,
            };
          } else {
            // Return the original tip object if no update is needed
            return item;
          }
        });
        const sortedTips = sortByDateDescending(updatedTips);
        // Update state with the new array of tips
        setabilityTips(sortedTips);
      }
      toggleEditing();
    } catch (error) {
      console.log("error editing:", error);
    }
  };

  // upvote function
  const handleUpvote = async (tipId, upvotes, downvotes) => {
    try {
      const user = getUserFromLocalStorage();
      const bearerToken = user?.accessToken;

      if (!bearerToken) {
        throw new Error("User not authenticated");
      }

      const graphQLClient = createGraphQLClient(bearerToken);
      const voted = await checkIfVoted(graphQLClient, tipId, user.id);

      // vote state of current tip is not upvoted
      if (voted !== 1) {
        const updatedTip = await updateUpvotes(
          graphQLClient,
          tipId,
          upvotes + 1
        );

        // if upvote update success, update the state of current ability tips,
        // to re-render the change of votes
        if (updatedTip) {
          setabilityTips((prevTips) =>
            prevTips.map((tip) =>
              tip.tip_id === updatedTip.tip_id ? updatedTip : tip
            )
          );
        }

        // if vote state of current tip is downvoted
        if (voted === 0) {
          const updatedDownTip = await updateDownvotes(
            graphQLClient,
            tipId,
            downvotes - 1
          );
          if (updatedDownTip) {
            setabilityTips((prevTips) =>
              prevTips.map((tip) =>
                tip.tip_id === updatedDownTip.tip_id ? updatedDownTip : tip
              )
            );
          }
          // if upvote update success, update the state of current ability tips,
          // to re-render the change of votes
          await updateVotes(graphQLClient, tipId, user.id, 1); // Vote = 1 for upvote

          // set upvote => true (tip will display that upvote is active)
          setUpvote(true);
          // set downvote => true (tip will display that downvote is not active)
          setDownvote(true);
        }

        // if current vote state of tip is not voted by upvote or downvote
        else if (voted === -1) {
          await createTipVote(graphQLClient, tipId, user.id, 1); // Vote = 1 for upvote
          // set upvote => true (tip will display that upvote is active)
          setUpvote(true);
        }
      } // if current vote state of tip is upvoted
      else if (voted === 1) {
        const updatedUpvotes = await updateUpvotes(
          graphQLClient,
          tipId,
          upvotes - 1
        );

        if (updatedUpvotes) {
          setabilityTips((prevTips) =>
            prevTips.map((tip) =>
              tip.tip_id === updatedUpvotes.tip_id ? updatedUpvotes : tip
            )
          );
        }
        await deleteTipVote(graphQLClient, tipId, user.id);

        // set upvote => false (tip will display that upvote is not active)
        setUpvote(false);
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

      // if current vote state of tip is not downvoted
      if (voted !== 0) {
        const updatedTip = await updateDownvotes(
          graphQLClient,
          tipId,
          downvotes + 1
        );
        // if downvote update success, update the state of current ability tips,
        // to re-render the change of votes
        if (updatedTip) {
          setabilityTips((prevTips) =>
            prevTips.map((tip) =>
              tip.tip_id === updatedTip.tip_id ? updatedTip : tip
            )
          );
        }
        // set downvote => false (tip will display that downvote is active)
        setDownvote(false);
        // set upvote => false (tip will display that upvote is not active)
        setUpvote(false);

        // if current vote state of tip is upvoted
        if (voted === 1) {
          const updatedDownTip = await updateUpvotes(
            graphQLClient,
            tipId,
            upvotes - 1
          );
          // if downvote update success, update the state of current ability tips,
          // to re-render the change of votes
          if (updatedDownTip) {
            setabilityTips((prevTips) =>
              prevTips.map((tip) =>
                tip.tip_id === updatedDownTip.tip_id ? updatedDownTip : tip
              )
            );
          }

          await updateVotes(graphQLClient, tipId, user.id, 0); // Vote = 0 for downvote
        }
        // if current vote state of tip is not voted by upvote or downvote
        else if (voted === -1) {
          await createTipVote(graphQLClient, tipId, user.id, 0); // Vote = 0 for downvote
        }
      } else if (voted === 0) {
        const updatedDownTip = await updateDownvotes(
          graphQLClient,
          tipId,
          downvotes - 1
        );

        if (updatedDownTip) {
          setabilityTips((prevTips) =>
            prevTips.map((tip) =>
              tip.tip_id === updatedDownTip.tip_id ? updatedDownTip : tip
            )
          );
        }
        await deleteTipVote(graphQLClient, tipId, user.id);
        setDownvote(true);
      }
    } catch (error) {
      console.error("Error downvoting:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Render a loading indicator while fetching data
  }
  return (
    <div className="bg-[#262626] shadow-md p-4 border border-black">
      <div className="flex items-center space-x-2">
        <Avatar>{tip.ownerName.charAt(0)}</Avatar>
        <p className="text-gray-300 font-bold text-lg">{tip.ownerName}</p>
        <div className="border-l border-gray-300 h-6 mx-2"></div>
        <p className="text-gray-400 text-sm">
          {format(parseISO(tip.date), "MMMM dd, yyyy h:mm a")} (
          {formatDistanceToNow(parseISO(tip.date), { addSuffix: true })})
        </p>
        <div className="border-l border-gray-300 h-6 mx-2"></div>
        <p className="text-gray-400">Version: {tip.version.slice(0, 5)}</p>
      </div>

      {/* Conditionally render Textarea or description */}
      {isEditing && tip.description ? (
        <>
          <form onSubmit={handleSubmit}>
            <Textarea
              value={editDescription}
              onChange={handleInputChange}
              minRows={5}
              variant="soft"
              sx={{
                "--Textarea-focusedInset": "var(--any, )",
                "--Textarea-focusedThickness": "0.25rem",
                "--Textarea-focusedHighlight": "rgba(13,110,253,.25)",
                backgroundColor: "#262626",
                color: "#f5f5f5",
                borderColor: "white",
                border: "2px solid white", // Adding a white border with 3px thickness
                "&::placeholder": {
                  color: "#888888",
                  opacity: 1,
                },
                "&:focus-within": {
                  borderColor: "#86b7fe",
                },
                "&::before": {
                  transition: "box-shadow .15s ease-in-out",
                },
                "&:hover": {
                  borderColor: "#555555",
                },
              }}
            />
          </form>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </>
      ) : (
        <p className="text-gray-200 font-semibold mt-2">{tip.description}</p>
      )}

      <div className="flex items-center space-x-4 mt-2">
        <Tooltip title={`Upvotes: ${tip.upvotes}, Downvotes: ${tip.downvotes}`}>
          <div className="flex items-center space-x-1 cursor-pointer">
            <span
              onClick={() =>
                handleUpvote(tip.tip_id, tip.upvotes, tip.downvotes)
              }
              className={`${
                upvote == true ? "text-green-600" : "text-gray-300"
              }`}
            >
              ▲
            </span>
            <span className="text-gray-300">{tip.upvotes - tip.downvotes}</span>
            <span
              onClick={() =>
                handleDownvote(tip.tip_id, tip.downvotes, tip.upvotes)
              }
              className={`${
                downvote == false ? "text-red-600" : "text-gray-300"
              }`}
            >
              ▼
            </span>
          </div>
        </Tooltip>
        {user?.id && tip.ownerId === user?.id ? (
          <TipsEditAndDelete tip={tip} toggleEditing={toggleEditing} />
        ) : null}
      </div>
    </div>
  );
};

export default TipItem;
