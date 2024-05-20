"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import { IconButton } from "@mui/material";
import React, { useState } from "react";

import { Tooltip } from "@mui/joy";

export default function GmailLogin() {
  const { data: session } = useSession();
  React.useEffect(() => {
    if (session) {
      const data = {
        name: session.user.name,
        email: session.user.email,
      };
      localStorage.setItem("user", JSON.stringify(data));
    } else {
      localStorage.removeItem("user");
      signOut();
    }
  }, [session]);
  return (
    <>
      <Tooltip title="Login with Gmail" variant="solid">
        {/* {session ? <button onClick={() => signOut()}>Logout</button> : null} */}
        <IconButton onClick={() => signIn("google")}>
          <GoogleIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}
