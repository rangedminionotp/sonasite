import React from "react";
import AbilitiesContext from "./SharedContext";
const AbilityDescription = () => {
  const { divVisibility, setDivVisibility, fetchedData } =
    React.useContext(AbilitiesContext);
  return (
    <div>
      {fetchedData &&
        fetchedData.abilities.map((ability, index) => (
          <div
            className={
              !divVisibility[`div${index}`]
                ? "hidden"
                : "top-0 left-0 w-full h-screen bg-[#181818] bg-opacity-90"
            }
          >
            <div className="text-4xl font-bold text-[#FFD700] drop-shadow-lg sm: text-md">
              {fetchedData && ability.name}
            </div>
            <div className="text-5xl font-bold text-white italic drop-shadow-lg sm:text-md">
              {fetchedData && ability.description}
            </div>
            <div className="text-2xl font-bold text-white drop-shadow-lg sm:text-md">
              {fetchedData && ability.tooltip}
            </div>
          </div>
        ))}
    </div>
  );
};

export default AbilityDescription;
