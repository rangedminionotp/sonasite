import React, { useState, useEffect } from "react";
import stats from "../../../data/sonaStats.json";
import AbilitiesContext from "./SharedContext";

const Description = () => {
  // data fetched
  const { fetchedData } = React.useContext(AbilitiesContext);

  return (
    <div>
      <div className="text-center justify-center mb-[14em]">
        <div className="text-8xl font-bold text-[#FFD700] drop-shadow-2xl  sm: text-md">
          {"abilities".toUpperCase()}
        </div>
        <div className="text-6xl font-bold text-white italic drop-shadow-2xl  sm: text-md">
          {fetchedData && fetchedData.version}
        </div>
      </div>
    </div>
  );
};

export default Description;