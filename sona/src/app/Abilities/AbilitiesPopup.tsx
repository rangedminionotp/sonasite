import React from "react";
import AbilityBreadcrumb from "./AbilityBreadcrumb";

const AbilitiesPopup = () => {
  return (
    <div
      className={
        !divVisibility[`div${index}`]
          ? "hidden"
          : "top-0 left-0 w-full h-screen bg-[#0b0e25] bg-opacity-80 absolute"
      }
    >
      <AbilityBreadcrumb />
    </div>
  );
};

export default AbilitiesPopup;
