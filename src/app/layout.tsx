import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "ChaikaTravel — Hotel Room Selection",
  description: "Find and book the perfect hotel room",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
