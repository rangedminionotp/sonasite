import React from "react";
import TipsDelete from "./TipsDelete";
import TipsEdit from "./TipsEdit";
const TipsEditAndDelete = ({ tip, toggleEditing }) => {
  return (
    <div className="flex items-center space-x-1 cursor-pointer">
      <TipsEdit toggleEditing={toggleEditing} />
      <TipsDelete tip={tip} />
    </div>
  );
};

export default TipsEditAndDelete;
