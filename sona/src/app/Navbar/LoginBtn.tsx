import React from "react";
import Button from "@mui/joy/Button";
import { useRouter } from "next/navigation";
const LoginBtn = () => {
  const router = useRouter();
  return (
    <button
      className="text-lg py-2 px-4 rounded-lg border border-purple-300 text-black bg-purple-300 hover:bg-red-500 transition duration-300 ease-in-out transform hover:scale-105"
      onClick={() => {
        router.push("/login");
      }}
    >
      Login
    </button>
  );
};

export default LoginBtn;
