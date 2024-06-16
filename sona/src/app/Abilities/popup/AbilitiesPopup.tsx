import React, { useContext, useState, useEffect } from "react";
import AbilityBreadcrumb from "./AbilityBreadcrumb";
import AbilitiesContext from "../SharedContext";
import PopupClose from "./PopupClose";
import AbilitiesNavbar from "./AbilitiesNavbar";
import AbilityDescription from "./AbilityDescription";
import TipsDisplay from "../tips/TipsDisplay";

const AbilitiesPopup = () => {
  const { abilityVisibility, fetchedData, breadcrumbs, setActiveIndex } =
    useContext(AbilitiesContext);

  const [activeIndex, setActiveIndexState] = useState(null);

  return (
    <div name="abilities-popup">
      {fetchedData &&
        fetchedData.abilities.map((ability, index) => {
          if (abilityVisibility[index].active && activeIndex === null) {
            setActiveIndexState(index);
          }

          return (
            <div
              key={index}
              className={
                !abilityVisibility[index].active
                  ? "hidden"
                  : "top-0 left-0 w-full h-screen bg-[#0b0e25] bg-opacity-80 absolute"
              }
            >
              <PopupClose index={index} />
              <AbilitiesNavbar index={index} name={ability.name || ""} />
              <div className="mt-6">
                <AbilityBreadcrumb />
              </div>
              {breadcrumbs[0].active && <AbilityDescription />}
              {breadcrumbs[1].active && <TipsDisplay />}
            </div>
          );
        })}
    </div>
  );
};

export default AbilitiesPopup;
