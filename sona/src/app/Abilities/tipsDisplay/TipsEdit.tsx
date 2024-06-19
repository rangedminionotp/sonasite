import React from "react";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
const TipsEdit = ({ toggleEditing }) => {
  return (
    <div className="inline-block relative">
      <span
        className="text-gray-500 hover:text-gray-300 hover:underline"
        onClick={toggleEditing}
      >
        edit
      </span>
    </div>
  );
};

export default TipsEdit;
