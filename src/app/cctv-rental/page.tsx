import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/animations/FadeIn';
import {
    Camera,
    CheckCircle2,
    Clock,
    Shield,
    Wifi,
    Users,
    Music,
    Building2,
    Zap,
    Phone,
    Star,
    MapPin,
    CalendarCheck,
    MonitorPlay,
    Headphones,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "CCTV Camera Rental for Events & Parties in Chennai, Bangalore | Infysmart",
    description: "Rent CCTV cameras for events, parties, concerts, weddings & exhibitions in Chennai, Hosur & Bangalore. Professional HD surveillance rental from ₹1,499/day. Setup & live monitoring included.",
    keywords: [
        "CCTV rental for events",
        "CCTV camera hire Chennai",
        "security camera rental party",
        "temporary CCTV installation",
        "event surveillance rental",
        "CCTV rental for concerts",
        "wedding CCTV rental Chennai",
        "camera rental Bangalore",
        "temporary security cameras Hosur",
        "IP camera rental Tamil Nadu",
        "event security camera rental",
        "CCTV rental per day",
        "surveillance camera rental India",
        "outdoor CCTV hire event",
        "mobile CCTV unit rental",
    ],
    alternates: { canonical: 'https://infysmart.com/cctv-rental' },
    openGraph: {
        title: "CCTV Camera Rental for Events & Parties | Infysmart",
        description: "Professional HD CCTV rental for events, concerts & parties. Packages from ₹1,499/day with installation & live monitoring. Chennai, Hosur & Bangalore.",
        url: 'https://infysmart.com/cctv-rental',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CCTV Camera Rental for Events by Infysmart' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: "CCTV Camera Rental for Events | Infysmart",
        description: "HD CCTV rental packages for events, parties & concerts starting ₹1,499/day. Includes setup & monitoring.",
        images: ['/og-image.png'],
    },
};

export const revalidate = 3600;

const rentalPackages = [
    {
        name: "Starter",
        ideal: "House Parties & Small Gatherings",
        price: "₹1,499",
        unit: "/day",
        cameras: "4 HD Cameras",
        features: [
            "4 × 2MP Full-HD IP Cameras",
            "1 × 4-Channel NVR Recorder",
            "Local storage (32GB SD backup)",
            "Mobile live-view setup",
            "Professional installation & removal",
            "Up to 8-hour event coverage",
        ],
        color: "blue",
        badge: null,
    },
    {
        name: "Standard",
        ideal: "Weddings, Exhibitions & Corporate Events",
        price: "₹3,499",
        unit: "/day",
        cameras: "8 HD Cameras",
        features: [
            "8 × 4MP Super-HD IP Cameras",
            "1 × 8-Channel NVR + 1TB HDD",
            "Wide-angle + PTZ cameras",
            "Dedicated on-site technician",
            "Real-time remote monitoring",
            "Up to 12-hour event coverage",
            "Incident clip export within 30 mins",
        ],
        color: "orange",
        badge: "Most Popular",
    },
    {
        name: "Premium",
        ideal: "Concerts, Large Venues & Multi-Day Events",
        price: "₹7,499",
        unit: "/day",
        cameras: "16 HD Cameras",
        features: [
            "16 × 5MP Full-HD IP Cameras",
            "4K PTZ crowd-monitoring cameras",
            "2 × NVR + 4TB redundant storage",
            "Dedicated 2-technician crew",
            "4G/LTE mobile surveillance unit",
            "Live feed dashboard for organiser",
            "Video report & incident log",
            "Up to 24-hour multi-shift coverage",
        ],
        color: "purple",
        badge: "Best Value",
    },
];

const useCases = [
    { icon: Music, title: "Concerts & Live Shows", desc: "Stage perimeter security, crowd flow monitoring and backstage access control for open-air or indoor concerts." },
    { icon: Users, title: "Weddings & Receptions", desc: "Capture and secure every moment. Entrance tracking, parking surveillance and hall monitoring for peace of mind." },
    { icon: Building2, title: "Exhibitions & Trade Fairs", desc: "Stall security, visitor flow analytics and overnight footage retention for 2–5 day expos." },
    { icon: Zap, title: "Corporate & Product Launches", desc: "Boardroom perimeter, press area monitoring and access-restricted zones for high-profile events." },
    { icon: CalendarCheck, title: "Festivals & Cultural Events", desc: "Wide-area outdoor coverage for community festivals, temple events and public gatherings." },
    { icon: Shield, title: "Sports & Stadium Events", desc: "Perimeter fencing surveillance, crowd crush detection and VIP zone monitoring." },
];

