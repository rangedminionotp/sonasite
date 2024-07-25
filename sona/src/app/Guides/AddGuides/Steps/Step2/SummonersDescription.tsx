import React from "react";

import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";

const SummonersDescription = ({ description, setDescription }) => {
  return (
    <div className="container mx-auto  shadow-lg">
      <div className="p-2">
        <div>
          {/* #todo somehow textarea is inputting very slow, need to fix */}
          <Textarea
            minRows={5}
            value={description}
            placeholder={`why is this summoner pair good...`}
            onChange={(e) => setDescription(e.target.value)}
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

export default SummonersDescription;
