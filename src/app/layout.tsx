import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // Import the new client navbar
import Footer from "@/components/Footer"; // Import the Footer component
import MobileStickyButton from "@/components/MobileStickyButton"; // Import sticky button
import { directus } from "@/lib/directus";
import { readSingleton } from "@directus/sdk";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Govt Approved CCTV Installation in Hosur & Chennai | Infysmart",
  description: "Infysmart is a Tamil Nadu Govt registered vendor for Industrial CCTV & Security Systems. Serving TNPL, ACCET, and factories in Hosur/Chennai.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch settings once on the server side
  let settings;
  try {
    settings = await directus.request(readSingleton('global_settings'));
  } catch (error) {
    console.error("Failed to fetch global settings:", error);
    settings = null;
  }

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SecuritySystem",
              "name": "Infysmart",
              "alternateName": "Infygru Private Limited",
              "telephone": "+919445675619",
              "url": "https://infysmart.com",
              "image": "https://infysmart.com/logo.png",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "Tamil Nadu",
                "addressCountry": "IN"
              },
              "areaServed": [
                "Hosur", "Chennai", "Coimbatore", "Bangalore", "Dharmapuri", "Karaikudi"
              ],
              "priceRange": "₹₹",
              "description": "Government approved vendor for Industrial CCTV & Security Systems."
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Pass settings as props to the Client Component Navbar */}
        <Navbar settings={settings} />
        {children}
        <Footer settings={settings} />
        <MobileStickyButton />
      </body>
    </html>
  );
}
