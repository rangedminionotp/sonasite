import React from "react";
import Image from "next/image";
import SummonersList from "./SummonersList";
const AddSummoners = ({ summonerData }) => {
  return <SummonersList summonerData={summonerData} />;
};

export default AddSummoners;
