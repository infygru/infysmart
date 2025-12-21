import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // Import the new client navbar
import { directus } from "@/lib/directus";
import { readSingleton } from "@directus/sdk";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Infysmart | Enterprise Security & Automation",
  description: "An unit of Infygru Private Limited",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch settings once on the server side
  const settings = await directus.request(readSingleton('global_settings'));

  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {/* Pass settings as props to the Client Component Navbar */}
        <Navbar settings={settings} />
        {children}
        {/* Add Footer here later */}
      </body>
    </html>
  );
}
