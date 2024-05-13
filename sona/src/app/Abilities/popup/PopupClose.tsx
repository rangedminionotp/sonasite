import React from "react";
import { FaTimes } from "react-icons/fa";
import AbilitiesContext from "../SharedContext";

const PopupClose = ({ index }) => {
  const { abilityVisibility, setAbilityVisibility } =
    React.useContext(AbilitiesContext);

  const toggleVisibility = (divIndex) => {
    setAbilityVisibility((prevState) => {
      const abilityPrev = [...prevState];
      // for some reason !abilityPrev[divIndex].active doesnt work :thinking:
      abilityPrev[divIndex].active = false;
      return abilityPrev;
    });
  };
  return (
    <div
      name="popup-close"
      className="text-6xl text-white hover:cursor-pointer"
      onClick={() => toggleVisibility(index)}
    >
      <FaTimes className="h-12 w-12" />{" "}
      {/* Adjust the height and width as needed */}
    </div>
  );
};

export default PopupClose;
