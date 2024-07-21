import React, { useState } from "react";
import ItemsList from "./ItemsList";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import { Input, InputAdornment } from "@mui/joy";

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
    <nav className=" text-white p-4 flex justify-center items-center left-0 w-full   ">
      <div className="flex items-center justify-center gap-2">
        {/* search component */}
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center relative w-full max-w-xs">
            {/* Input field */}

            <Input
              placeholder="Search..."
              sx={{
                bgcolor: "transparent", // Transparent background
                color: "white", // Text color
                border: "1px solid transparent", // No visible border
                "& .MuiInputAdornment-root": {
                  color: "white", // Icon color
                },
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.1)", // Slight background on hover
                },
                "& .MuiInputBase-root": {
                  paddingLeft: 3, // Padding to make space for the icon
                },
              }}
              endDecorator={<SearchIcon />}
            />
          </div>
        </div>

        {/* topbar labels */}
        {topbarLabels.map((label, index) => (
          <div
            onClick={() => {
              if (category === label.toLowerCase()) {
                setCategory("all items");
              } else {
                setCategory(label.toLowerCase());
              }
            }}
            key={index}
            className={`cursor-pointer text-[#f4f3f0]/80  text-xl px-5 hover:text-[#f4f3f0] group font-sans transition-all duration-100 ${
              category === label.toLowerCase()
                ? "bg-[#888888] text-[#f4f3f0]"
                : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <Image
                src={topbarIcons[index]}
                className={` group-hover:brightness-150 transition-all duration-100 ${
                  category === label.toLowerCase() ? "brightness-150" : ""
                }`}
                width={30}
                height={30}
              />
              {label}
            </div>
          </div>
        ))}
        {/*   */}
      </div>
    </nav>
  );
};

export default ItemsCategoryTopBar;
