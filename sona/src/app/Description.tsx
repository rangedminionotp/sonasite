import React from "react";
import data from "../../data/data.json";

const Description = () => {
  return (
    <div className="text-center mt-4">
      <div className="text-8xl font-bold text-[#FFD700] drop-shadow-lg sm: text-md">
        {data.name.toUpperCase()}
      </div>
      <div className="text-5xl font-bold text-white italic drop-shadow-lg sm: text-md">
        {data.title.toUpperCase()}
      </div>
    </div>
  );
};

export default Description;
