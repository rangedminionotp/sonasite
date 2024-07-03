"use client";
import { signIn, signOut, useSession } from "next-auth/react";

import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-scroll";
import LoginBtn from "./LoginBtn";
import UserDashboard from "./UserDashboard/UserDashboard";
import { Popover } from "@headlessui/react";
import { ScrollPosition } from "./ScrollPosition";
const Navbar = () => {
  const [nav, setNav] = useState(false);

  const { data: session, status } = useSession();
  const item = localStorage.getItem("user");
  const userLogin = JSON.parse(item);
  const [user, setUser] = useState(userLogin);
  useEffect(() => {
    if (status === "authenticated" && session.user) {
      // localStorage.setItem("user", JSON.stringify(data));
      // setUser(data);
      // add gmail user into local db ... idk >_>
      const query = {
        query: `mutation addGmailUser { addGmailUser(user: {
        name:"${session.user.name}",
        email: "${session.user.email}",
        roles: ["member"]
      })
      {id, name, email, password, ogPassword}}`,
      };
      fetch("/api/graphql", {
        method: "POST",
        body: JSON.stringify(query),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          if (json.errors) {
            console.log(json.errors);
            alert("Error signing up with gmail, please try again");
          } else {
            // localStorage.setItem("user", JSON.stringify(data));
            // setUser(data);
            const loginQuery = {
              query: `query login{login(email: "${json.data.addGmailUser.email}" password: "${json.data.addGmailUser.ogPassword}") { name, id, accessToken, email }}`,
            };
            fetch("/api/graphql", {
              method: "POST",
              body: JSON.stringify(loginQuery),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => {
                return res.json();
              })
              .then((json) => {
                if (json.errors) {
                  console.log(json.errors);
                  alert("Error logging in, please try again");
                } else {
                  localStorage.setItem("user", JSON.stringify(json.data.login));
                  setUser(json.data.login);
                }
              });
          }
        });
    } else if (status === "unauthenticated") {
      console.log(
        "User is not authenticated, removing user data from localStorage"
      );
      const item = localStorage.getItem("user");
      const userLogin = JSON.parse(item);
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

  const scrollPosition = ScrollPosition();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Popover
      className={classNames(
        scrollPosition > 0
          ? "shadow backdrop-saturate-200 backdrop-blur-sm"
          : "shadow-none",
        "sticky top-0 z-20 h-20 flex justify-between items-center px-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)] transition-shadow opacity-95 text-white max-w-full text-2xl font-bold"
      )}
    >
      <div>
        <Logo />
      </div>
      <ul className="hidden md:flex justify-between items-center">
        <div className="px-3 py-2 hover:cursor-pointer">
          {!user ? <LoginBtn /> : <UserDashboard setUser={setUser} />}
        </div>
        <li className=" hover:text-blue-500 px-3 py-2 hover:cursor-pointer hover:underline">
          <Link to="intro" smooth={true} duration={200}>
            Intro
          </Link>
        </li>
        <li className=" hover:text-blue-500 px-3 py-2 hover:cursor-pointer hover:underline">
          <Link to="abilities" smooth={true} duration={200}>
            Abilities
          </Link>
        </li>
        <li className=" hover:text-blue-500 px-3 py-2 hover:cursor-pointer hover:underline">
          <Link to="skins" smooth={true} duration={200}>
            Skins
          </Link>
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
          <Link to="skins" smooth={true} duration={200} onClick={handleClick}>
            Skins
          </Link>
        </li>
        {!user ? <LoginBtn /> : <UserDashboard setUser={setUser} />}
      </ul>
    </Popover>
  );
};

export default Navbar;
