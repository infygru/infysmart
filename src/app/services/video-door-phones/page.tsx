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
    title: "Video Door Phone Installation in Chennai, Coimbatore, Bangalore | InfySmart",
    description: "Secure your home with Video Door Phones (VDP) & IP Intercoms. Authorized dealers in Chennai, Hosur, Coimbatore, Dharmapuri, and Bengaluru.",
    keywords: [
        "Video Door Phone Installation", "wireless video door phone", "Hikvision Video Door Phone",
        "Panasonic Video Door Phone", "Smart Doorbell with Camera", "IP Video Intercom",
        "Apartment Intercom System", "Villa Video Door Phone", "Gate Security Camera",
        "Chennai", "Hosur", "Coimbatore", "Bengaluru", "Puducherry", "Cuddalore", "Karaikudi", "Dharmapuri"
    ],
    alternates: { canonical: 'https://infysmart.com/services/video-door-phones' },
    openGraph: {
        title: "Video Door Phone Installation in Chennai, Coimbatore, Bangalore | InfySmart",
        description: "Video Door Phones & IP Intercoms for homes & apartments. Authorized dealers in Tamil Nadu & Bangalore.",
        url: 'https://infysmart.com/services/video-door-phones',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Video Door Phone Installation by Infysmart' }],
    },
    twitter: {
        title: "Video Door Phone Installation | InfySmart",
        description: "Video Door Phones & IP Intercoms in Tamil Nadu & Bangalore.",
        images: ['/og-image.png'],
    },
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
                            See who&apos;s At Your Door <br />
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
                                Whether you need a simple 4.3&quot; screen or a premium 10&quot; Touch IP Intercom, we have it in stock.
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

            {/* 4. TECHNICAL DEEP DIVE (SEO EXPANSION) */}
            <section className="py-20 bg-slate-900 border-t border-slate-800 text-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">IP Intercom Technology</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            The backbone of modern villa and multi-apartment communication.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 h-full">
                            <h3 className="text-xl font-bold mb-4 text-orange-400">SIP Protocol Integration</h3>
                            <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                Premium Video Door Phones utilize the <strong>Session Initiation Protocol (SIP)</strong> to route audio/video calls over internet networks just like an IP-PBX system. This allows the outdoor lobby station to dial directly to the resident&apos;s mobile app anywhere globally via cloud P2P servers without the need for static IP addresses.
                            </p>
                        </div>

                        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 h-full">
                            <h3 className="text-xl font-bold mb-4 text-orange-400">TCP/IP Network Topology</h3>
                            <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                Analog systems suffer from signal degradation over long distances. In large residential complexes, we design <strong>TCP/IP based intercom networks</strong> using cascaded PoE switches. This ensures crisp 1080p HD video and clear duplex audio between the main security gate and a flat located on the 20th floor, utilizing standard CAT6 cabling.
                            </p>
                        </div>

                        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 h-full">
                            <h3 className="text-xl font-bold mb-4 text-orange-400">Lock Interfaces & Dry Contacts</h3>
                            <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                The outdoor station acts as an access control relay. It features normally-open (NO) and normally-closed (NC) <strong>dry contact outputs</strong> capable of integrating with Electromagnetic Locks, Strike Locks on wooden doors, or Automated Sliding Gates. Authorized users can trigger the relay via the indoor monitor, RFID tag, or a mobile app.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. FAQ SECTION */}
            <section className="py-20 bg-white border-t border-slate-200">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Smart Intercom FAQs</h2>
                        <p className="text-slate-600">Expert answers to common Video Door Phone integration questions.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200">
                            <h4 className="text-lg font-bold text-slate-900 mb-2">Can I connect my Video Door Phone to my CCTV DVR?</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Yes. Analog VDP systems can often pass their video signal into a DVR via BNC adapters. More efficiently, IP-based Video Door Phones from brands like Hikvision provide an RTSP stream. This protocol allows your NVR (Network Video Recorder) to treat the door phone&apos;s camera exactly like an ordinary CCTV camera, recording the 24/7 video feed for continuous surveillance over the main entrance.
                            </p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200">
                            <h4 className="text-lg font-bold text-slate-900 mb-2">What happens if my home Wi-Fi goes down?</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                If the internet is disconnected, the remote mobile app feature (receiving calls on your phone) will stop working. However, the core functionality between the outdoor bell and the physical indoor monitor screen will continue to work perfectly via the local wired connection, ensuring you are never locked out from communicating with visitors inside your home.
                            </p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200">
                            <h4 className="text-lg font-bold text-slate-900 mb-2">I live in a multi-story house. Can I have multiple indoor screens?</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Yes. The system can be expanded by running cascade connections to supplementary &quot;Slave&quot; monitors. For example, if you have a G+2 villa, we install the main &quot;Master&quot; monitor in the living room, and smaller screens in the upstairs bedrooms. When the bell rings, all screens chime simultaneously, and you can converse with the visitor from any floor.
                            </p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200">
                            <h4 className="text-lg font-bold text-slate-900 mb-2">Is the outdoor camera weather-proof and vandal-proof?</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Outdoor lobby stations are built specifically to withstand the elements. They typically possess an IP65 rating to resist heavy rain and dust. Premium models also carry an IK08 or IK09 vandal-resistance rating, featuring cast-aluminum alloy housings and polycarbonate shields over the camera lens to protect against physical tampering or deliberate damage.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. SERVICE AREAS */}
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
