"use client";
import { signIn, signOut, useSession } from "next-auth/react";

import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-scroll";
import LoginBtn from "./LoginBtn";
import UserDashboard from "./UserDashboard/UserDashboard";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [user, setUser] = useState(null);
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated" && session.user) {
      const data = {
        name: session.user.name,
        email: session.user.email,
      };
      console.log("User is authenticated and session data is available:", data);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    } else if (status === "unauthenticated") {
      console.log(
        "User is not authenticated, removing user data from localStorage"
      );
      localStorage.removeItem("user");
      setUser(null);
    }
  }, [status, session]);

  const handleStorageChange = () => {
    const item = localStorage.getItem("user");
    if (item) {
      setUser(JSON.parse(item));
    } else {
      setUser(null);
    }
  };

  const handleClick = () => setNav(!nav);

  return (
    <div className="fixed flex w-full h-30 bg-[#181818] shadow-gray-300 justify-between items-center px-2 py-2 z-50 text-gray-300">
      <div>
        <Logo />
      </div>
      <ul className="hidden md:flex justify-between items-center">
        <div className="dark:text-gray-300 px-3 py-2 hover:cursor-pointer">
          {!user ? <LoginBtn /> : <UserDashboard />}
        </div>
        <li className="dark:text-gray-300 text-2xl hover:text-blue-500 px-3 py-2 hover:cursor-pointer">
          <Link to="intro" smooth={true} duration={200}>
            Intro
          </Link>
        </li>
        <li className="dark:text-gray-300 text-2xl hover:text-blue-500 px-3 py-2 hover:cursor-pointer">
          <Link to="abilities" smooth={true} duration={200}>
            Abilities
          </Link>
        </li>
        <li className="dark:text-gray-300 text-2xl hover:text-blue-500 px-3 py-2 hover:cursor-pointer">
          Skins
        </li>
      </ul>
      <div
        onClick={handleClick}
        className="md:hidden z-10 hover:cursor-pointer"
      >
        {!nav ? <FaBars /> : <FaTimes />}
      </div>
      <ul
        className={
          !nav
            ? "hidden"
            : "absolute top-0 left-0 w-full h-screen bg-[#181818] bg-opacity-90 flex flex-col justify-center items-center"
        }
      >
        <li className="py-6 text-4xl hover:cursor-pointer hover:text-blue-500">
          <Link to="intro" onClick={handleClick} smooth={true} duration={200}>
            Intro
          </Link>
        </li>
        <li className="py-6 text-4xl hover:cursor-pointer hover:text-blue-500">
          <Link
            to="abilities"
            onClick={handleClick}
            smooth={true}
            duration={200}
          >
            Abilities
          </Link>
        </li>
        <li className="py-6 text-4xl hover:cursor-pointer hover:text-blue-500">
          Skins
        </li>
        {!user ? <LoginBtn /> : <UserDashboard />}
      </ul>
    </div>
  );
};

export default Navbar;
