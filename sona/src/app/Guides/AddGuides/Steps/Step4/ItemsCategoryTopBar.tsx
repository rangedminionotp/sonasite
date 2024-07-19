import React, { useState } from "react";
import ItemsList from "./ItemsList";
import Image from "next/image";
const ItemsCategoryTopBar = ({
  itemData,
  summonerData,
  setCategory,
  category,
}) => {
  const topbarLabels = [
    "All Items",
    "Fighter",
    "Mage",
    "Assassin",
    "Support",
    "Tank",
    "Marksman",
  ];

  const topbarIcons = [
    "/RoleIcons/AllItems.svg",
    "/RoleIcons/Fighter.svg",
    "/RoleIcons/Mage.svg",
    "/RoleIcons/Assassin.svg",
    "/RoleIcons/Support.svg",
    "/RoleIcons/Tank.svg",
    "/RoleIcons/Marksman.svg",
  ];

  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearch = () => {
    console.log(search);
  };
  return (
    <div className="gap-2">
      {/* search component */}

      <div className="flex items-center justify-center gap-2"></div>

      {/* topbar labels */}
      {topbarLabels.map((label, index) => (
        <div
          onClick={() => {
            if (!category) {
              setCategory(label.toLowerCase());
            } else {
              setCategory("");
            }
          }}
          key={index}
          className={`cursor-pointer text-[#f4f3f0]/80  text-2xl px-5 hover:text-[#f4f3f0] font-sans  ${
            category === label.toLowerCase() ? "bg-[#888888]" : ""
          }`}
        >
          <div className="flex items-center gap-2">
            <Image
              src={topbarIcons[index]}
              className="hover:brightness-150 transition-all duration-100"
              width={30}
              height={30}
            />
            {label}
          </div>
        </div>
      ))}
      <ItemsList
        itemData={itemData}
        summonerData={summonerData}
        category={category}
        // categoriedItems={categoriedItems}
        // setCategoriedItems={setCategoriedItems}
      />
    </div>
  );
};

export default ItemsCategoryTopBar;
