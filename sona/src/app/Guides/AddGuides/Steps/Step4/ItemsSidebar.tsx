import React from "react";
import { ItemSideBarNames, ItemSideBarTags } from "./types";
const ItemsSidebar = () => {
  return (
    <div>
      {ItemSideBarNames.map((item) => {
        return (
          <div
            key={item}
            className="cursor-pointer text-[#f4f3f0]/80  text-2xl px-5 hover:text-[#f4f3f0] font-sans"
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default ItemsSidebar;
