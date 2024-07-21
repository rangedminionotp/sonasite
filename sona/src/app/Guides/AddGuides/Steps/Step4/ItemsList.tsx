import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ItemsType } from "./types";
import { ItemSideBarMap } from "./types";
import ReactHtmlParser from "react-html-parser";

import { parseTextWithComponents } from "@/app/utils/RegexParser";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/app/components/ui/hover-card";
let checkSubset = (parentArray, subsetArray) => {
  return subsetArray.every((el) => {
    return parentArray.includes(el);
  });
};
const StyledText = ({ text, style }) => {
  return <p className={style}>{text}</p>; // Correctly accessing the `text` property
};
const ItemsList = ({
  itemData,
  summonerData,
  category,
  subCategories,
  find,
}) => {
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

  useEffect(() => {
    if (itemData === null) {
      return;
    }

    const keys = Object.keys(itemData);
    const tempArr = {};
    console.log("find", find);
    // Iterate over each key in itemData
    keys.forEach((key) => {
      tempArr[key] = itemData[key].filter((item) => {
        // Check if the item matches the selected category
        const categoryMatch =
          category === "all items" || item.tags.includes(category);

        const findMatch = item.name.toLowerCase().includes(find.toLowerCase());
        // Handle special case for "boots" and "nonbootsmovement" subcategory
        let subCategoryMatch = true;
        if (subCategories && subCategories.length > 0) {
          let tempSubCategories;
          if (key === "boots" && subCategories.includes("nonbootsmovement")) {
            tempSubCategories = subCategories.filter(
              (subCategory) => subCategory !== "nonbootsmovement"
            );
            tempSubCategories.push("boots");
          } else {
            tempSubCategories = subCategories;
          }
          subCategoryMatch = checkSubset(item.tags, tempSubCategories);
        }

        // Return true only if both category and subcategory conditions are met
        return categoryMatch && subCategoryMatch && findMatch;
      });
    });

    // Update the state with the filtered items
    setCategoriedItems(tempArr);
  }, [category, itemData, subCategories, find]);

  const ItemByGroup = ({
    items,
    groupName,
    visible,
    setVisible,
    name,
  }: {
    items: ItemsType[keyof ItemsType];
    groupName: string;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    name: string;
  }) => {
    return (
      <div className="flex flex-wrap w-full">
        <div
          onClick={() => setVisible(!visible)}
          className="w-full text-3xl font-bold mb-4 hover:cursor-pointer uppercase text-[#f4f3f0]"
        >
          {name}
        </div>
        {visible &&
          items[groupName].map((item) => {
            return (
              <HoverCard>
                <HoverCardTrigger>
                  <div
                    key={item.id}
                    className="hover:bg-[#4d4c4b] hover:bg-opacity-50 p-3 group hover:cursor-pointer"
                  >
                    <div>
                      <Image
                        src={`https://ddragon.leagueoflegends.com/cdn/${summonerData[0].version}/img/item/${item.image}`}
                        alt={item.name}
                        width={50}
                        height={50}
                        priority={false}
                        className="ring-1 ring-[#7e7e7e] group-hover:ring-offset-4 group-hover:ring-[#CDBD82]"
                      />
                      <div className="text-gray-300 font-sans text-center items-center">
                        {item.gold.total}
                      </div>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div>
                    <div className="flex flex-wrap gap-3">
                      <Image
                        src={`https://ddragon.leagueoflegends.com/cdn/${summonerData[0].version}/img/item/${item.image}`}
                        alt={item.name}
                        width={50}
                        height={50}
                        priority={false}
                        className="ring-1 ring-[#7e7e7e] object-cover "
                      />
                      <div>
                        <div className="text-gray-200 font-sans text-lg font-semibold">
                          {item.name}
                        </div>
                        <div className="text-[#CDBD82] font-sans text-lg font-semibold">
                          {item.gold.total} gold
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-500 font-sans mt-3">
                      {ReactHtmlParser(
                        parseTextWithComponents(item.description)
                      )}
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            );
          })}
      </div>
    );
  };

  return (
    <div className="w-full ">
      {categoriedItems && (
        <>
          <ItemByGroup
            items={categoriedItems}
            groupName="consumablesTrinkets"
            visible={consumablesTrinketsVisible}
            setVisible={setConsumablesTrinketsVisible}
            name="Consumables & Trinkets & Others"
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
