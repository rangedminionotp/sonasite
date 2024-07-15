import React from "react";
import Image from "next/image";
import SummonersList from "./SummonersList";
const AddSummoners = ({ summonerData }) => {
  return (
    <div>
      <SummonersList summonerData={summonerData} />
    </div>
  );
};

export default AddSummoners;
