import React from "react";
import Description from "./Description";
import SonaSkinsImage from "./SonaSkinsImage";
const Skins = () => {
  return (
    <div name="skins" className="w-full h-screen relative">
      <div className="absolute inset-0 flex justify-center items-center">
        <Description />
      </div>
      <div>
        <SonaSkinsImage />
      </div>
    </div>
  );
};

export default Skins;
