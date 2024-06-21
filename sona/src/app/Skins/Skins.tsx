import React from "react";
import Description from "./Description";
import SonaSkinsImage from "./SonaSkinsImage";
import SonaSkinsItem from "./SonaSkinsItem";
const Skins = () => {
  return (
    <div name="skins" className="w-full h-screen relative">
      <div className="absolute inset-0 flex justify-center items-center">
        <Description />
      </div>
      <div className="flex flex-wrap justify-center ">
        <SonaSkinsItem />
      </div>
    </div>
  );
};

export default Skins;
