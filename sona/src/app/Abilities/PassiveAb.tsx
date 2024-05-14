import React from "react";
import passive from "@/assets/abilities/Power_Chord.webp";
import Image from "next/image";
import AbilitiesContext from "./SharedContext";

const PassiveAb = () => {
  const { abilityVisibility, setAbilityVisibility } =
    React.useContext(AbilitiesContext);

  const toggleVisibility = (divIndex) => {
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
        name={`passive-icon`}
        // key={`passive-icon`}
        className="hover:cursor-pointer"
      >
        <Image
          width={80} // Adjust the width as needed
          height={80}
          alt={""}
          src={passive}
          onClick={() => toggleVisibility(4)}
          className="object-cover border border-gray-300"
        />
      </div>
    </div>
  );
};

export default PassiveAb;
