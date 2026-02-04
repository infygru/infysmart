import { directus } from '@/lib/directus';
import { readSingleton } from '@directus/sdk';
import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/animations/FadeIn';
import {
    Video,
    Shield,
    Smartphone,
    Wifi,
    MapPin,
    CheckCircle2,
    Bell,
    Lock
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Video Door Phone Installation | Smart Intercom Systems",
    description: "Secure your home with Video Door Phones (VDP) & IP Intercoms. Hikvision & Dahua dealers in Chennai, Hosur, Bengaluru, and Puducherry.",
    keywords: [
        "Video Door Phone Installation", "wireless video door phone", "Hikvision Video Door Phone",
        "Panasonic Video Door Phone", "Smart Doorbell with Camera", "IP Video Intercom",
        "Apartment Intercom System", "Villa Video Door Phone", "Gate Security Camera",
        "Chennai", "Hosur", "Coimbatore", "Bengaluru", "Puducherry", "Cuddalore", "Karaikudi", "Dharmapuri"
    ]
};

export const revalidate = 60;

export default async function VideoDoorPhonePage() {
    const settings = await directus.request(readSingleton('global_settings')).catch(() => null);

    return (
        <main className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">

            {/* 1. HERO SECTION */}
            <section className="relative h-[60vh] flex items-center bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1558002038-1091a0a5e727?q=80&w=2696&auto=format&fit=crop"
                        alt="Video Door Phone Installation Service Chennai"
                        fill
                        className="object-cover opacity-30"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <FadeIn direction="right" className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-900/50 border border-orange-700 text-orange-300 text-xs font-bold uppercase tracking-widest mb-6">
                            <Bell className="w-3 h-3" /> Smart Entry Solutions
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                            See Who's At Your Door <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-400">
                                Before You Open It.
                            </span>
                        </h1>
                        <p className="text-lg text-slate-300 mb-8 max-w-xl leading-relaxed">
                            Premium <strong>Video Door Phones (VDP)</strong> and IP Intercoms for Villas, Apartments, and Offices.
                            Visualize visitors on your smartphone, anywhere in the world.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/contact" className="bg-brand-orange text-white px-8 py-4 rounded-lg font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-900/50 text-center">
                                Get Quote for VDP
                            </Link>
                            <Link href="tel:+919445675619" className="px-8 py-4 rounded-lg font-bold text-white border border-slate-600 hover:bg-slate-800 transition-colors text-center">
                                Talk to Expert
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 2. KEY FEATURES */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Smart Security at Your Fingertips</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Upgrade your doorbell to a smart security device. Our Video Door Phones integrate seamlessly with electronic locks and CCTV systems.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FadeIn direction="up" delay={0.1}>
                            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all">
                                <Smartphone className="w-12 h-12 text-brand-blue mb-4" />
                                <h3 className="text-xl font-bold mb-3">Mobile App Access</h3>
                                <p className="text-slate-600 text-sm">
                                    Receive video calls on your Android/iOS phone when someone rings the bell. Talk to visitors even when you are not at home.
                                </p>
                            </div>
                        </FadeIn>
                        <FadeIn direction="up" delay={0.2}>
                            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all">
                                <Video className="w-12 h-12 text-brand-blue mb-4" />
                                <h3 className="text-xl font-bold mb-3">HD Night Vision</h3>
                                <p className="text-slate-600 text-sm">
                                    Crystal clear 1080p video, even in total darkness. Wide-angle lens ensures you see packages left at the doorstep.
                                </p>
                            </div>
                        </FadeIn>
                        <FadeIn direction="up" delay={0.3}>
                            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all">
                                <Lock className="w-12 h-12 text-brand-blue mb-4" />
                                <h3 className="text-xl font-bold mb-3">Remote Door Unlock</h3>
                                <p className="text-slate-600 text-sm">
                                    Connected to an Electronic Lock? Unlock your gate for family members or maids directly from the indoor monitor or app.
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 3. BRANDS SELECTION */}
            <section className="py-20 bg-slate-900 text-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Authorized Dealers for Top Brands</h2>
                            <p className="text-slate-400 mb-6 leading-relaxed">
                                We supply and install industry-leading Video Door Phone systems known for durability and clarity.
                                Whether you need a simple 4.3" screen or a premium 10" Touch IP Intercom, we have it in stock.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="text-green-500 w-5 h-5" />
                                    <span><strong>Hikvision</strong> (Analog & IP Series)</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="text-green-500 w-5 h-5" />
                                    <span><strong>Dahua</strong> (Apartment Multi-apartment systems)</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="text-green-500 w-5 h-5" />
                                    <span><strong>Panasonic</strong> (Premium Video Intercoms)</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="text-green-500 w-5 h-5" />
                                    <span><strong>Godrej</strong> (Home Security Solutions)</span>
                                </li>
                            </ul>
                            <Link href="/contact" className="inline-block mt-8 bg-white text-slate-900 px-6 py-3 rounded-lg font-bold hover:bg-slate-200 transition-colors">
                                Request Product Catalog
                            </Link>
                        </div>
                        <div className="relative h-[400px] bg-slate-800 rounded-2xl border border-slate-700 flex items-center justify-center p-8">
                            {/* Abstract Visual Representation */}
                            <div className="text-center">
                                <Wifi className="w-24 h-24 text-brand-blue mx-auto mb-4 animate-pulse" />
                                <p className="text-slate-400">Wireless & IP Solutions Available</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. SERVICE AREAS */}
            <section className="py-16 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto px-6">
                    <div className="flex items-center gap-2 mb-6 justify-center text-center">
                        <MapPin className="text-brand-orange w-6 h-6" />
                        <h2 className="text-2xl font-bold text-slate-900">VDP Installation Services Available In</h2>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-600">
                        <span className="bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">Chennai</span>
                        <span className="bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">Hosur</span>
                        <span className="bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">Bengaluru</span>
                        <span className="bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">Coimbatore</span>
                        <span className="bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">Puducherry</span>
                        <span className="bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">Cuddalore</span>
                        <span className="bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">Karaikudi</span>
                        <span className="bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">Dharmapuri</span>
                    </div>
                </div>
            </section>

        </main>
    );
}
