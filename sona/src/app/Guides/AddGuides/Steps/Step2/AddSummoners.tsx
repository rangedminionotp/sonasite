import React from "react";
import Image from "next/image";
import SummonersList from "./SummonersList";
import DragAndDropCopy from "./DragAndDropCopy";
const AddSummoners = ({ summonerData }) => {
  // return <SummonersList summonerData={summonerData} />;
  return (
    <div>
      {/* <DragAndDropCopy /> */}
      <SummonersList summonerData={summonerData} />
    </div>
  );
};

export default AddSummoners;
