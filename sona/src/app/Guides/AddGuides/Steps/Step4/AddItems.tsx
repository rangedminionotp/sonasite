import React from "react";
import ItemsList from "./ItemsList";
import ItemsNavbar from "./ItemsNavbar";
const AddItems = ({ itemData, summonerData, itemTree }) => {
  // return <ItemsList itemData={itemData} summonerData={summonerData} />
  return (
    <div>
      <ItemsNavbar itemTree={itemTree} />
    </div>
  );
};

export default AddItems;
