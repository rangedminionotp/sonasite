import React from "react";
import Q from "@/assets/abilities/Hymn_of_Valor.webp";
import W from "@/assets/abilities/Aria_of_Perseverance.webp";
import E from "@/assets/abilities/Song_of_Celerity.webp";
import R from "@/assets/abilities/Crescendo.webp";
import Passive from "@/assets/abilities/Power_Chord.webp";
import AbilityBreadcrumb from "./AbilityBreadcrumb";
import Image from "next/image";
import AbilitiesContext from "../SharedContext";

const AbilitiesNavbar = ({ index, name }) => {
  const abilities = [Q, W, E, R, Passive];
  const { abilityVisibility, setAbilityVisibility, fetchedData } =
    React.useContext(AbilitiesContext);

  return (
    <div>
      {fetchedData && (
        <div className="text-center">
          <div className="flex items-center justify-center">
            <div className="flex items-end mr-4">
              <h1 className="font-bold text-[#FFD700] drop-shadow-lg border-b-2 border-yellow-500 pb-2 description-subheader">
                {fetchedData && name}
              </h1>
              <div>
                <Image
                  alt=""
                  src={abilities[index]}
                  layout="responsive"
                  className="object-cover border border-gray-300"
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <AbilityBreadcrumb />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AbilitiesNavbar;
