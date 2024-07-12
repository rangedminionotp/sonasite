import React from "react";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";

const SetDescriptions = ({ title, setTitle }) => {
  return (
    <div>
      <div>
        <div className="description-subheader text-gray-200">Set Title</div>
        <div>
          <Textarea value={title} onChange={(e) => setTitle(e.target.value)} />
          <Button>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default SetDescriptions;
