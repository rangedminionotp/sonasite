import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import EditLoreModal from "./EditLoreModal";
const EditLoreBtn = ({
  editLoreBtn,
  setEditLoreBtn,
  lore,
  userLores,
  setUserLores,
}) => {
  return (
    <div>
      <IconButton onClick={() => setEditLoreBtn(true)}>
        <EditIcon />
      </IconButton>
      <EditLoreModal
        open={editLoreBtn}
        setOpen={setEditLoreBtn}
        lore={lore}
        userLores={userLores}
        setUserLores={setUserLores}
      />
    </div>
  );
};

export default EditLoreBtn;
