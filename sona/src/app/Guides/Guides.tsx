import React from "react";
import Background from "@/app/utils/Background";
import Description from "./Description";
import ByRoleMenu from "./ByRoleMenu";
import ByLabelMenu from "./ByLabelMenu";

import SummonersList from "./SummonersList";
import ItemsList from "./ItemsList";
import RunesList from "./RunesList";
const Guides = ({ summonerData, itemData, runeData }) => {
  return (
    <div name="guides" className="h-screen w-full relative overflow-x-hidden">
      <div className="absolute inset-0 flex justify-center items-center">
        <Description />
      </div>
      <div className="absolute inset-0 flex justify-center items-center">
        <ByRoleMenu />
        <ByLabelMenu />
      </div>
      {/* <SummonersList summonerData={summonerData} />
      <ItemsList itemData={itemData} summonerData={summonerData} /> */}
      {/* <RunesList runeData={runeData} /> */}
    </div>
  );
};

export default Guides;
