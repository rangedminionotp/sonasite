import React from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import ToolTip from "@mui/material/Tooltip";
const AddCustomLore = ({ skinName, setAddLoreOpen }) => {
  return (
    <div>
      <ToolTip
        title={`${skinName} doesn't have an official lore, add your own!`}
      >
        <IconButton onClick={() => setAddLoreOpen(true)}>
          <AddIcon />
        </IconButton>
      </ToolTip>
    </div>
  );
};

export default AddCustomLore;
