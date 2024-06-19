import React from "react";
import Avatar from "@mui/joy/Avatar";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import TipsEdit from "./TipsEdit";
import { getUserFromLocalStorage } from "./utils";
const TipItem = ({ tip, handleUpvote, handleDownvote }) => {
  const user = getUserFromLocalStorage();
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
      <p className="text-gray-200 font-semibold mt-2">{tip.description}</p>
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
        {tip.ownerId === user.id ? <TipsEdit tip={tip} /> : null}
      </div>
    </div>
  );
};

export default TipItem;
