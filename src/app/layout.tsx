import type { Metadata } from "next";
import { Jost } from "next/font/google";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "ChaikaTravel — Hotel Room Selection",
  description: "Find and book the perfect hotel room",
};

interface RootLayoutProps {
  /** Page content rendered inside the layout shell */
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${jost.className} flex min-h-screen flex-col bg-background`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
