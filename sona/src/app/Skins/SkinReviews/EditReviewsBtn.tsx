import React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/joy/Tooltip";

const EditReviewsBtn = ({ setEditReviewOpen }) => {
  return (
    <Tooltip title="Edit">
      <div
        className="text-gray-500 hover:cursor-pointer hover:text-gray-300 hover:underline"
        onClick={() => setEditReviewOpen(true)}
      >
        <EditIcon />
      </div>
    </Tooltip>
  );
};

export default EditReviewsBtn;
