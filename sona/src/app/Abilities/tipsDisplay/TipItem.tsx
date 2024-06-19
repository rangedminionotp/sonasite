import React from "react";
import Avatar from "@mui/joy/Avatar";
import Textarea from "@mui/joy/Textarea"; // Assuming you imported JoyUI Textarea component
import Button from "@mui/joy/Button";
import { createGraphQLClient, getUserFromLocalStorage } from "./utils";
import { gql } from "graphql-request";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import TipsEditAndDelete from "./TipsEditAndDelete ";
import AbilitiesContext from "../SharedContext";

const TipItem = ({ tip, handleUpvote, handleDownvote }) => {
  const { fetchedData, abilityTips, setabilityTips } =
    React.useContext(AbilitiesContext);

  const user = getUserFromLocalStorage();
  const [isEditing, setIsEditing] = React.useState(false); // State to manage editing mode
  const [editDescription, setEditDescription] = React.useState(tip.description);
  const toggleEditing = () => {
    setIsEditing(!isEditing); // Toggle editing state
  };
  const handleInputChange = (event) => {
    setEditDescription(event.target.value);
  };

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
      await graphQLClient.request(mutation);
      if (abilityTips) {
        // Create a new array with updated tips
        let updatedTips = abilityTips.map((item) => {
          // Check if the current tip's ID matches the one we want to update
          if (item.tip_id === tip.tip_id) {
            // Return a new object with updated tip_id (assuming editDescription is the new value)
            return { ...item, description: editDescription };
          } else {
            // Return the original tip object if no update is needed
            return item;
          }
        });

        // Update state with the new array of tips
        setabilityTips(updatedTips);
      }
      toggleEditing();
    } catch (error) {
      console.log("error editing:", error);
    }
  };

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
        <div
          className="flex items-center space-x-1 cursor-pointer"
          onClick={() =>
            handleUpvote(tip.tip_id, tip.upvotes + 1, tip.downvotes - 1)
          }
        >
          <span className="text-green-600">▲</span>
          <span className="text-gray-300">{tip.upvotes}</span>
        </div>
        <div
          className="flex items-center space-x-1 cursor-pointer"
          onClick={() =>
            handleDownvote(tip.tip_id, tip.downvotes + 1, tip.upvotes - 1)
          }
        >
          <span className="text-red-600">▼</span>
          <span className="text-gray-300">{tip.downvotes}</span>
        </div>
        {tip.ownerId === user.id ? (
          <TipsEditAndDelete tip={tip} toggleEditing={toggleEditing} />
        ) : null}
      </div>
    </div>
  );
};

export default TipItem;
