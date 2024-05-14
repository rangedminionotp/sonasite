import React from "react";
import Q from "@/assets/abilities/Hymn_of_Valor.webp";
import W from "@/assets/abilities/Aria_of_Perseverance.webp";
import E from "@/assets/abilities/Song_of_Celerity.webp";
import R from "@/assets/abilities/Crescendo.webp";
import passive from "@/assets/abilities/Power_Chord.webp";

import Image from "next/image";
import AbilitiesContext from "../SharedContext";

const AbilitiesNavbar = ({ index, name }) => {
  const abilities = [Q, W, E, R, passive];
  const { abilityVisibility, setAbilityVisibility, fetchedData } =
    React.useContext(AbilitiesContext);

  return (
    <div>
      {fetchedData && (
        <div className="text-6xl font-bold text-[#FFD700] drop-shadow-lg sm:text-md border-b-2 border-yellow-500 pb-2">
          {fetchedData && name}
          <Image
            alt={""}
            src={abilities[index]}
            className="object-cover border border-gray-300"
          />
        </div>
      )}
    </div>
  );
};

export default AbilitiesNavbar;
