import React from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
const AddReviewsBtn = ({ setAddReviewOpen }) => {
  return (
    <div>
      <IconButton onClick={() => setAddReviewOpen(true)}>
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default AddReviewsBtn;
