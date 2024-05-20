import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const GmailStatus = () => {
  const { data: session, status } = useSession();

  return <div>{session ? <div>gmail loggedin</div> : null}</div>;
};

export default GmailStatus;
