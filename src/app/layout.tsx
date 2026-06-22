import type { Metadata } from "next";

import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