const faqs = [
    {
        q: "How far in advance should I book CCTV rental for an event?",
        a: "We recommend booking at least 48–72 hours in advance to ensure equipment availability and allow our team to conduct a site survey. For large events (500+ attendees) or multi-day bookings, contact us 5–7 days ahead.",
    },
    {
        q: "What is included in the rental price?",
        a: "All packages include equipment (cameras, NVR, cables, power adapters), professional installation at your venue, configuration of mobile live-view access, and removal after the event. Higher tiers include a dedicated on-site technician and remote monitoring.",
    },
    {
        q: "Can I get a live feed on my phone during the event?",
        a: "Yes. We configure the NVR's mobile app (Hik-Connect / DMSS) on your smartphone before the event begins, so you can monitor all camera feeds in real-time from anywhere on the premises.",
    },
    {
        q: "Do you provide outdoor weatherproof cameras?",
        a: "Absolutely. All our rental cameras are IP66-rated weatherproof units suitable for outdoor events, tents, and open venues. We also carry 4G-enabled mobile surveillance units for venues without a stable internet connection.",
    },
    {
        q: "What if a camera malfunctions during the event?",
        a: "Our Standard and Premium packages include an on-site technician who can swap faulty hardware immediately. For Starter packages, our support team provides remote troubleshooting within 30 minutes, with a hardware replacement guarantee within 2 hours.",
    },
    {
        q: "How is the footage handled after the event?",
        a: "All footage is stored on the NVR hard drive. After the event, we can export specific clip highlights to a USB drive (on request) before removing the equipment. Under our standard terms, the device and all footage are taken back and wiped post-removal for privacy.",
    },
    {
        q: "Is there a security deposit required?",
        a: "Yes. A refundable security deposit of ₹5,000–₹15,000 (depending on package value) is collected at the time of booking and returned within 48 hours after equipment return in working condition.",
    },
    {
        q: "Do you serve locations outside Chennai?",
        a: "Yes. We currently serve Chennai, Hosur, Bengaluru, Coimbatore, Puducherry, Cuddalore, and surrounding districts within 100 km. Travel charges may apply for venues beyond our standard service radius.",
    },
];

const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "CCTV Camera Rental for Events",
    serviceType: "Surveillance Equipment Rental",
    provider: {
        "@type": "LocalBusiness",
        name: "Infysmart Solutions",
        url: "https://infysmart.com",
        telephone: "+91-9445675619",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Chennai",
            addressRegion: "Tamil Nadu",
            addressCountry: "IN",
        },
    },
    areaServed: ["Chennai", "Hosur", "Bengaluru", "Coimbatore", "Puducherry", "Cuddalore"],
    description: "Professional CCTV camera rental service for events, parties, concerts, weddings and exhibitions. Packages from ₹1,499/day with installation and live monitoring.",
    offers: [
        { "@type": "Offer", name: "Starter Package", price: "1499", priceCurrency: "INR", description: "4 HD cameras, NVR, mobile view, installation & removal" },
        { "@type": "Offer", name: "Standard Package", price: "3499", priceCurrency: "INR", description: "8 Super-HD cameras, PTZ, on-site technician, 12-hour coverage" },
        { "@type": "Offer", name: "Premium Package", price: "7499", priceCurrency: "INR", description: "16 cameras, 4K PTZ, redundant storage, 24-hour multi-shift coverage" },
    ],
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://infysmart.com" },
        { "@type": "ListItem", position: 2, name: "CCTV Services", item: "https://infysmart.com/cctv" },
        { "@type": "ListItem", position: 3, name: "CCTV Rental for Events", item: "https://infysmart.com/cctv-rental" },
    ],
};

