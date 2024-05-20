"use client";
import React, { useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Typography,
  IconButton,
} from "@mui/joy";
import Card from "@mui/joy/Card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "../Navbar/Logo";
import GmailLogin from "./GmailLogin";
import Head from "next/head";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

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
      query: `query login{login(email: "${user.email}" password: "${user.password}") { name, id, accessToken, email }}`,
    };
    fetch("/api/graphql", {
      method: "POST",
      body: JSON.stringify(query),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.errors) {
          alert("Error logging in, please try again");
        } else {
          localStorage.setItem("user", JSON.stringify(json.data.login));
          router.push("/");
          console.log("logged in");
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-blue-500">
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex-grow flex flex-col items-center justify-center space-y-4">
        <Box
          sx={{
            width: 400,
            p: 4,
            bgcolor: "white",
            boxShadow: "lg",
            borderRadius: "md",
          }}
        >
          <Typography
            component="h1"
            gutterBottom
            className="text-center text-gray-800 text-2xl font-bold"
          >
            Log In
          </Typography>
          <Typography
            component="p"
            className="text-center text-gray-600 mb-4 text-sm"
          >
            Welcome to Nanners' Sona website \(￣︶￣*\) not susge at all btw
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ mb: 3 }}>
              <FormLabel className="text-black">Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
                className="mt-1 px-3 py-2 border bg-gray-100 text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </FormControl>
            <FormControl sx={{ mb: 3 }}>
              <FormLabel className="text-black">Password</FormLabel>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={user.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
                className="mt-1 px-3 py-2 border bg-gray-100 text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                sx={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </FormControl>
            <Button
              type="submit"
              sx={{ width: "100%", py: 1.5 }}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md shadow-sm"
            >
              Log In
            </Button>
          </form>
          <Button
            variant="outlined"
            color="neutral"
            fullWidth
            onClick={() => router.push("/")}
            className="mt-3"
          >
            Cancel
          </Button>
          <Button
            onClick={() => router.push("/signup")}
            variant="soft"
            color="neutral"
            fullWidth
            className="mt-3"
          >
            Not a Sona main yet? Click to join the family o(=•ェ•=)m
          </Button>
        </Box>
        <div className="flex items-center justify-center w-full max-w-lg my-6">
          <hr className="flex-grow border-gray-300" />
          <div className="px-4 text-gray-200">OR</div>
          <hr className="flex-grow border-gray-300" />
        </div>
        <GmailLogin />
      </div>
    </div>
  );
};

export default Login;
