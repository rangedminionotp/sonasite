import React from "react";
import { FaTimes } from "react-icons/fa";
import AbilitiesContext from "../SharedContext";

const PopupClose = ({ index }) => {
  const {
    abilityVisibility,
    setAbilityVisibility,
    breadcrumbs,
    setabilityTips,
    setBreadcrumbs,
    setActiveIndex, // Add this to context
  } = React.useContext(AbilitiesContext);

  const toggleVisibility = (divIndex) => {
    setAbilityVisibility((prevState) => {
      const abilityPrev = [...prevState];
      abilityPrev[divIndex].active = false;

      return abilityPrev;
    });

    // Reset the active index
    setActiveIndex(null);
    setabilityTips([]);
    // Ensure the abilities overview always displays when abilities are toggled
    const updatedBreadcrumbs = breadcrumbs.map((breadcrumb, index) => ({
      ...breadcrumb,
      active: index === 0,
    }));
    setBreadcrumbs(updatedBreadcrumbs);
  };

  return (
    <div
      name="popup-close"
      className="text-6xl text-white hover:cursor-pointer"
      onClick={() => toggleVisibility(index)}
    >
      <FaTimes className="h-12 w-12" />
    </div>
  );
};

export default PopupClose;
