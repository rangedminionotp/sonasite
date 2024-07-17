import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ItemByGroupProps } from "./types";

const ItemsList = ({ itemData, summonerData }) => {
  const [starterVisible, setStarterVisible] = useState(true);
  const [basicVisible, setBasicVisible] = useState(true);
  const [epicVisible, setEpicVisible] = useState(true);
  const [legendaryVisible, setLegendaryVisible] = useState(true);
  const [bootsVisible, setBootsVisible] = useState(true);
  const ItemByGroup = ({
    items,
    groupName,
    visible,
    setVisible,
  }: {
    items: ItemDataType;
    groupName: string;
    visible: boolean;
    setVisible: (visible: boolean) => void;
  }) => {
    return (
      <div className="flex flex-wrap ">
        <div
          onClick={() => setVisible(!visible)}
          className="w-full text-3xl font-bold mb-4 hover:cursor-pointer uppercase text-[#f4f3f0]"
        >
          {groupName}
        </div>
        {itemData &&
          summonerData &&
          visible &&
          items[groupName].map((item) => (
            <div className="hover:bg-[#4d4c4b] hover:bg-opacity-50 p-3 group hover:cursor-pointer">
              <div key={item.id}>
                {/* <h1 className="text-xl font-bold mb-2">{item.name}</h1> */}
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/${summonerData[0].version}/img/item/${item.image}`}
                  alt={item.name}
                  width={50}
                  height={50}
                  className=" ring-1 ring-[#7e7e7e] group-hover:ring-offset-4 group-hover:ring-[#CDBD82]"
                />
                <div className="text-gray-300 font-sans text-center items-center">
                  {item.gold.total}
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="">
      <ItemByGroup
        items={itemData}
        groupName="starter"
        visible={starterVisible}
        setVisible={setStarterVisible}
      />
      <ItemByGroup
        items={itemData}
        groupName="basic"
        visible={basicVisible}
        setVisible={setBasicVisible}
      />
      <ItemByGroup
        items={itemData}
        groupName="epic"
        visible={epicVisible}
        setVisible={setEpicVisible}
      />
      <ItemByGroup
        items={itemData}
        groupName="legendary"
        visible={legendaryVisible}
        setVisible={setLegendaryVisible}
      />
      <ItemByGroup
        items={itemData}
        groupName="boots"
        visible={bootsVisible}
        setVisible={setBootsVisible}
      />
    </div>
  );
};

export default ItemsList;
