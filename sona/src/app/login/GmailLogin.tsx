"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function GmailLogin() {
  //   const [session, loading] = useSession();
  //   return (
  //     <div>
  //       {!session ? (
  //         <button onClick={() => signIn("google")}>Sign in with Google</button>
  //       ) : (
  //         <>
  //           <p>Welcome, {session.user.name}</p>
  //           <button onClick={() => signOut()}>Sign out</button>
  //         </>
  //       )}
  //     </div>
  //   );
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
