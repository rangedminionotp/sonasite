import React, { useState, useEffect } from "react";
import stats from "../../../data/sonaStats.json";
import AbilitiesContext from "./SharedContext";

const Description = () => {
  // data fetched
  const { fetchedData } = React.useContext(AbilitiesContext);

  return (
    <div>
      <div className="text-center justify-center mb-[24em]">
        <div className="font-bold text-[#FFD700] drop-shadow-2xl text-6xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl">
          {"abilities".toUpperCase()}
        </div>
        <div className="font-bold text-white italic drop-shadow-2xl text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
          {fetchedData && fetchedData.version.slice(0, 5)}
        </div>
      </div>
    </div>
  );
};

export default Description;
