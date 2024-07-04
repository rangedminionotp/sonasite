import React from "react";
import passive from "@/assets/abilities/Power_Chord.webp";
import Image from "next/image";
import AbilitiesContext from "./SharedContext";

const PassiveAb = () => {
  const { abilityVisibility, setAbilityVisibility, setActiveIndex, abilities } =
    React.useContext(AbilitiesContext);

  const toggleVisibility = (divIndex: number) => {
    setAbilityVisibility((prevState) => {
      const abilityPrev = [...prevState];
      // for some reason !abilityPrev[divIndex].active doesnt work :thinking:
      abilityPrev[divIndex].active = true;
      return abilityPrev;
    });
  };
  return (
    <div className="flex space-x-6">
      <div
        // key={`passive-icon`}
        className="hover:cursor-pointer transition duration-300 transform hover:scale-110"
      >
        <div className="text-2xl text-center mt-[1em] text-[#FFD700] text-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)] font-sans">
          {abilities[4]?.abilityName}
        </div>
        <Image
          width={80} // Adjust the width as needed
          height={80}
          alt={""}
          src={passive}
          onClick={() => toggleVisibility(4)}
          className="object-cover border border-gray-300 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-26 lg:h-26 xl:w-26 xl:h-26 min-w-16 min-h-16"
        />
        <div className="text-white max-w-20 uppercase font-work-sans mt-[1em]">
          {abilities[4]?.fullName}
        </div>
      </div>
    </div>
  );
};

export default PassiveAb;
