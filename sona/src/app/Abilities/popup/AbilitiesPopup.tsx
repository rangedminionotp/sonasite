import React from "react";
import AbilityBreadcrumb from "./AbilityBreadcrumb";
import AbilitiesContext from "../SharedContext";
import PopupClose from "./PopupClose";
import AbilitiesNavbar from "./AbilitiesNavbar";
import AbilityDescription from "./AbilityDescription";
const AbilitiesPopup = () => {
  const {
    abilityVisibility,
    setAbilityVisibility,
    fetchedData,
    fetchedRawDataQ,
    breadcrumbs,
    setBreadcrumbs,
  } = React.useContext(AbilitiesContext);
  return (
    <div name="abilities-popup">
      {fetchedData &&
        fetchedData.abilities.map((ability, index) => (
          <div
            // key={`${ability}-popup`}
            className={
              !abilityVisibility[index].active
                ? "hidden"
                : "top-0 left-0 w-full h-screen bg-[#0b0e25] bg-opacity-80 absolute"
            }
          >
            <PopupClose index={index} />
            <AbilitiesNavbar index={index} name={ability.name || ""} />
            <AbilityBreadcrumb />
            {/* if user wants to see active... it should auto open overview */}
            {breadcrumbs[0].active ? <AbilityDescription /> : null}
          </div>
        ))}
    </div>
  );
};

export default AbilitiesPopup;
