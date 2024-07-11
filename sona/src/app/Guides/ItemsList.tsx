import * as React from "react";
import Image from "next/image";
const ItemsList = ({ itemData, summonerData }) => {
  return (
    <div className="flex flex-wrap">
      {itemData &&
        itemData.map((item) => (
          <div key={item.id} className="w-auto md:w-1/3 lg:w-1/4 p-2">
            <div className="border border-gray-200 rounded-lg shadow-md p-4">
              <h1 className="text-xl font-bold mb-2">{item.name}</h1>
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/${summonerData[0].version}/img/item/${item.image}`}
                alt={item.name}
                width={50}
                height={50}
                className="mx-auto"
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default ItemsList;
