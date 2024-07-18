import React, { useState } from "react";
import ItemsList from "./ItemsList";
import ItemsNavbar from "./ItemsNavbar";
import ItemsCategoryTopBar from "./ItemsCategoryTopBar";

const AddItems = ({ itemData, summonerData, itemTree }) => {
  // return <ItemsList itemData={itemData} summonerData={summonerData} />
  const [selectedCategories, setSelectedCategories] = useState<string[] | null>(
    null
  );

  return (
    <div>
      <ItemsCategoryTopBar />
      {/* <ItemsNavbar
        itemTree={itemTree}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      /> */}
      <ItemsList
        itemData={itemData}
        summonerData={summonerData}
        selectedCategories={selectedCategories}
      />
    </div>
  );
};

export default AddItems;
