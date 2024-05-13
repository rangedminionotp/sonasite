import React from "react";
import AbilitiesContext from "./SharedContext";

const PassiveDes = () => {
  const { abilityVisibility, setAbilityVisibility, fetchedData } =
    React.useContext(AbilitiesContext);
  return (
    <div>
      {fetchedData && (
        <div
          className={
            !abilityVisibility[4].active
              ? "hidden"
              : "top-0 left-0 w-full h-screen bg-[#181818] bg-opacity-90"
          }
        >
          <div className="text-4xl font-bold text-[#FFD700] drop-shadow-lg sm: text-md">
            {fetchedData && fetchedData.passive.name}
          </div>
          <div className="text-5xl font-bold text-white italic drop-shadow-lg sm:text-md">
            {fetchedData && fetchedData.passive.description}
          </div>
        </div>
      )}
    </div>
  );
};

export default PassiveDes;
