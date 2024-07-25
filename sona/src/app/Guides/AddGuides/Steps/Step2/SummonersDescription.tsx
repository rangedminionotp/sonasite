import React from "react";
import Textarea from "@mui/joy/Textarea";

const SummonersDescription = ({ description, setDescription }) => {
  const [description1, setDescription1] = React.useState(description);

  const handleChange = (e) => {
    setDescription1(e.target.value);
    setDescription(e.target.value);
  };

  return (
    <div className="container mx-auto shadow-lg">
      <div className="p-2">
        <div>
          <Textarea
            minRows={5}
            value={description}
            placeholder={`why is this summoner pair good...`}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
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
