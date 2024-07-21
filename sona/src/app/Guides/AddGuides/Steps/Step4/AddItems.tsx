import React, { useState } from "react";
import ItemsList from "./ItemsList";
import ItemsNavbar from "./ItemsNavbar";
import ItemsCategoryTopBar from "./ItemsCategoryTopBar";
import { ItemsType } from "./types";
import ItemsSidebar from "./ItemsSidebar";
import { Divider } from "@mui/joy";
const AddItems = ({ itemData, summonerData, itemTree }) => {
  // return <ItemsList itemData={itemData} summonerData={summonerData} />
  const [selectedCategories, setSelectedCategories] = useState<string[] | null>(
    null
  );
  const [category, setCategory] = useState<string>("all items");
  // const [categoriedItems, setCategoriedItems] = useState<ItemsType | null>(
  //   null
  // );
  const [subCategories, setSubCategories] = useState<string[] | null>(null);
  return (
    <div className="flex flex-col h-screen">
      {itemData && summonerData && (
        <>
          {/* Top Bar */}
          <div className="text-white p-4 fixed top-0 left-0 w-full z-10">
            <ItemsCategoryTopBar
              itemData={itemData}
              summonerData={summonerData}
              setCategory={setCategory}
              category={category}
            />
            <Divider className="bg-gray-600" />
          </div>

          {/* Content and Sidebar */}
          <div className="flex flex-grow pt-16">
            {/* Sidebar */}
            <aside className="text-white w-80 p-4 fixed top-20 left-0 h-full z-20 items-center justify-center">
              <ItemsSidebar
                subCategories={subCategories}
                setSubCategories={setSubCategories}
              />
              <Divider
                orientation="vertical"
                flexItem
                className="bg-gray-600 ml-80"
              />
            </aside>

            {/* Main content */}
            <main className="flex-grow ml-80 overflow-auto">
              <ItemsList
                itemData={itemData}
                summonerData={summonerData}
                category={category}
                subCategories={subCategories}
              />
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default AddItems;
