import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileStickyButton from "@/components/MobileStickyButton";
import AnnouncementBar from "@/components/AnnouncementBar";
import CartDrawer from "@/components/cart/CartDrawer";
import { CartProvider } from "@/lib/cart-context";
import { SessionProvider } from "next-auth/react";
import { directus } from "@/lib/directus";
import type { NotificationBar } from "@/lib/directus";
import { readSingleton } from "@directus/sdk";
import FramerProvider from "@/components/animations/FramerProvider";
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
    // Primary CCTV service keywords
    "CCTV installation service",
    "CCTV camera installation",
    "CCTV installation near me",
    "CCTV camera installation service",
    "security camera installation",
    "surveillance camera installation",
    "industrial CCTV installation",
    "factory surveillance system",
    "IP camera setup",
    "CCTV camera price",
    "buy CCTV camera online",
    "CCTV camera for home",
    "CCTV camera for office",
    "CCTV camera for shop",
    "CCTV repair service",
    "CCTV service center",
    // Solar & other services
    "Solar 4G CCTV camera",
    "solar panel installation",
    "biometric access control system",
    "fingerprint attendance machine",
    "face recognition access control",
    "video door phone installation",
    "IP video intercom",
    "gate motor automation",
    "rolling shutter motor",
    "boom barrier installation",
    "building automation system",
    "CCTV AMC service",
    "annual maintenance contract CCTV",
    "perimeter security system",
    "fire alarm installation",
    "burglar alarm system",
    // Brand/dealer keywords
    "Hikvision authorized dealer Tamil Nadu",
    "Hikvision dealer Chennai",
    "Dahua authorized dealer Chennai",
    "CP Plus dealer",
    "Honeywell security dealer",
    "Essl biometric dealer",
    "Matrix access control dealer",
    // Government / compliance
    "government approved CCTV vendor",
    "TNPL CCTV installation",
    "ACCET CCTV project",
    "PSU security vendor Tamil Nadu",
    "MSME registered security company",
    // Location keywords
    "CCTV installation Chennai",
    "CCTV installation Hosur",
    "CCTV installation Coimbatore",
    "CCTV installation Bangalore",
    "CCTV installation Dharmapuri",
    "CCTV installation Karaikudi",
    "CCTV installation Puducherry",
    "CCTV installation Tamil Nadu",
    "CCTV installer Chennai",
    "best CCTV company Chennai",
    "security system Tamil Nadu",
    "security system Karnataka",
    "SIPCOT industrial CCTV",
    "Ambattur industrial estate CCTV",
    "Sriperumbudur CCTV installation",
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
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  //
  // ──────────────────────────────────────────────────────────────────────────
  // GOOGLE SEARCH CONSOLE & BING WEBMASTER VERIFICATION
  // Steps:
  //   1. Go to https://search.google.com/search-console → Add property
  //      → choose "HTML tag" method → copy the content value from the meta tag
  //   2. Replace "PASTE_GOOGLE_TOKEN_HERE" below with that value, then uncomment.
  //   3. For Bing: https://www.bing.com/webmasters → Add site → HTML meta tag
  //      → Replace "PASTE_BING_TOKEN_HERE" with your Bing verification content value.
  //   4. After deploying, click "Verify" in both consoles.
  //   5. Submit sitemap: https://infysmart.com/sitemap.xml in both consoles.
  // ──────────────────────────────────────────────────────────────────────────
  //
  // verification: {
  //   google: "PASTE_GOOGLE_TOKEN_HERE",
  //   other: {
  //     "msvalidate.01": "PASTE_BING_TOKEN_HERE",
  //   },
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
        { "@type": "City", name: "Palacode" },
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
      sameAs: [
        "https://www.facebook.com/infysmart",
        "https://www.instagram.com/infysmart",
        "https://www.linkedin.com/company/infysmart",
        "https://g.co/kgs/infysmart",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "127",
        bestRating: "5",
        worstRating: "1",
      },
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

  let notificationBar: NotificationBar | null = null;
  try {
    notificationBar = await directus.request(readSingleton("notification_bar")) as NotificationBar;
  } catch {
    notificationBar = null;
  }

  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <SessionProvider>
        <CartProvider>
          <FramerProvider>
            {/* Organization + WebSite Schema — in body per Next.js App Router recommendation */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <AnnouncementBar bar={notificationBar} />
            <Navbar settings={settings} />
            {children}
            <Footer settings={settings} />
            <MobileStickyButton />
            {/* Global Cart Drawer — rendered outside page stack for correct z-index */}
            <CartDrawer />
          </FramerProvider>
        </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
