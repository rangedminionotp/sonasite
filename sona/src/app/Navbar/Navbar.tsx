import React from "react";
import AppBar from "@mui/material/AppBar";
// import Abilities from "./Abilities";
// import Skins from "./Skins";
import Link from "react-scroll";

import Logo from "./Logo";

import { Element } from "react-scroll";
const Navbar = () => {
  return (
    <div className="flex">
      <div
        className="bg-[#181818] shadow-gray-300 fixed w-full h-30 flex px-2 py-2 z-50"
        name="navbar"
      >
        <nav>
          <div className="justify-between items-center flex gap-8 ">
            <Logo />
            <div className="dark:text-gray-300 text-2xl hover:text-blue-500 px-2 py-2 hover:cursor-pointer">
              Intro
            </div>
            {/* <Abilities />
          <Skins /> */}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
