"use client";

import { signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import { IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { Tooltip } from "@mui/joy";

export default function GmailLogin() {
  return (
    <>
      <Tooltip title="Login with Gmail" variant="solid">
        <IconButton
          onClick={() => signIn("google", { prompt: "select_account" })}
        >
          <GoogleIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}
