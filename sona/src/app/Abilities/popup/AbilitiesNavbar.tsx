import React from "react";
import AbilityBreadcrumb from "./AbilityBreadcrumb";
import Image from "next/image";
import AbilitiesContext from "../SharedContext";

const AbilitiesNavbar = ({ index, name }) => {
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
                  src={fetchedData.abilities[index].imgURL}
                  width={100}
                  height={100}
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
