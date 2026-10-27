
import type { Metadata } from "next";
import { Geist, Geist_Mono, Great_Vibes } from "next/font/google";
import NavigationBar from "@/components/wedding2/NavigationBar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Olivia & Thomas | Wedding Invitation",
  description: "Join us to celebrate our wedding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <NavigationBar />
        {children}
      </body>
    </html>
  );
}
