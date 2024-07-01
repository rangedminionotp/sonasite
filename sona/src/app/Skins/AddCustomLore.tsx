import React from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import ToolTip from "@mui/material/Tooltip";
import { getUserFromLocalStorage } from "@/app/utils/api";
import { useRouter } from "next/navigation";

const AddCustomLore = ({ skinName, setAddLoreOpen }) => {
  const router = useRouter();

  const handleClick = () => {
    const user = getUserFromLocalStorage();
    if (!user) {
      router.push("/login");
      alert("Please login to add lores!");
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
