"use client";
import React from "react";
import Q from "@/assets/abilities/Hymn_of_Valor.webp";
import W from "@/assets/abilities/Aria_of_Perseverance.webp";
import E from "@/assets/abilities/Song_of_Celerity.webp";

import Image from "next/image";
import AbilitiesContext from "./SharedContext";
import AbilityDescription from "./AbilityDescription";
const BasicAbilities: FunctionalComponent = () => {
  const abilities = [Q, W, E];

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
    <div className="flex space-x-6 mb-[-15em]">
      {abilities.map((image, index) => (
        <div
          name={`${image}-icon`}
          // key={`${image}-icon`}
          className="hover:cursor-pointer"
        >
          <Image
            alt={""}
            src={image}
            onClick={() => toggleVisibility(index)}
            className="object-cover border border-gray-300"
          />
        </div>
      ))}
    </div>
  );
};

export default BasicAbilities;
