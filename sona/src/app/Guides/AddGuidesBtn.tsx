import React from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
const AddGuidesBtn = ({ setOpen }) => {
  const handleClick = () => {
    setOpen(true);
    document.body.style.overflowY = "hidden";
  };
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={handleClick}
    >
      AddGuidesBtn
    </Button>
  );
};

export default AddGuidesBtn;
