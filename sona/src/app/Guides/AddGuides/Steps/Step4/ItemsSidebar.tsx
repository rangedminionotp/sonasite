import React from "react";
import { ItemSideBarNames, ItemSideBarTags, ItemSideBarMap } from "./types";
import { Divider } from "@mui/joy";
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
    console.log("subCategories", subCategories);
    // console.log("ItemSideBarMap", ItemSideBarMap[subCategory]);
  };
  return (
    <div>
      {ItemSideBarNames.map((items, index) => (
        <div key={index} className="mb-4">
          {/* Add a key for each group */}
          {items.map((item) => (
            <div
              key={item}
              onClick={() => handleSelect(item)}
              className={`cursor-pointer  text-xl px-5 hover:text-[#f4f3f0] font-sans mb-2 ${
                subCategories?.includes(ItemSideBarMap[item])
                  ? "text-[#f4f3f0]/80 bg-[#4d4c4b] bg-opacity-50"
                  : "text-[#CDBD82]/80"
              }`}
            >
              {item}
            </div>
          ))}
          {index !== ItemSideBarNames.length - 1 && <Divider />}
        </div>
      ))}
    </div>
  );
};

export default ItemsSidebar;
