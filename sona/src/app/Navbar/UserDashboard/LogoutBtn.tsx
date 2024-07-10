"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/joy/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { signIn, signOut, useSession } from "next-auth/react";
import { useCookies } from "react-cookie";

const LogoutBtn = ({ setUser }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const logout = async () => {
    try {
      await signOut({ redirect: false }); // Sign out server-side first
      removeCookie("user"); // Remove user cookie
      setUser(null); // Clear user state
      router.push("/"); // Redirect to home page
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <div className="text-left">
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
