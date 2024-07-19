import React from "react";
import { ItemSideBarNames, ItemSideBarTags } from "./types";
import { Divider } from "@mui/joy";
const ItemsSidebar = ({ subCategories, setSubCategories }) => {
  const handleSelect = (subCategory) => {
    if (subCategories.includes(subCategory)) {
      setSubCategories(subCategories.filter((c) => c !== subCategory));
    } else {
      setSubCategories([subCategory, ...subCategories]);
    }
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
              className="cursor-pointer text-[#f4f3f0]/80 text-xl px-5 hover:text-[#f4f3f0] font-sans mb-2"
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
