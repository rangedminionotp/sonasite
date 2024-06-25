import React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
const EditReviewsBtn = ({ setEditReviewOpen }) => {
  return (
    <div
      className="hover:cursor-pointer"
      onClick={() => setEditReviewOpen(true)}
    >
      Edit
      <EditIcon />
    </div>
  );
};

export default EditReviewsBtn;
