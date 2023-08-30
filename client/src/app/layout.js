"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider activeChain={Sepolia}>{children}</ThirdwebProvider>
      </body>
    </html>
  );
}
