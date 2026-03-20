import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/animations/FadeIn';
import {
    Wrench,
    CheckCircle2,
    AlertTriangle,
    Server,
    MapPin,
    Phone
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "CCTV & Solar AMC Services in Chennai, Coimbatore, Bangalore | InfySmart",
    description: "Comprehensive Annual Maintenance Contracts for CCTV, Solar, Fire Alarms & Biometric systems. On-site repair & preventive maintenance across Tamil Nadu and Bangalore. AMC starting ₹450/year.",
    keywords: [
        "CCTV AMC Service", "Annual Maintenance Contract CCTV", "Security System Repair",
        "Biometric AMC", "Fire Alarm Maintenance", "Hikvision Service Center", "CP Plus Repair",
        "CCTV Technician near me", "AMC for Apartments",
        "Chennai", "Hosur", "Coimbatore", "Bengaluru", "Puducherry", "Cuddalore", "Karaikudi", "Dharmapuri"
    ],
    alternates: { canonical: 'https://infysmart.com/amc' },
    openGraph: {
        title: "CCTV & Solar AMC Services in Chennai, Coimbatore, Bangalore | InfySmart",
        description: "Comprehensive AMC for CCTV, Solar, Fire Alarms & Biometric systems. Starting ₹450/year across Tamil Nadu & Bangalore.",
        url: 'https://infysmart.com/amc',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CCTV AMC Services by Infysmart' }],
    },
    twitter: {
        title: "CCTV & Solar AMC Services | InfySmart",
        description: "Comprehensive AMC for CCTV, Solar & Biometric systems. Starting ₹450/year.",
        images: ['/og-image.png'],
    },
};

export const revalidate = 60;

export default async function AMCPage() {
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
                            Don&apos;t wait for a security breach to fix your system. Get proactive <strong>Annual Maintenance Contracts (AMC)</strong> for CCTV, Biometrics, and Fire Alarms.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/contact" className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-900/50 text-center">
                                Get AMC Proposal
                            </Link>
                            <a href="tel:+919445675619" className="px-8 py-4 rounded-lg font-bold text-white border border-slate-600 hover:bg-slate-800 transition-colors text-center flex items-center justify-center gap-2">
                                <Phone className="w-4 h-4" /> Book Technician
                            </a>
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

            {/* 4. TECHNICAL SLA & COMPLIANCE (SEO EXPANSION) */}
            <section className="py-20 bg-slate-900 border-t border-slate-800 text-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Service Level Agreements</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Strict maintenance protocols designed for continuous operations.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 h-full">
                            <h3 className="text-xl font-bold mb-4 text-red-500">Preventive vs Corrective Maintenance</h3>
                            <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                Most vendors only perform Corrective Maintenance (fixing what is already broken). Our Comprehensive AMC guarantees <strong>Preventive Maintenance</strong>. We proactively identify oxidized BNC connectors, failing power management ICs, and degrading hard sectors on surveillance drives before they cause a total system crash during a critical incident.
                            </p>
                        </div>

                        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 h-full">
                            <h3 className="text-xl font-bold mb-4 text-red-500">Response Time SLAs</h3>
                            <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                For industrial facilities in SIPCOT and Ambattur, security downtime implies immense liability. We offer tiered response SLAs. Our standard industrial contract ensures a technician arrives on-site within <strong>4 to 8 Business Hours</strong>. For mission-critical server rooms, we offer 24/7 telephonic troubleshooting and rapid hardware swapping to ensure zero recording gaps.
                            </p>
                        </div>

                        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 h-full">
                            <h3 className="text-xl font-bold mb-4 text-red-500">Comprehensive Checklists</h3>
                            <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                During each quarterly visit, our certified technicians execute a 24-point checklist. This includes testing the Uninterruptible Power Supply (UPS) battery load, re-calibrating PTZ camera home positions, archiving essential logs, and physically clearing cobwebs and dust from external infra-red (IR) lenses to ensure night vision remains unobstructed.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. FAQ SECTION */}
            <section className="py-20 bg-white border-t border-slate-200">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">AMC Frequently Asked Questions</h2>
                        <p className="text-slate-600">Clarifying our maintenance contract terms and conditions.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200">
                            <h4 className="text-lg font-bold text-slate-900 mb-2">What is the difference between Comprehensive and Non-Comprehensive AMCs?</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                A <strong>Non-Comprehensive AMC</strong> covers only the service charges for repairs and the scheduled quarterly visits; if a camera or hard drive needs replacement, the cost of the spare part is billed separately. A <strong>Comprehensive AMC</strong> covers both the service labor AND the cost of replacing faulty hardware components during the contract period, offering total peace of mind and predictable budgeting.
                            </p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200">
                            <h4 className="text-lg font-bold text-slate-900 mb-2">Will you take over the AMC if the system was installed by someone else?</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Yes. Before we sign the AMC, our engineers conduct a thorough initial site audit to evaluate the current health, cabling quality, and configuration of your existing setup. If critical flaws exist (like exposed wiring), we provide a one-time rectification quote to bring the system up to our maintainable standards, after which the AMC commences.
                            </p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200">
                            <h4 className="text-lg font-bold text-slate-900 mb-2">Are standby cameras provided during repairs?</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Yes, under specific premium industrial contracts. If a critical component like a multi-channel NVR or a primary entrance camera needs to be taken to our service center for PCB repair, we temporarily install a standby unit to ensure your premises remain under surveillance until the original component is fixed.
                            </p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200">
                            <h4 className="text-lg font-bold text-slate-900 mb-2">How do I track when my next service is due?</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                We utilize a digital ticketing and CRM system. You will receive an automated email/SMS reminder 7 days before your scheduled quarterly preventive maintenance visit. Post-service, you receive a digital service report signed by our technician detailing the health parameters of your system.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. PRICING OR CTA */}
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
