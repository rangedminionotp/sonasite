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
    document.body.style.overflowY = "hidden";
  };

  return (
    <div
      className="flex w-full flex-col flex-wrap items-center justify-between gap-4 px-[20%] xs:flex-row"
      name="basic-abilities-icon"
    >
      {abilities &&
        abilitiesImg.map((image, index) => (
          <div
            key={`${image}-icon`}
            className="flex flex-col items-center group hover:cursor-pointer transition duration-300 transform hover:scale-110"
          >
            <div className="text-center mt-4 ability-btn-shortkey">
              {abilities[index]?.abilityName}
            </div>
            <div className="relative">
              <Image
                alt={abilities[index]?.fullName}
                src={abilitiesImg[index]}
                onClick={() => toggleVisibility(index)}
                className="drop-shadow-lg object-cover rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-80 transition-opacity">
                <Image
                  alt={abilities[index]?.fullName}
                  src={abilitiesImg[index]}
                  onClick={() => toggleVisibility(index)}
                  className="drop-shadow-lg blur-lg object-cover rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20"
                />
              </div>
            </div>
            <div className="mt-4 text-center max-w-sm ability-btn-name">
              {abilities[index]?.fullName}
            </div>
          </div>
        ))}
    </div>
  );
};

export default BasicAbilities;
