import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ItemByGroupProps } from "./types";
import { ItemsType } from "./types";

const ItemsList = ({ itemData, summonerData, category }) => {
  const [starterVisible, setStarterVisible] = useState(true);
  const [basicVisible, setBasicVisible] = useState(true);
  const [epicVisible, setEpicVisible] = useState(true);
  const [legendaryVisible, setLegendaryVisible] = useState(true);
  const [bootsVisible, setBootsVisible] = useState(true);
  const [consumablesTrinketsVisible, setConsumablesTrinketsVisible] =
    useState(true);
  const [categoriedItems, setCategoriedItems] = useState<ItemsType | null>(
    null
  );

  React.useEffect(() => {
    console.log("category", category);
    console.log("itemData", itemData);
    console.log("categoriedItems", categoriedItems);
    if (itemData === null) {
      return;
    }
    if (category === "" || category === "all items") {
      setCategoriedItems(itemData);
    } else {
      const keys = Object.keys(itemData);
      const tempArr = {};
      keys.forEach((key) => {
        tempArr[key] = [];
        itemData[key].map((item) => {
          if (item.tags.some((tag) => tag === category)) {
            tempArr[key].push(item);
          }
        });
      });
      setCategoriedItems(tempArr);
    }
  }, [category, itemData]);

  const ItemByGroup = ({
    items,
    groupName,
    visible,
    setVisible,
    name,
  }: {
    items: ItemDataType;
    groupName: string;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    name: string;
  }) => {
    return (
      <div className="flex flex-wrap ">
        <div
          onClick={() => setVisible(!visible)}
          className="w-full text-3xl font-bold mb-4 hover:cursor-pointer uppercase text-[#f4f3f0]"
        >
          {name}
        </div>
        {visible &&
          items[groupName].map((item) => (
            <div
              key={item.id}
              className="hover:bg-[#4d4c4b] hover:bg-opacity-50 p-3 group hover:cursor-pointer"
            >
              <div>
                {/* <h1 className="text-xl font-bold mb-2">{item.name}</h1> */}
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/${summonerData[0].version}/img/item/${item.image}`}
                  alt={item.name}
                  width={50}
                  height={50}
                  priority={false}
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
      {categoriedItems && (
        <>
          <ItemByGroup
            items={categoriedItems}
            groupName="consumablesTrinkets"
            visible={consumablesTrinketsVisible}
            setVisible={setConsumablesTrinketsVisible}
            name="Consumables&Trinkets&Others"
          />
          <ItemByGroup
            items={categoriedItems}
            groupName="starter"
            visible={starterVisible}
            setVisible={setStarterVisible}
            name="Starter"
          />
          <ItemByGroup
            items={categoriedItems}
            groupName="basic"
            visible={basicVisible}
            setVisible={setBasicVisible}
            name="Basic"
          />
          <ItemByGroup
            items={categoriedItems}
            groupName="epic"
            visible={epicVisible}
            setVisible={setEpicVisible}
            name="Epic"
          />
          <ItemByGroup
            items={categoriedItems}
            groupName="legendary"
            visible={legendaryVisible}
            setVisible={setLegendaryVisible}
            name="Legendary"
          />
          <ItemByGroup
            items={categoriedItems}
            groupName="boots"
            visible={bootsVisible}
            setVisible={setBootsVisible}
            name="Boots"
          />
        </>
      )}
    </div>
  );
};

export default ItemsList;
