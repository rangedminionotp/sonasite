"use client";

import React from "react";
import Router from "next/router";
import Avatar from "@mui/joy/Avatar";
import Button from "@mui/joy/Button";
import { IconButton } from "@mui/material";
import LogoutBtn from "./LogoutBtn";
import UserInfo from "./UserInfo";
import { useCookies } from "react-cookie";

const UserDashboard = ({ setUser }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [cookies, setCookie] = useCookies(["user"]);
  const user = cookies.user;
  return (
    <div className="relative inline-block">
      <div>
        <IconButton
          // onMouseEnter={() => setIsMenuOpen(true)}
          // onMouseLeave={() => setIsMenuOpen(false)}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full focus:outline-none transition-transform ${
            isMenuOpen ? "scale-150" : ""
          }`}
        >
          <Avatar>{user ? user.name[0] : null}</Avatar>
        </IconButton>
      </div>

      {isMenuOpen && (
        <div
          // onMouseEnter={() => setIsMenuOpen(true)}
          // onMouseLeave={() => setIsMenuOpen(false)}
          className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 bg-gray-700"
        >
          <div className="py-2">
            <UserInfo user={user} />
            <LogoutBtn setUser={setUser} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
