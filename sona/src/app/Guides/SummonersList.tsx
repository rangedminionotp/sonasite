import * as React from "react";
import Image from "next/image";
const SummonersList = ({ summonerData }) => {
  return (
    <div>
      {summonerData &&
        summonerData.map((summoner) => (
          <div key={summoner.id}>
            <h1>{summoner.name}</h1>
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/${summoner.version}/img/spell/${summoner.imageURL}`}
              alt={summoner.name}
              width={50}
              height={50}
            />
          </div>
        ))}
    </div>
  );
};

export default SummonersList;
