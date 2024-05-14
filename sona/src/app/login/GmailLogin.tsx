"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import { IconButton } from "@mui/material";

import { Tooltip } from "@mui/joy";

export default function GmailLogin() {
  const { data: session } = useSession();
  //   if (session) {
  //     return (
  //       <>
  //         Signed in as {session.user.email} <br />
  //         <button onClick={() => signOut()}>Sign out</button>
  //       </>
  //     );
  //   }
  return (
    <>
      <Tooltip title="Login with Gmail" variant="solid">
        <IconButton onClick={() => signIn("google")}>
          <GoogleIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}
