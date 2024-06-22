"use client";

import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";

// export const metadata: Metadata = {
//   title: "Sona Buvelle",
//   description: "Made by https://www.twitch.tv/nannersowo",
// };
type RootLayoutProps = {
  children: ReactNode;
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} `}>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
