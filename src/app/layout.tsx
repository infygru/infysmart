import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileStickyButton from "@/components/MobileStickyButton";
import { directus } from "@/lib/directus";
import { readSingleton } from "@directus/sdk";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://infysmart.com"),
  title: {
    default: "Govt Approved CCTV Installation in Hosur, Chennai & Bengaluru | Infysmart",
    template: "%s | Infysmart",
  },
  description:
    "Govt-approved security system provider in Tamil Nadu & Karnataka. Expert CCTV installation, Solar 4G cameras, biometric access control & video door phones for industrial, commercial, and government projects in Chennai, Hosur, Coimbatore & Bangalore.",
  keywords: [
    "CCTV installation Chennai",
    "CCTV installation Hosur",
    "CCTV installation Coimbatore",
    "CCTV installation Bangalore",
    "Security system installation Tamil Nadu",
    "Industrial CCTV installation",
    "Factory surveillance system",
    "Solar 4G CCTV camera",
    "IP camera installation",
    "Hikvision authorized dealer",
    "Dahua authorized dealer",
    "CP Plus dealer",
    "Biometric access control",
    "Video door phone installation",
    "CCTV AMC service",
    "Government approved CCTV vendor",
    "TNPL CCTV installation",
    "ACCET CCTV project",
    "Building automation system",
    "Perimeter security system",
  ],
  authors: [{ name: "Infysmart", url: "https://infysmart.com" }],
  creator: "Infysmart - Infygru Private Limited",
  publisher: "Infysmart",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://infysmart.com",
    siteName: "Infysmart",
    title: "Govt Approved CCTV Installation in Hosur, Chennai & Bengaluru | Infysmart",
    description:
      "Govt-approved security system provider in Tamil Nadu & Karnataka. Expert CCTV, Solar 4G cameras, biometric access control & automation for industrial, commercial, and government clients.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Infysmart — Security & Technology Solutions",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Govt Approved CCTV Installation in Hosur, Chennai & Bengaluru | Infysmart",
    description:
      "Expert CCTV, Solar 4G cameras, biometric access control & automation across Tamil Nadu & Karnataka.",
    images: ["/og-image.png"],
    creator: "@infysmart",
  },
  alternates: {
    canonical: "https://infysmart.com",
  },
  // Add your Google Search Console verification token here:
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_TOKEN",
  //   other: { "msvalidate.01": "YOUR_BING_VERIFICATION_TOKEN" },
  // },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://infysmart.com/#organization",
      name: "Infysmart",
      legalName: "Infygru Private Limited",
      url: "https://infysmart.com",
      logo: {
        "@type": "ImageObject",
        "@id": "https://infysmart.com/#logo",
        url: "https://infysmart.com/logo.png",
        contentUrl: "https://infysmart.com/logo.png",
        caption: "Infysmart Logo",
      },
      image: "https://infysmart.com/og-image.png",
      description:
        "Government-approved vendor for Industrial CCTV, Solar Power, Biometric Access Control, and Security Automation systems across Tamil Nadu and Karnataka.",
      telephone: "+919445675619",
      email: "info@infysmart.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hosur",
        addressRegion: "Tamil Nadu",
        postalCode: "635109",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "12.7409",
        longitude: "77.8253",
      },
      areaServed: [
        { "@type": "City", name: "Hosur" },
        { "@type": "City", name: "Chennai" },
        { "@type": "City", name: "Coimbatore" },
        { "@type": "City", name: "Bangalore" },
        { "@type": "City", name: "Dharmapuri" },
        { "@type": "City", name: "Karaikudi" },
        { "@type": "City", name: "Puducherry" },
        { "@type": "City", name: "Cuddalore" },
        { "@type": "State", name: "Tamil Nadu" },
        { "@type": "State", name: "Karnataka" },
      ],
      priceRange: "₹₹",
      currenciesAccepted: "INR",
      paymentAccepted: "Cash, Bank Transfer, UPI, Cheque",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Security & Technology Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Industrial CCTV Installation",
              url: "https://infysmart.com/cctv",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Solar Powered 4G CCTV Cameras",
              url: "https://infysmart.com/solar",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Biometric Access Control Systems",
              url: "https://infysmart.com/services/biometric-systems",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Video Door Phone Systems",
              url: "https://infysmart.com/services/video-door-phones",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Annual Maintenance Contract (AMC)",
              url: "https://infysmart.com/amc",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Building Automation Systems",
              url: "https://infysmart.com/automation",
            },
          },
        ],
      },
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": "https://infysmart.com/#website",
      url: "https://infysmart.com",
      name: "Infysmart — Security & Technology Solutions",
      description:
        "Government-approved CCTV, Solar, and Security systems provider in Tamil Nadu & Karnataka.",
      publisher: { "@id": "https://infysmart.com/#organization" },
      inLanguage: "en-IN",
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings;
  try {
    settings = await directus.request(readSingleton("global_settings"));
  } catch (error) {
    console.error("Failed to fetch global settings:", error);
    settings = null;
  }

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.infysmart.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://www.transparenttextures.com" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Organization + WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={inter.className}>
        <Navbar settings={settings} />
        {children}
        <Footer settings={settings} />
        <MobileStickyButton />
      </body>
    </html>
  );
}
