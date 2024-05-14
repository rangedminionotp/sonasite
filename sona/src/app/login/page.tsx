"use client";
import React from "react";
import { Button, Input, Typography } from "@mui/joy";
import Card from "@mui/joy/Card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "../Navbar/Logo";
import GmailLogin from "./GmailLogin";

const login = () => {
  const router = useRouter();

  const [user, setUser] = React.useState({ email: "", password: "" });

  React.useEffect(() => {
    localStorage.removeItem("user");
  }, []);

  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = {
      query: `query login{login(email: "${user.email}" password: "${user.password}") { name, id, accessToken }}`,
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
          console.log(json);
          alert("Error logging in, please try again");
        } else {
          localStorage.setItem("user", JSON.stringify(json.data.login));
          router.push("/");
          console.log("logged in");
        }
      });
  };
  return (
    <div className="flex flex-col h-screen bg-gray-400 ">
      {/* Login Form */}
      <div className="flex-grow flex items-center justify-center bg-gray-700">
        <Card variant="plain" className="  bg-gray-400 w-full max-w-lg">
          <Typography class="text-2xl items-center justify-center flex">
            Log In
          </Typography>
          <Typography class="text-md items-center justify-center flex">
            Welcome to Nanners' Sona website \(￣︶￣*\) not susge at all btw
          </Typography>
          <Input
            color="neutral"
            type="email"
            name="email"
            label="Email Address"
            placeholder="Enter your email"
            fullWidth
            value={user.email}
            onChange={handleInputChange}
            className="bg-gray-100 dark:bg-gray-300"
          />

          <Input
            color="neutral"
            type="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
            fullWidth
            value={user.password}
            margin="normal"
            onChange={handleInputChange}
            className="bg-gray-100 dark:bg-gray-300"
          />

          <Button
            className=" "
            onClick={handleSubmit}
            variant="outlined"
            color="neutral"
          >
            Log In
          </Button>
          <Button
            variant="outlined"
            color="neutral"
            className=" "
            sx={{ mt: 0, mb: 2 }}
            onClick={() => {
              router.push(
                "/" // Use router.push from the useRouter hook
              );
            }}
          >
            Cancel
          </Button>
          {/* <Button
            onClick={() => {
              router.push(
                "/signup" // Use router.push from the useRouter hook
              );
            }}
            variant="soft"
            color="neutral"
            className="dark:text-gray-300 dark:hover:bg-black"
          >
            {"Don't have an account? Sign Up"}
          </Button> */}
        </Card>
        <GmailLogin />
      </div>
    </div>
  );
};

export default login;
