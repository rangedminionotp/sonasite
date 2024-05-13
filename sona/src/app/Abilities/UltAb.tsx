import React from "react";
import R from "../../../assets/abilities/Crescendo.webp";
import Image from "next/image";
import AbilitiesContext from "./SharedContext";

const UltAb = () => {
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
        name={`R-icon`}
        // key={`R-popup-icon`}
        className="hover:cursor-pointer"
      >
        <Image
          alt={""}
          src={R}
          width={80}
          height={80}
          onClick={() => toggleVisibility(3)}
          className="object-cover border border-gray-300"
        />
      </div>
    </div>
  );
};

export default UltAb;
