import React from "react";
import passive from "@/assets/abilities/Power_Chord.webp";
import Image from "next/image";
import AbilitiesContext from "./SharedContext";

const PassiveAb = () => {
  const {
    fetchedData,
    abilityVisibility,
    setAbilityVisibility,
    setActiveIndex,
    abilities,
  } = React.useContext(AbilitiesContext);

  const toggleVisibility = (divIndex: number) => {
    setAbilityVisibility((prevState) => {
      const abilityPrev = [...prevState];
      // for some reason !abilityPrev[divIndex].active doesnt work :thinking:
      abilityPrev[divIndex].active = true;
      return abilityPrev;
    });
    document.body.style.overflowY = "hidden";
  };
  return (
    <div
      key={`passive-icon`}
      className="flex flex-col items-center justify-center group hover:cursor-pointer transition duration-300 transform hover:scale-110"
    >
      {fetchedData && (
        <>
          <div className="text-center mb-4 ability-btn-shortkey">
            {abilities[4]?.abilityName}
          </div>
          <div className="relative">
            <Image
              alt={""}
              src={fetchedData.abilities[4].imgURL}
              width={100}
              height={100}
              onClick={() => toggleVisibility(4)}
              className="drop-shadow-lg object-cover rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 xl:w-24 xl:h-24"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-80 transition-opacity">
              <Image
                alt={""}
                src={fetchedData.abilities[4].imgURL}
                width={100}
                height={100}
                onClick={() => toggleVisibility(4)}
                className="drop-shadow-lg blur-lg object-cover rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 xl:w-24 xl:h-24"
              />
            </div>
          </div>
          <div className="mt-4 text-center max-w-sm ability-btn-name">
            {abilities[4]?.fullName}
          </div>
        </>
      )}
    </div>
  );
};

export default PassiveAb;
