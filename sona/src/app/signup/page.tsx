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
  Alert,
  IconButton,
} from "@mui/joy";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Signup = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  React.useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("signup");
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

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
      .then((res) => res.json())
      .then((json) => {
        if (json.errors) {
          setError("Error signing up, please try again");
        } else {
          localStorage.setItem("signup", "true");
          setSuccess(true);
          setTimeout(() => {
            router.push("/login");
          }, 2000); // Redirect after 2 seconds
        }
      });
  };

  const passwordsMatch =
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

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
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Signup successful! Redirecting to login...
          </Alert>
        )}
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
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
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
          <FormControl sx={{ mb: 3 }} className="relative">
            <FormLabel className="text-black">Confirm Password</FormLabel>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 px-3 py-2 border bg-gray-100 text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <IconButton
              onClick={() => setConfirmShowPassword(!showConfirmPassword)}
              sx={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
            {formData.confirmPassword && (
              <IconButton
                sx={{
                  position: "absolute",
                  right: 50,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                {passwordsMatch ? (
                  <CheckIcon style={{ color: "green" }} />
                ) : (
                  <CloseIcon style={{ color: "red" }} />
                )}
              </IconButton>
            )}
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
