import React from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import ToolTip from "@mui/material/Tooltip";
import { useUser } from "@/app/utils/user";

import { useRouter } from "next/navigation";

const AddCustomLore = ({ skinName, setAddLoreOpen }) => {
  const router = useRouter();
  const user = useUser();
  const handleClick = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    setAddLoreOpen(true);
  };
  return (
    <div>
      <ToolTip
        title={`${skinName} doesn't have an official lore, add your own!`}
      >
        <IconButton onClick={handleClick}>
          <AddIcon />
        </IconButton>
      </ToolTip>
    </div>
  );
};

export default AddCustomLore;
