import * as React from "react";
import Image from "next/image";
const ItemsList = ({ itemData, summonerData }) => {
  return (
    <div className="flex flex-wrap">
      {itemData &&
        itemData.map((item) => (
          <div key={item.id} className="flex flex-wrap">
            <h1>{item.name}</h1>
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/${summonerData[0].version}/img/item/${item.image}`}
              alt={item.name}
              width={25}
              height={25}
            />
          </div>
        ))}
    </div>
  );
};

export default ItemsList;
