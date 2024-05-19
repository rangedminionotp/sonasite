"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Typography,
} from "@mui/joy";

const Signup = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  React.useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("signup");
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const query = {
      query: `mutation addUser { addUser(user: {
        name:"${formData.name}",
        email: "${formData.email}",
        password: "${formData.password}",
        roles: ["member"]
      })
      {id, name, email}}`,
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
      .then(() => {
        localStorage.setItem("signup", "true");
        router.push("/");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-blue-500">
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
          level="h4"
          component="h1"
          gutterBottom
          className="text-center text-gray-800"
        >
          Sign Up
        </Typography>
        <Typography
          component="p"
          className="text-center text-gray-600 mb-4 text-sm"
        >
          Welcome to Nanners' Sona website \(￣︶￣*\) not susge at all btw
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl sx={{ mb: 3 }}>
            <FormLabel className="text-black">Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="mt-1 px-3 py-2 border bg-gray-100 text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </FormControl>
          <FormControl sx={{ mb: 3 }}>
            <FormLabel className="text-black">Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="mt-1 px-3 py-2 border text-black bg-gray-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </FormControl>
          <FormControl sx={{ mb: 3 }}>
            <FormLabel className="text-black">Password</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 px-3 py-2 border bg-gray-100 text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </FormControl>
          <FormControl sx={{ mb: 3 }}>
            <FormLabel className="text-black">Confirm Password</FormLabel>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 px-3 py-2 border bg-gray-100 text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </FormControl>
          <Button
            type="submit"
            sx={{ width: "100%", py: 1.5 }}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md shadow-sm"
          >
            Sign Up
          </Button>
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
            onClick={() => router.push("/login")}
            variant="soft"
            color="neutral"
            fullWidth
            className="mt-3 text-black"
          >
            Already a Sona main? Click here to login
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default Signup;
