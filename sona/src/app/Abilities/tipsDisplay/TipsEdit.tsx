import React from "react";
import DeleteWarning from "./deleteWarning";
import { createGraphQLClient, getUserFromLocalStorage } from "./utils";

const TipsEdit = ({ tip }) => {
  return (
    <div className="flex items-center space-x-1 cursor-pointer">
      <span className="text-gray-500 hover:text-gray-300 hover:underline">
        edit
      </span>
      <DeleteWarning tip={tip} />
    </div>
  );
};

export default TipsEdit;
