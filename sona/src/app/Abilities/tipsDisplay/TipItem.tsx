import React from "react";
import Avatar from "@mui/joy/Avatar";
import Textarea from "@mui/joy/Textarea"; // Assuming you imported JoyUI Textarea component

import { format, formatDistanceToNow, parseISO } from "date-fns";
import TipsEditAndDelete from "./TipsEditAndDelete ";
import { getUserFromLocalStorage } from "./utils";
const TipItem = ({ tip, handleUpvote, handleDownvote }) => {
  const user = getUserFromLocalStorage();
  const [isEditing, setIsEditing] = React.useState(false); // State to manage editing mode

  const toggleEditing = () => {
    setIsEditing(!isEditing); // Toggle editing state
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
        <Textarea
          value={tip.description}
          onChange={(event) => {
            // Handle Textarea changes if needed
          }}
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
