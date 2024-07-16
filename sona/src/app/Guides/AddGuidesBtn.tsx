import React from "react";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useUser } from "@/app/utils/user";
import { useRouter } from "next/navigation";
const AddGuidesBtn = ({ setOpen }) => {
  const user = useUser();
  const router = useRouter();
  const handleClick = () => {
    if (!user) {
      router.push("/login");
    }
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
