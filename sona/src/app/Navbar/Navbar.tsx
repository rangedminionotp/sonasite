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

  const { data: session, status } = useSession();
  const item = localStorage.getItem("user");
  const userLogin = JSON.parse(item);
  const [user, setUser] = useState(userLogin);
  useEffect(() => {
    if (status === "authenticated" && session.user) {
      console.log(
        "User is authenticated and session data is available:",
        session.user
      );
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
            console.log("return value", json.data.addGmailUser);
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
                  router.push("/");
                  console.log("logged in");
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

  return (
    <div className="fixed flex w-full h-30 bg-[#181818] shadow-gray-300 justify-between items-center px-2 py-2 z-50 text-gray-300">
      <div>
        <Logo />
      </div>
      <ul className="hidden md:flex justify-between items-center">
        <div className="dark:text-gray-300 px-3 py-2 hover:cursor-pointer">
          {!user ? <LoginBtn /> : <UserDashboard setUser={setUser} />}
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
    </div>
  );
};

export default Navbar;
