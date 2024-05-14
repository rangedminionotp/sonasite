"use client";

import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
// export const metadata: Metadata = {
//   title: "Sona Buvelle",
//   description: "Made by https://www.twitch.tv/nannersowo",
// };
type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
