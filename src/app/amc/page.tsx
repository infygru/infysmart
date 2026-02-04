import { directus } from '@/lib/directus';
import { readSingleton } from '@directus/sdk';
import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/animations/FadeIn';
import {
    ShieldCheck,
    Wrench,
    Clock,
    CheckCircle2,
    AlertTriangle,
    Server,
    MapPin,
    Phone
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "CCTV AMC Services in Chennai & Hosur | Annual Maintenance Contract",
    description: "Comprehensive AMC for CCTV, Fire Alarms, and Biometric systems. On-site repair & preventive maintenance for Factories, Apartments, and Offices in Tamil Nadu.",
    keywords: [
        "CCTV AMC Service", "Annual Maintenance Contract CCTV", "Security System Repair",
        "Biometric AMC", "Fire Alarm Maintenance", "Hikvision Service Center", "CP Plus Repair",
        "CCTV Technician near me", "AMC for Apartments",
        "Chennai", "Hosur", "Coimbatore", "Bengaluru", "Puducherry", "Cuddalore", "Karaikudi", "Dharmapuri"
    ]
};

export const revalidate = 60;

export default async function AMCPage() {
    const settings = await directus.request(readSingleton('global_settings')).catch(() => null);

    return (
        <main className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">

            {/* 1. HERO SECTION */}
            <section className="relative h-[60vh] flex items-center bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1621905251189-08b95d620045?q=80&w=2669&auto=format&fit=crop"
                        alt="CCTV Camera Repair and AMC Service"
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <FadeIn direction="right" className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/50 border border-red-700 text-red-300 text-xs font-bold uppercase tracking-widest mb-6">
                            <Wrench className="w-3 h-3" /> 24/7 Support Team
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                            Zero Downtime. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                                Guaranteed Protection.
                            </span>
                        </h1>
                        <p className="text-lg text-slate-300 mb-8 max-w-xl leading-relaxed">
                            Don't wait for a security breach to fix your system. Get proactive <strong>Annual Maintenance Contracts (AMC)</strong> for CCTV, Biometrics, and Fire Alarms.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/contact" className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-900/50 text-center">
                                Get AMC Proposal
                            </Link>
                            <Link href="tel:+919876543210" className="px-8 py-4 rounded-lg font-bold text-white border border-slate-600 hover:bg-slate-800 transition-colors text-center flex items-center justify-center gap-2">
                                <Phone className="w-4 h-4" /> Book Technician
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 2. WHY AMC? */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-red-600 font-bold text-sm tracking-wide uppercase mb-2 block">Preventive Care</span>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Is Your Security System Actually Working?</h2>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                Study shows that <strong className="text-slate-900">40% of CCTV cameras</strong> in India stop recording within 2 years due to HDD failure or power issues.
                            </p>
                            <div className="space-y-4">
                                <div className="flex bg-red-50 p-4 rounded-lg border border-red-100 gap-4">
                                    <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-slate-900">HDD Failure Risk</h4>
                                        <p className="text-sm text-slate-600">Hard disks need health checks every 3 months to prevent data loss.</p>
                                    </div>
                                </div>
                                <div className="flex bg-orange-50 p-4 rounded-lg border border-orange-100 gap-4">
                                    <Server className="w-6 h-6 text-orange-600 shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-slate-900">Firmware Updates</h4>
                                        <p className="text-sm text-slate-600">Old firmware makes your IP cameras vulnerable to hacking.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 rounded-full blur-[80px] opacity-20"></div>
                            <h3 className="text-2xl font-bold mb-6">Our AMC Plan Includes</h3>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 border-b border-slate-800 pb-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    <span><strong>4 Preventive Visits</strong> per year (Quarterly)</span>
                                </li>
                                <li className="flex items-center gap-3 border-b border-slate-800 pb-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    <span>Unlimited Breakdown Calls</span>
                                </li>
                                <li className="flex items-center gap-3 border-b border-slate-800 pb-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    <span>Lens Cleaning & Focus Adjustment</span>
                                </li>
                                <li className="flex items-center gap-3 border-b border-slate-800 pb-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    <span>Power Supply & connector Check</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    <span>Remote Mobile View Configuration</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. SERVICE LOCATIONS */}
            <section className="py-20 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto px-6 text-center">
                    <span className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-4 block">Rapid Response Network</span>
                    <h2 className="text-3xl font-bold text-slate-900 mb-10">AMC Support Available In</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition card-hover flex flex-col items-center">
                            <MapPin className="text-brand-blue mb-3 w-8 h-8" />
                            <span className="font-bold text-slate-800">Chennai</span>
                            <span className="text-xs text-slate-500 mt-1">Foundry & IT Parks</span>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition card-hover flex flex-col items-center">
                            <MapPin className="text-brand-blue mb-3 w-8 h-8" />
                            <span className="font-bold text-slate-800">Hosur</span>
                            <span className="text-xs text-slate-500 mt-1">SIPCOT Industries</span>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition card-hover flex flex-col items-center">
                            <MapPin className="text-brand-blue mb-3 w-8 h-8" />
                            <span className="font-bold text-slate-800">Bengaluru</span>
                            <span className="text-xs text-slate-500 mt-1">Electronic City</span>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition card-hover flex flex-col items-center">
                            <MapPin className="text-brand-blue mb-3 w-8 h-8" />
                            <span className="font-bold text-slate-800">Coimbatore</span>
                            <span className="text-xs text-slate-500 mt-1">Textile Mills</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm text-slate-500 font-medium">
                        <span>Also serving:</span>
                        <span className="text-slate-800">Puducherry</span> •
                        <span className="text-slate-800">Cuddalore</span> •
                        <span className="text-slate-800">Karaikudi</span> •
                        <span className="text-slate-800">Dharmapuri</span>
                    </div>
                </div>
            </section>

            {/* 4. PRICING OR CTA */}
            <section className="py-20 bg-brand-blue text-white">
                <div className="container mx-auto px-6 text-center max-w-2xl">
                    <h2 className="text-3xl font-bold mb-4">Start Your AMC @ ₹450 / Camera</h2>
                    <p className="text-blue-100 mb-8">
                        Protect your investment today. Customized packages available for Gated Communities and Large Factories.
                    </p>
                    <Link href="/contact" className="bg-white text-brand-blue px-10 py-4 rounded-lg font-bold hover:bg-blue-50 transition-all shadow-xl">
                        Request Callback
                    </Link>
                </div>
            </section>

        </main>
    );
}
