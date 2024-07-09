import React from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

import { useUser } from "@/app/utils/user";
import { useRouter } from "next/navigation";

const AddReviewsBtn = ({ setAddReviewOpen }) => {
  const router = useRouter();
  const user = useUser();
  const handleClick = () => {
    if (!user) {
      router.push("/login");
      alert("Please login to add reviews!");
      return;
    }
    setAddReviewOpen(true);
  };
  return (
    <div>
      <IconButton onClick={handleClick}>
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default AddReviewsBtn;
