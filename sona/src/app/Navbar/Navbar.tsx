"use client";
import React from "react";
import Logo from "./Logo";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-scroll";
const Navbar = () => {
  const [nav, setNav] = React.useState(false);
  const handleClick = () => setNav(!nav);
  return (
    // <div className="bg-[#181818] shadow-gray-300 fixed w-full h-30 flex px-2 py-2 z-50 text-gray-300">
    <div className="fixed flex w-full h-30 bg-[#181818] shadow-gray-300 justify-between items-center px-2 py-2 z-50 text-gray-300">
      {/* logo */}
      <div>
        <Logo />
      </div>

      {/* menu */}
      <ul className="hidden md:flex">
        <li className="dark:text-gray-300 text-2xl hover:text-blue-500 px-2 py-2 hover:cursor-pointer">
          <Link to="intro" smooth={true} duration={200}>
            Intro
          </Link>
        </li>
        <li className="dark:text-gray-300 text-2xl hover:text-blue-500 px-2 py-2 hover:cursor-pointer">
          Abilities
        </li>
      </ul>

      {/* hamburger */}
      <div onClick={handleClick} className="md:hidden z-10">
        {!nav ? <FaBars /> : <FaTimes />}
      </div>

      {/* mobile menu */}
      <ul
        className={
          !nav
            ? "hidden"
            : "absolute top-0 left-0 w-full h-screen bg-[#181818] bg-opacity-90 flex flex-col justify-center items-center"
        }
      >
        <li className="py-6 text-4xl">Intro</li>
        <li className="py-6 text-4xl">Abilities</li>
      </ul>
    </div>
  );
};

export default Navbar;
