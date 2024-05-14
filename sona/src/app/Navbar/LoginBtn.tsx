import React from "react";
import Button from "@mui/joy/Button";
import { useRouter } from "next/navigation";
const LoginBtn = () => {
  const router = useRouter();
  return (
    <Button
      variant="outlined"
      color="neutral"
      className="text-black-200 bg-purple-300 hover:bg-red-500 text-lg py-2 px-4 rounded-lg"
      onClick={() => {
        router.push(
          "/login" // Use router.push from the useRouter hook
        );
      }}
    >
      Log In
    </Button>
  );
};

export default LoginBtn;
