import React from "react";
import Textarea from "@mui/joy/Textarea";

const SetDescriptions = ({ title, setTitle }) => {
  return (
    <div>
      <div>
        <div className="description-subheader text-gray-200">Set Title</div>
        <div>
          <Textarea value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
      </div>
    </div>
  );
};

export default SetDescriptions;
