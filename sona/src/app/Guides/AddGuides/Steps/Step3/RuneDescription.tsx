import React from "react";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";

const RuneDescription = ({ description, setDescription }) => {
  return (
    <div className="container mx-auto  shadow-lg">
      <div className="p-2">
        <div>
          <Textarea
            minRows={5}
            value={description}
            placeholder="Enter description..."
            onChange={(e) => setDescription(e.target.value)}
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

export default RuneDescription;
