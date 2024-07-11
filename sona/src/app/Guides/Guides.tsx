import React from "react";
import Background from "@/app/utils/Background";
import Description from "./Description";
const Guides = ({ summonerData, itemData, runeData }) => {
  return (
    <div name="guides" className="h-screen w-full relative overflow-x-hidden">
      <div className="absolute inset-0 flex justify-center items-center">
        <Description />
      </div>
      <div className="absolute inset-0 flex justify-center items-center"></div>
    </div>
  );
};

export default Guides;