export default function CCTVRentalPage() {
    return (
        <main className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            {/* 1. HERO */}
            <section className="relative min-h-[70vh] flex items-center bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2670&auto=format&fit=crop"
                        alt="Event CCTV Surveillance - Concert and Event Security Camera Rental"
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/50" />
                </div>

                {/* Floating badge */}
                <div className="absolute top-8 right-8 z-20 hidden md:block">
                    <div className="bg-orange-500/20 border border-orange-500/40 text-orange-300 rounded-xl px-4 py-3 text-sm font-bold text-center">
                        <Star className="w-4 h-4 inline mr-1" />
                        500+ Events Secured
                    </div>
                </div>

                <div className="container mx-auto px-6 relative z-10 py-24">
                    <FadeIn direction="right" className="max-w-3xl">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <span>/</span>
                            <Link href="/cctv" className="hover:text-white transition-colors">CCTV</Link>
                            <span>/</span>
                            <span className="text-slate-300">CCTV Rental</span>
                        </nav>

                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-900/50 border border-orange-700 text-orange-300 text-xs font-bold uppercase tracking-widest mb-6">
                            <Camera className="w-3 h-3" /> Event Surveillance Rental
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                            CCTV Cameras on<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                                Rent for Your Event.
                            </span>
                        </h1>
                        <p className="text-lg text-slate-300 mb-4 max-w-2xl leading-relaxed">
                            Professional HD surveillance for concerts, weddings, parties & exhibitions — without the cost of a permanent installation.
                            We handle <strong className="text-white">setup, monitoring, and removal.</strong>
                        </p>
                        <p className="text-slate-400 text-sm mb-10 max-w-xl">
                            Serving Chennai, Hosur, Bengaluru & surrounding districts. Equipment delivered and installed same-day for urgent bookings.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/contact"
                                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg font-bold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-900/40 text-center"
                            >
                                Get a Free Quote
                            </Link>
                            <a
                                href="tel:+919445675619"
                                className="px-8 py-4 rounded-lg font-bold text-white border border-slate-600 hover:bg-slate-800 transition-colors text-center flex items-center justify-center gap-2"
                            >
                                <Phone className="w-4 h-4" /> Call Now
                            </a>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 2. TRUST STRIP */}
            <section className="bg-white border-b border-slate-100 py-6">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
                        {[
                            { icon: Clock, label: "Same-Day Setup Available" },
                            { icon: Wifi, label: "Live Mobile Monitoring" },
                            { icon: Shield, label: "IP66 Weatherproof Units" },
                            { icon: Headphones, label: "24/7 On-Call Support" },
                        ].map(({ icon: Icon, label }) => (
                            <div key={label} className="flex items-center justify-center gap-2 text-slate-600 font-medium">
                                <Icon className="w-4 h-4 text-orange-500 shrink-0" />
                                <span>{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. WHY RENT CCTV */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <FadeIn direction="left">
                            <span className="text-orange-600 font-bold text-sm tracking-wide uppercase mb-2 block">Temporary Security Made Easy</span>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Rent CCTV Instead of Hiring More Guards?</h2>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                A single security guard monitors one location. A <strong className="text-slate-900">4-camera CCTV system</strong> simultaneously covers every entrance, exit, crowd zone, and parking area — at a fraction of the cost of additional manpower.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { title: "Deters incidents before they happen", desc: "Visible cameras reduce antisocial behaviour, theft and gatecrashing by up to 60%." },
                                    { title: "Evidence if something goes wrong", desc: "HD recordings serve as legal proof for insurance claims, police complaints or internal investigations." },
                                    { title: "No long-term commitment", desc: "Rent only for event duration — no maintenance costs, no depreciation, no installation hassles." },
                                ].map(item => (
                                    <div key={item.title} className="flex gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                                            <p className="text-slate-500 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>

                        <FadeIn direction="right">
                            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500 rounded-full blur-[100px] opacity-20" />
                                <h3 className="text-xl font-bold mb-2">How It Works</h3>
                                <p className="text-slate-400 text-sm mb-8">Our 4-step hassle-free rental process:</p>
                                <ol className="space-y-6 relative">
                                    <div className="absolute left-[18px] top-8 bottom-0 w-px bg-slate-700" />
                                    {[
                                        { step: "1", title: "Book & Brief Us", desc: "Share your venue details, event date, attendee count and coverage requirements." },
                                        { step: "2", title: "Site Survey", desc: "Our technician visits (or reviews venue layout) to plan optimal camera placement." },
                                        { step: "3", title: "Installation Day", desc: "We arrive 2–3 hours before your event to install, cable, and test all cameras." },
                                        { step: "4", title: "Post-Event Removal", desc: "We collect all equipment within 12 hours after your event ends. Zero hassle." },
                                    ].map(item => (
                                        <li key={item.step} className="flex gap-4 relative">
                                            <div className="w-9 h-9 rounded-full bg-orange-500 text-white font-bold text-sm flex items-center justify-center shrink-0 z-10">
                                                {item.step}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white">{item.title}</h4>
                                                <p className="text-slate-400 text-sm">{item.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 4. USE CASES */}
            <section className="py-20 bg-white border-t border-slate-100">
                <div className="container mx-auto px-6">
                    <FadeIn className="text-center mb-14">
                        <span className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-3 block">Trusted Across Event Types</span>
                        <h2 className="text-3xl font-bold text-slate-900">Events We Secure Every Weekend</h2>
                    </FadeIn>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {useCases.map(({ icon: Icon, title, desc }) => (
                            <FadeIn key={title}>
                                <div className="bg-slate-50 hover:bg-orange-50 border border-slate-100 hover:border-orange-200 rounded-xl p-6 transition-all group h-full">
                                    <div className="w-12 h-12 bg-orange-100 group-hover:bg-orange-200 rounded-xl flex items-center justify-center mb-4 transition-colors">
                                        <Icon className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. PRICING PACKAGES */}
            <section className="py-24 bg-slate-900 text-white">
                <div className="container mx-auto px-6">
                    <FadeIn className="text-center mb-16">
                        <span className="text-orange-400 font-bold uppercase tracking-widest text-xs mb-3 block">Transparent Pricing</span>
                        <h2 className="text-4xl font-extrabold mb-4">Rental Packages</h2>
                        <p className="text-slate-400 max-w-xl mx-auto">
                            All-inclusive per-day pricing. No hidden charges. Security deposit refundable.
                        </p>
                    </FadeIn>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {rentalPackages.map((pkg) => (
                            <FadeIn key={pkg.name}>
                                <div className={`relative rounded-2xl border flex flex-col h-full ${
                                    pkg.badge === "Most Popular"
                                        ? "border-orange-500 bg-gradient-to-b from-orange-950/60 to-slate-800 shadow-xl shadow-orange-900/30 scale-[1.02]"
                                        : "border-slate-700 bg-slate-800"
                                }`}>
                                    {pkg.badge && (
                                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                                            {pkg.badge}
                                        </div>
                                    )}
                                    <div className="p-6 border-b border-slate-700">
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{pkg.name}</div>
                                        <div className="text-3xl font-extrabold text-white">{pkg.price}<span className="text-slate-400 text-base font-normal">{pkg.unit}</span></div>
                                        <div className="text-orange-400 font-semibold text-sm mt-1">{pkg.cameras}</div>
                                        <div className="text-slate-500 text-xs mt-1">{pkg.ideal}</div>
                                    </div>
                                    <ul className="p-6 space-y-3 flex-1">
                                        {pkg.features.map(f => (
                                            <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                                                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="p-6 pt-0">
                                        <Link
                                            href="/contact"
                                            className={`block text-center py-3 rounded-lg font-bold text-sm transition-all ${
                                                pkg.badge === "Most Popular"
                                                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                                                    : "bg-slate-700 hover:bg-slate-600 text-white"
                                            }`}
                                        >
                                            Book This Package
                                        </Link>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    <p className="text-center text-slate-500 text-sm mt-8">
                        Multi-day discounts available. Custom packages for events over 2,000 attendees.{' '}
                        <a href="tel:+919445675619" className="text-orange-400 hover:underline">Call for a quote.</a>
                    </p>
                </div>
            </section>

            {/* 6. EQUIPMENT SPECS */}
            <section className="py-20 bg-white border-t border-slate-100">
                <div className="container mx-auto px-6">
                    <FadeIn className="text-center mb-14">
                        <span className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-3 block">Our Equipment Fleet</span>
                        <h2 className="text-3xl font-bold text-slate-900">Professional-Grade Gear, Not Consumer Cameras</h2>
                        <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm">Every unit is sanitised, firmware-updated, and range-tested before dispatch to your event.</p>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: Camera,
                                title: "2MP–5MP IP Cameras",
                                spec: "Hikvision / Dahua",
                                desc: "WDR, H.265+, IR night vision up to 30 m. IP66 rated for outdoor use.",
                            },
                            {
                                icon: MonitorPlay,
                                title: "NVR / DVR Recorders",
                                spec: "4–32 Channel",
                                desc: "Local storage with simultaneous live-view. HDMI output for on-site monitor.",
                            },
                            {
                                icon: Wifi,
                                title: "4G Mobile Units",
                                spec: "No Internet Needed",
                                desc: "Standalone 4G-connected camera pods for venues without fixed broadband.",
                            },
                            {
                                icon: Zap,
                                title: "UPS Power Backup",
                                spec: "4–8 Hour Battery",
                                desc: "Ensures continuous recording even during generator switchovers.",
                            },
                        ].map(({ icon: Icon, title, spec, desc }) => (
                            <div key={title} className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                                <Icon className="w-8 h-8 text-orange-500 mb-4" />
                                <h3 className="font-bold text-slate-900 mb-0.5">{title}</h3>
                                <div className="text-xs font-bold text-orange-600 mb-2">{spec}</div>
                                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. SERVICE AREAS */}
            <section className="py-20 bg-slate-50 border-t border-slate-100">
                <div className="container mx-auto px-6 text-center">
                    <span className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4 block">Coverage Areas</span>
                    <h2 className="text-3xl font-bold text-slate-900 mb-10">We Deliver & Install Across South India</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-8">
                        {[
                            { city: "Chennai", note: "Metro & suburbs" },
                            { city: "Hosur", note: "SIPCOT & Denkanikottai" },
                            { city: "Bengaluru", note: "Electronic City + North" },
                            { city: "Coimbatore", note: "Industrial zones" },
                        ].map(({ city, note }) => (
                            <div key={city} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center">
                                <MapPin className="text-orange-500 mb-2 w-7 h-7" />
                                <span className="font-bold text-slate-800">{city}</span>
                                <span className="text-xs text-slate-500 mt-1">{note}</span>
                            </div>
                        ))}
                    </div>
                    <div className="text-sm text-slate-500">
                        Also serving: <span className="text-slate-700 font-medium">Puducherry • Cuddalore • Krishnagiri • Dharmapuri • Vellore</span>
                    </div>
                </div>
            </section>

            {/* 8. FAQ */}
            <section className="py-20 bg-white border-t border-slate-100">
                <div className="container mx-auto px-6 max-w-4xl">
                    <FadeIn className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">CCTV Rental — Frequently Asked Questions</h2>
                        <p className="text-slate-500">Everything you need to know before booking.</p>
                    </FadeIn>
                    <div className="space-y-4">
                        {faqs.map((faq) => (
                            <div key={faq.q} className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm">
                                <h3 className="text-base font-bold text-slate-900 mb-2">{faq.q}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. CTA BANNER */}
            <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
                <div className="container mx-auto px-6 text-center max-w-2xl">
                    <Camera className="w-12 h-12 mx-auto mb-4 opacity-80" />
                    <h2 className="text-3xl font-bold mb-3">Secure Your Next Event Today</h2>
                    <p className="text-orange-100 mb-8 leading-relaxed">
                        Don&apos;t leave your event&apos;s safety to chance. Get a free customised quote in under 15 minutes.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="/contact"
                            className="bg-white text-orange-600 px-10 py-4 rounded-lg font-bold hover:bg-orange-50 transition-all shadow-xl"
                        >
                            Request Free Quote
                        </Link>
                        <a
                            href="tel:+919445675619"
                            className="border-2 border-white/70 text-white px-10 py-4 rounded-lg font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                        >
                            <Phone className="w-4 h-4" /> +91 94456 75619
                        </a>
                    </div>
                </div>
            </section>

            {/* 10. RELATED SERVICES */}
            <section className="py-16 bg-slate-50 border-t border-slate-100">
                <div className="container mx-auto px-6 text-center">
                    <h3 className="text-xl font-bold text-slate-900 mb-8">Explore Related Services</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            { label: "CCTV Installation", href: "/cctv" },
                            { label: "AMC Services", href: "/amc" },
                            { label: "CCTV Camera Prices", href: "/cctv-camera-price" },
                            { label: "CCTV Installation Bangalore", href: "/cctv-installation/bangalore" },
                            { label: "CCTV Installation Chennai", href: "/cctv-installation/chennai" },
                        ].map(({ label, href }) => (
                            <Link
                                key={label}
                                href={href}
                                className="px-5 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:border-orange-400 hover:text-orange-600 transition-colors shadow-sm"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}
