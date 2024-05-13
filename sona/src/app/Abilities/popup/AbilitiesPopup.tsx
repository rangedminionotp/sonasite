import React from "react";
import AbilityBreadcrumb from "./AbilityBreadcrumb";
import AbilitiesContext from "../SharedContext";
import PopupClose from "./PopupClose";
import AbilitiesNavbar from "./AbilitiesNavbar";

const AbilitiesPopup = () => {
  const {
    abilityVisibility,
    setAbilityVisibility,
    fetchedData,
    fetchedRawDataQ,
  } = React.useContext(AbilitiesContext);
  return (
    <div name="abilities-popup">
      {fetchedData &&
        fetchedData.abilities.map((ability, index) => (
          <div
            className={
              !abilityVisibility[index].active
                ? "hidden"
                : "top-0 left-0 w-full h-screen bg-[#0b0e25] bg-opacity-80 absolute"
            }
          >
            <PopupClose index={index} />
            <AbilitiesNavbar index={index} name={ability.name} />
            <AbilityBreadcrumb />
          </div>
        ))}
    </div>
  );
};

export default AbilitiesPopup;
