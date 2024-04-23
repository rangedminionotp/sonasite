import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sona Buvelle",
  description: "Made by https://www.twitch.tv/nannersowo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
