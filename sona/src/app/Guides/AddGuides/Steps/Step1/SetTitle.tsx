import React from "react";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import SaveIcon from "@mui/icons-material/Save";
const SetTitle = ({ title, setTitle }) => {
  return (
    <div className="container mx-auto  shadow-lg">
      <div className="p-2">
        <div className="steps-description-header text-gray-200  p-8">
          1. Set Title
        </div>
        <div className="flex flex-col gap-4">
          <Textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="  text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            sx={{
              backgroundColor: "var(--primary-bg)",
              color: "white",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SetTitle;
