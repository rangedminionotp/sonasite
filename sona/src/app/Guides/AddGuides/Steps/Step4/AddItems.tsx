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
  const [category, setCategory] = useState<string>("");
  // const [categoriedItems, setCategoriedItems] = useState<ItemsType | null>(
  //   null
  // );
  const [subCategories, setSubCategories] = useState<string[] | null>(null);
  return (
    <div className="flex flex-col h-screen">
      {" "}
      {/* Ensure full height */}
      {itemData && summonerData && (
        <>
          {/* Top Bar */}
          <div className=" text-white p-4 fixed top-0 left-0 w-full z-10">
            <ItemsCategoryTopBar
              itemData={itemData}
              summonerData={summonerData}
              setCategory={setCategory}
              category={category}
            />
          </div>

          {/* Content and Sidebar */}
          <div className="flex flex-grow pt-16">
            {" "}
            {/* Added pt-16 to account for fixed top bar */}
            <aside className=" text-white w-64 p-4 fixed top-16 left-0 h-full z-20">
              <ItemsSidebar
                subCategories={subCategories}
                setSubCategories={setSubCategories}
              />
              {/* Divider below sidebar */}
            </aside>
            <main className="flex-grow ml-64 md:ml-0 p-4 overflow-auto ">
              {/* Divider above main content */}
              {/* Main content goes here */}
              <ItemsList
                itemData={itemData}
                summonerData={summonerData}
                category={category}
              />
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default AddItems;
