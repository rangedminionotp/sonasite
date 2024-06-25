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
  const [downvote, setDownvote] = React.useState<boolean>(false);

  const [votes, setVotes] = React.useState<number>(0
  );
  const [upVotes, setUpVotes] = React.useState<number>(0);
  const [downVotes, setDownVotes] = React.useState<number>(0);

  const user = getUserFromLocalStorage();
  // const [downvotes, setDownvotes] = React.useState(tip.downvotes);
  const [isEditing, setIsEditing] = React.useState(false); // State to manage editing mode
  const [editDescription, setEditDescription] = React.useState(tip.description);
  const [loading, setLoading] = React.useState(true); // State to track loading status
  useEffect(() => {
    const seeVoteStatus = async () => {
      const bearerToken = user?.accessToken;
      const graphQLClient = createGraphQLClient(bearerToken);
      const voted = await checkIfVoted(graphQLClient, tip.tip_id, user.id);
      if (voted === 1) {
        setUpvote(true);
      } else if (voted === 0) {
        setDownvote(true);
      } else if (voted === -1) {
        setUpvote(false);
        setDownvote(false);
      }
    };
    setVotes(tip.upvotes > tip.downvotes
      ? tip.upvotes - tip.downvotes
      : tip.upvotes + tip.downvotes)
    setUpvotes(votes + 1)
    setDownVotes(votes - 1)
    seeVoteStatus();
    setLoading(false);
  }, [upvote, downvote]);

  const toggleEditing = () => {
    setIsEditing(!isEditing); // Toggle editing state
  };
  const handleInputChange = (event) => {
    setEditDescription(event.target.value);
  };

  const handleVote = async (type, tipId, upvotes, downvotes) => {
    try {
      const user = getUserFromLocalStorage();
      const bearerToken = user?.accessToken;

      if (!bearerToken) {
        throw new Error("User not authenticated");
      }

      const graphQLClient = createGraphQLClient(bearerToken);
      const voted = await checkIfVoted(graphQLClient, tipId, user.id);
      if (type === "upvote") {
        // vote state of current tip is not upvoted
      if (voted !== 1) {
        const updatedTip = await updateUpvotes(
          graphQLClient,
          tipId,
          upvotes 
        );

      } else {
      }
    } catch (error) {
      console.log("error voting:", error);
    }
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
      {isEditing ? (
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
              // onClick={() =>
              //   handleUpvote(tip.tip_id, tip.upvotes, tip.downvotes)
              // }
              className={`${upvote ? "text-green-600" : "text-gray-300"}`}
            >
              ▲
            </span>
            <span className="text-gray-300">{votes}</span>
            <span
              // onClick={() =>
              //   handleDownvote(tip.tip_id, tip.downvotes, tip.upvotes)
              // }
              className={`${downvote ? "text-red-600" : "text-gray-300"}`}
            >
              ▼
            </span>
          </div>
        </Tooltip>
        {user.id && tip.ownerId === user.id ? (
          <TipsEditAndDelete tip={tip} toggleEditing={toggleEditing} />
        ) : null}
      </div>
    </div>
  );
};

export default TipItem;
