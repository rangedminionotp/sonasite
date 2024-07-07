import React, { useContext, useState, useEffect } from "react";
import AbilityBreadcrumb from "./AbilityBreadcrumb";
import AbilitiesContext from "../SharedContext";
import PopupClose from "./PopupClose";
import AbilitiesNavbar from "./AbilitiesNavbar";
import AbilityDescription from "./AbilityDescription";
import TipsDisplay from "../tipsDisplay/TipsDisplay";
import AddTips from "../AddTips/AddTips";

const AbilitiesPopup = () => {
  const {
    abilities,
    abilityVisibility,
    fetchedData,
    breadcrumbs,
    activeIndex,
    setActiveIndex,
  } = useContext(AbilitiesContext);

  useEffect(() => {
    if (fetchedData && fetchedData.abilities) {
      fetchedData.abilities.forEach((ability, index) => {
        if (abilityVisibility[index]?.active && activeIndex === null) {
          setActiveIndex(index);
        }
      });
    }
  }, [fetchedData, abilityVisibility, activeIndex, setActiveIndex]);

  return (
    <div name="abilities-popup">
      {fetchedData &&
        fetchedData.abilities.map((ability, index) => {
          return (
            <div
              key={`ability-${ability.id}-popup`}
              className={
                !abilityVisibility[index].active
                  ? "hidden"
                  : "top-[80px]  left-0  w-full h-full bg-[#0b0e25] absolute z-20 overflow-y-auto no-scrollbar"
              }
            >
              <PopupClose index={index} />
              <AbilitiesNavbar index={index} name={ability.name || ""} />
              {breadcrumbs[0].active && <AbilityDescription />}
              {breadcrumbs[1].active && <TipsDisplay index={activeIndex} />}
              {breadcrumbs[2].active && (
                <AddTips
                  ability_id={abilities[activeIndex].abilityId}
                  version={fetchedData.version}
                />
              )}
            </div>
          );
        })}
    </div>
  );
};

export default AbilitiesPopup;
