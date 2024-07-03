"use client";
import React from "react";
import Q from "@/assets/abilities/Hymn_of_Valor.webp";
import W from "@/assets/abilities/Aria_of_Perseverance.webp";
import E from "@/assets/abilities/Song_of_Celerity.webp";

import Image from "next/image";
import AbilitiesContext from "./SharedContext";
import AbilityDescription from "./AbilityDescription";
const BasicAbilities: FunctionalComponent = () => {
  const abilitiesImg = [Q, W, E];

  const { abilities, abilityVisibility, setAbilityVisibility, setActiveIndex } =
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
    <div className="flex space-x-20 mt-[25em]">
      {abilities &&
        abilitiesImg.map((image, index) => (
          <div
            name={`${image}-icon`}
            // key={`${image}-icon`}
            className="hover:cursor-pointer transition duration-300 transform hover:scale-110"
          >
            <div className="text-3xl text-center mt-[1em] text-[#FFD700] text-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)] font-sans">
              {abilities[index]?.abilityName}
            </div>
            <div>
              <Image
                alt={""}
                src={abilitiesImg[index]}
                width={70}
                height={70}
                onClick={() => toggleVisibility(index)}
                className="object-cover border border-gray-300"
              />
            </div>
            <div className="text-white max-w-20 uppercase font-work-sans mt-[1em]">
              {abilities[index]?.fullName}
            </div>
          </div>
        ))}
    </div>
  );
};

export default BasicAbilities;
