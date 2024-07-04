import React from "react";
import R from "@/assets/abilities/Crescendo.webp";
import Image from "next/image";
import AbilitiesContext from "./SharedContext";

const UltAb = () => {
  const { abilityVisibility, setAbilityVisibility, setActiveIndex, abilities } =
    React.useContext(AbilitiesContext);

  const toggleVisibility = (divIndex) => {
    setAbilityVisibility((prevState) => {
      const abilityPrev = [...prevState];
      // for some reason !abilityPrev[divIndex].active doesnt work :thinking:
      abilityPrev[divIndex].active = true;
      setActiveIndex(divIndex);
      return abilityPrev;
    });
  };
  return (
    <div className="flex space-x-6">
      <div
        key={`passive-icon`}
        className="flex flex-col items-center group hover:cursor-pointer transition duration-300 transform hover:scale-110"
      >
        <div className="text-center mb-4 ability-btn-shortkey">
          {abilities[3]?.abilityName}
        </div>
        <div className="relative">
          <Image
            alt={abilities[3]?.fullName}
            src={R}
            onClick={() => toggleVisibility(3)}
            className="drop-shadow-lg object-cover rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 xl:w-24 xl:h-24"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-80 transition-opacity">
            <Image
              alt={abilities[3]?.fullName}
              src={R}
              onClick={() => toggleVisibility(3)}
              className="drop-shadow-lg blur-lg object-cover rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 xl:w-24 xl:h-24"
            />
          </div>
        </div>
        <div className="mt-4 text-center max-w-sm ability-btn-name">
          {abilities[3]?.fullName}
        </div>
      </div>
    </div>
  );
};

export default UltAb;
