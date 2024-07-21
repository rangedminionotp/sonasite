import React from "react";
import { ItemSideBarNames, ItemSideBarTags, ItemSideBarMap } from "./types";
import { Divider } from "@mui/joy";
import Image from "next/image";
const ItemsSidebar = ({ subCategories, setSubCategories }) => {
  const handleSelect = (subCategory) => {
    if (subCategories) {
      if (subCategories.includes(ItemSideBarMap[subCategory])) {
        setSubCategories(
          subCategories.filter((c) => c !== ItemSideBarMap[subCategory])
        );
      } else {
        setSubCategories([ItemSideBarMap[subCategory], ...subCategories]);
      }
    } else {
      setSubCategories([ItemSideBarMap[subCategory]]);
    }
  };
  const tagNames = [
    "AttackDamage",
    "CritChance",
    "AttackSpeed",
    "ArmorPenetration",
    "On-Hit",
    "LifeSteal",
    "AbilityPower",
    "Mana",
    "MagicPenetration",
    "Health",
    "Armor",
    "MagicResist",
    "AbilityHaste",
    "MovementSpeed",
    "Omni-Vamp",
    "ManaRegen",
  ];
  let counter = -1;
  return (
    <div>
      {ItemSideBarNames.map((items, index) => (
        <div key={index} className="mb-4">
          {/* Add a key for each group */}
          {items.map((item, index2) => {
            counter += 1;
            return (
              <div
                onClick={() => handleSelect(item)}
                key={`${index}-${index2}`}
                className={`flex flex-wrap gap-2 group transition-all font-sans hover:cursor-pointer text-xl hover:text-[#f4f3f0] mb-2 duration-100 items-center justify-center ${
                  subCategories?.includes(ItemSideBarMap[item])
                    ? "text-[#f4f3f0]/80 bg-[#4d4c4b] bg-opacity-50"
                    : "text-[#CDBD82]/80"
                }
                  `}
              >
                <Image
                  src={`/TagIcons/${tagNames[counter]}.svg`}
                  alt={tagNames[counter]}
                  width={20}
                  height={20}
                  className={`group-hover:brightness-150 hover:cursor-pointer transition-all duration-100 ${
                    subCategories?.includes(ItemSideBarMap[item])
                      ? "brightness-150"
                      : ""
                  }`}
                />
                {item}
              </div>
            );
          })}
          {index !== ItemSideBarNames.length - 1 && <Divider />}
        </div>
      ))}
    </div>
  );
};

export default ItemsSidebar;
