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
        name={`R-icon`}
        // key={`R-popup-icon`}
        className="hover:cursor-pointer transition duration-300 transform hover:scale-110"
      >
        <div className="text-3xl text-center mt-[1em] text-[#FFD700] text-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)] font-sans">
          {abilities[3]?.abilityName}
        </div>
        <Image
          alt={""}
          src={R}
          width={80}
          height={80}
          onClick={() => toggleVisibility(3)}
          className="object-cover border border-gray-300"
        />{" "}
        <div className="text-white max-w-20 uppercase font-work-sans mt-[1em]">
          {abilities[3]?.fullName}
        </div>
      </div>
    </div>
  );
};

export default UltAb;
