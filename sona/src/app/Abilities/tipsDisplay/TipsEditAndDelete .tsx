import React from "react";
import TipsDelete from "./TipsDelete";
import { createGraphQLClient, getUserFromLocalStorage } from "./utils";

const TipsEditAndDelete = ({ tip }) => {
  return (
    <div className="flex items-center space-x-1 cursor-pointer">
      <span className="text-gray-500 hover:text-gray-300 hover:underline">
        edit
      </span>
      <TipsDelete tip={tip} />
    </div>
  );
};

export default TipsEditAndDelete;
