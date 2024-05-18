"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/joy/Button";
import LogoutIcon from "@mui/icons-material/Logout";

const LogoutBtn = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("user");
    router.push({
      pathname: "/",
    });
  };

  return (
    <div>
      <button
        onClick={logout}
        className="w-full hover:bg-gray-300 text-white py-2 px-4 rounded-md flex items-center text-xl"
      >
        <LogoutIcon className="mr-2" />
        Logout
      </button>
    </div>
  );
};

export default LogoutBtn;
