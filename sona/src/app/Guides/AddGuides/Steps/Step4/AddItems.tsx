import React, { useState } from "react";
import ItemsList from "./ItemsList";
import ItemsNavbar from "./ItemsNavbar";
import ItemsCategoryTopBar from "./ItemsCategoryTopBar";
import { ItemsType } from "./types";
import ItemsSidebar from "./ItemsSidebar";
const AddItems = ({ itemData, summonerData, itemTree }) => {
  // return <ItemsList itemData={itemData} summonerData={summonerData} />
  const [selectedCategories, setSelectedCategories] = useState<string[] | null>(
    null
  );
  const [category, setCategory] = useState<string>("");
  // const [categoriedItems, setCategoriedItems] = useState<ItemsType | null>(
  //   null
  // );
  return (
    <div>
      {itemData && summonerData && (
        <>
          <ItemsCategoryTopBar
            itemData={itemData}
            summonerData={summonerData}
            setCategory={setCategory}
            category={category}
          />
          <ItemsSidebar />
        </>
      )}
      {/* <ItemsNavbar
        itemTree={itemTree}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      /> */}
    </div>
  );
};

export default AddItems;
