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
  title: "Govt Approved CCTV Installation in Hosur, Chennai & Bengaluru | Infysmart",
  description: "Premier Security System Installation Service in Tamil Nadu & Karnataka. Specialists in Industrial CCTV, Factory Surveillance, Solar 4G Cameras, and Biometric Access Control for TNPL, ACCET, and private enterprises.",
  keywords: [
    "Security system installation service", "CCTV Camera Installation", "Industrial CCTV Installation",
    "Factory Surveillance", "Solar Powered 4G CCTV", "IP Camera Setup", "Hikvision Dealer", "Dahua Dealer",
    "CP Plus Camera Dealer", "Wireless CCTV Cameras", "Biometric Access Control", "Burglar Alarms",
    "Video Door Phone", "Employee Monitoring Systems", "Perimeter Security", "AMC for CCTV",
    "Hosur", "Chennai", "Coimbatore", "Bengaluru", "Puducherry", "Cuddalore", "Karaikudi", "Dharmapuri"
  ],
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
                "Hosur", "Chennai", "Coimbatore", "Bangalore", "Dharmapuri", "Karaikudi", "Puducherry", "Cuddalore"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Security Services",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Industrial CCTV Installation" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Solar Powered 4G CCTV Cameras" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Biometric Access Control Systems" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Apartment Complex Security Systems" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hikvision & Dahua Camera Dealers" } }
                ]
              },
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
