import * as React from "react";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";

const SummonersList = ({ summonerData }) => {
  return (
    <div className="container mx-auto  w-full">
      <div className="p-2">
        <div className="steps-description-header text-gray-200">
          5. Select Summoners
        </div>
        <div className="grid grid-cols-7 max-w-full gap-4">
          {summonerData &&
            summonerData.map((summoner) => (
              <div key={summoner.id}>
                <h1 className="text-gray-200">{summoner.name}</h1>
                <Image
                  src={`${summoner.imageURL}`}
                  alt={summoner.name}
                  width={50}
                  height={50}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SummonersList;
