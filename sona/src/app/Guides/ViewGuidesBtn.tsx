import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";

const ViewGuidesBtn: React.FC = () => {
  return (
    <Button variant="contained" color="primary" startIcon={<VisibilityIcon />}>
      ViewGuidesBtn
    </Button>
  );
};

export default ViewGuidesBtn;
