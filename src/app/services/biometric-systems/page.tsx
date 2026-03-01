import { directus } from '@/lib/directus';
import { readSingleton } from '@directus/sdk';
import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/animations/FadeIn';
import {
    Fingerprint,
    Scan,
    Users,
    Building2,
    MapPin,
    CheckCircle2,
    Clock,
    ShieldCheck
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Biometric Access Control Systems in Chennai, Coimbatore, Bangalore | InfySmart",
    description: "Advanced Biometric Attendance Machines & Door Access Control. Fingerprint, Face Recognition, and RFID systems for Offices & Factories across Tamil Nadu and Bangalore.",
    keywords: [
        "Biometric Access Control", "Time Attendance System", "Fingerprint Scanner",
        "Face Recognition Attendance", "Door Access Control System", "Essl Biometric Dealer",
        "Realtime Biometric Dealer", "Matrix Access Control", "Employee Monitoring System",
        "Chennai", "Hosur", "Coimbatore", "Bengaluru", "Puducherry", "Cuddalore", "Karaikudi", "Dharmapuri"
    ],
    alternates: { canonical: '/services/biometric-systems' }
};

export const revalidate = 60;

export default async function BiometricSystemsPage() {
    const settings = await directus.request(readSingleton('global_settings')).catch(() => null);

    return (
        <main className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">

            {/* 1. HERO SECTION */}
            <section className="relative h-[60vh] flex items-center bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1629235824987-94e43b677a83?q=80&w=2670&auto=format&fit=crop"
                        alt="Biometric Access Control System Installation"
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <FadeIn direction="right" className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/50 border border-blue-700 text-blue-300 text-xs font-bold uppercase tracking-widest mb-6">
                            <Fingerprint className="w-3 h-3" /> Secure Access Tech
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                            Advanced Biometric <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                Attendance & Access
                            </span>
                        </h1>
                        <p className="text-lg text-slate-300 mb-8 max-w-xl leading-relaxed">
                            Manage employee attendance and secure your premises with state-of-the-art <strong>Fingerprint</strong>, <strong>Face Recognition</strong>, and <strong>RFID</strong> systems.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/contact" className="bg-brand-blue text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/50 text-center">
                                Get Quote
                            </Link>
                            <Link href="tel:+919445675619" className="px-8 py-4 rounded-lg font-bold text-white border border-slate-600 hover:bg-slate-800 transition-colors text-center">
                                Call Expert
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 2. SOLUTIONS GRID */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Total Workforce Management</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            From small offices to large factories, we have the right solution to track work hours and restrict unauthorized entry.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FadeIn direction="up" delay={0.1}>
                            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all h-full">
                                <Clock className="w-12 h-12 text-brand-blue mb-4" />
                                <h3 className="text-xl font-bold mb-3">Time &amp; Attendance</h3>
                                <p className="text-slate-600 text-sm">
                                    Automate payroll with accurate punch-in/out logs. Generate daily, weekly, and monthly reports via software or mobile app.
                                </p>
                            </div>
                        </FadeIn>
                        <FadeIn direction="up" delay={0.2}>
                            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all h-full">
                                <ShieldCheck className="w-12 h-12 text-brand-blue mb-4" />
                                <h3 className="text-xl font-bold mb-3">Door Access Control</h3>
                                <p className="text-slate-600 text-sm">
                                    Restrict entry to server rooms, MD cabins, and labs. Works with EM Locks, Bolt Locks, and Glass Door Kits.
                                </p>
                            </div>
                        </FadeIn>
                        <FadeIn direction="up" delay={0.3}>
                            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all h-full">
                                <Scan className="w-12 h-12 text-brand-blue mb-4" />
                                <h3 className="text-xl font-bold mb-3">Face Recognition</h3>
                                <p className="text-slate-600 text-sm">
                                    Touchless integration for post-COVID safety. Recognize faces even with masks. Fast matching speed &lt; 0.5s.
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* 3. SOFTWARE & BRANDS */}
            <section className="py-20 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-brand-blue font-bold text-sm tracking-wide uppercase mb-2 block">Software Integration</span>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Centralized Data Management</h2>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                                        <Users className="w-6 h-6 text-brand-blue" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Push Data Technology</h4>
                                        <p className="text-sm text-slate-600">Sync data from multiple branches (e.g., Hosur & Chennai) to a single Head Office server in real-time.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                                        <Building2 className="w-6 h-6 text-brand-blue" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Mobile App Support</h4>
                                        <p className="text-sm text-slate-600">View live attendance, approve leave requests, and geo-track field employees via mobile.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                            <h3 className="text-xl font-bold mb-6 text-center border-b pb-4">Our Partner Brands</h3>
                            <div className="grid grid-cols-2 gap-6 text-center">
                                <div className="p-4 border rounded hover:border-brand-blue transition">
                                    <span className="font-bold text-slate-700">eSSL</span>
                                </div>
                                <div className="p-4 border rounded hover:border-brand-blue transition">
                                    <span className="font-bold text-slate-700">Matrix</span>
                                </div>
                                <div className="p-4 border rounded hover:border-brand-blue transition">
                                    <span className="font-bold text-slate-700">ZKTeco</span>
                                </div>
                                <div className="p-4 border rounded hover:border-brand-blue transition">
                                    <span className="font-bold text-slate-700">Realtime</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. TECHNICAL DEEP DIVE (SEO EXPANSION) */}
            <section className="py-20 bg-slate-900 border-t border-slate-800 text-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Biometric Security Architecture</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Understanding template security and physical access control integratons.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 h-full">
                            <h3 className="text-xl font-bold mb-4 text-cyan-400">Template Encryption & Anti-Spoofing</h3>
                            <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                Our modern facial recognition systems employ <strong>Anti-Spoofing algorithms</strong> utilizing deep learning models to distinguish between a live face and a photograph or video playback. Furthermore, fingerprint scanners do not store actual images of fingerprints; instead, they convert the minutiae points into a mathematically hashed <strong>encrypted template</strong>, rendering it impossible to reverse-engineer the actual fingerprint if the database is breached.
                            </p>
                        </div>

                        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 h-full">
                            <h3 className="text-xl font-bold mb-4 text-cyan-400">Wiegand & Physical Interlocking</h3>
                            <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                For high-security zones (like pharmaceutical labs in SIPCOT), we integrate biometric readers with heavy-duty <strong>Electro-Magnetic (EM) Locks and Drop Bolts</strong>. We implement Wiegand protocols connecting the readers to central Multi-Door Controllers. We also design <strong>Interlocking Door Systems</strong> (Mantrap logic) where Door B will not open until Door A is securely closed behind the person.
                            </p>
                        </div>

                        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 h-full">
                            <h3 className="text-xl font-bold mb-4 text-cyan-400">Cloud API & Payroll Sync</h3>
                            <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                Gone are the days of manual USB drive downloads. We deploy devices with built-in Wi-Fi and 4G modules that push punch records via REST APIs directly to cloud servers. This active <strong>Push Data Technology</strong> seamlessly syncs with leading payroll software (like Zoho People or Keka), automating salary calculations based on exact in/out times and overtime hours without HR intervention.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. FAQ SECTION */}
            <section className="py-20 bg-white border-t border-slate-200">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Biometrics & Access Control FAQs</h2>
                        <p className="text-slate-600">Expert answers to common workplace implementation questions.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200">
                            <h4 className="text-lg font-bold text-slate-900 mb-2">What happens to the access doors during a power failure?</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Access control systems comply with fire safety regulations using &quot;Fail-Safe&quot; or &quot;Fail-Secure&quot; logic. Most office EM locks are <strong>Fail-Safe</strong>, meaning if the power is entirely cut, the magnet de-energizes and the door unlocks, allowing people to evacuate safely. However, we always install systems with robust battery backups (12V 7Ah minimum) to maintain security during routine power cuts.
                            </p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200">
                            <h4 className="text-lg font-bold text-slate-900 mb-2">Can employees punch attendance from their mobile phones when working remotely?</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Yes. Our comprehensive HRMS and Time-Attendance software suites include a dedicated mobile application for field staff. Furthermore, it utilizes <strong>Geo-fencing</strong> and GPS tracking, ensuring the employee can only successfully mark their attendance when physically present within the predefined coordinates of a client site or branch office.
                            </p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200">
                            <h4 className="text-lg font-bold text-slate-900 mb-2">Is face recognition reliable for employees wearing PPE or face masks?</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Yes. Brands like ZKTeco and Matrix offer advanced Visible Light Facial Recognition series that map the upper half of the face (eyes, brow ridges). These algorithms successfully authenticate personnel wearing industrial safety helmets, glasses, and surgical masks in under 0.5 seconds, which is crucial for manufacturing units post-pandemic.
                            </p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200">
                            <h4 className="text-lg font-bold text-slate-900 mb-2">How many users can a single biometric machine store?</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Capacity varies by model. Entry-level devices typically store 1,000 to 3,000 fingerprint templates and 50,000 punch logs. Enterprise-grade models can hold up to 10,000 face templates and 500,000 logs in internal memory. Once the log capacity is reached, older logs are either overwritten or pushed to the central server, ensuring continuous operation.
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
                        <h2 className="text-2xl font-bold text-slate-900">Servicing Clients Across</h2>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-600">
                        <span className="bg-slate-100 px-4 py-2 rounded-full border border-slate-200">Chennai</span>
                        <span className="bg-slate-100 px-4 py-2 rounded-full border border-slate-200">Hosur</span>
                        <span className="bg-slate-100 px-4 py-2 rounded-full border border-slate-200">Bengaluru</span>
                        <span className="bg-slate-100 px-4 py-2 rounded-full border border-slate-200">Coimbatore</span>
                        <span className="bg-slate-100 px-4 py-2 rounded-full border border-slate-200">Puducherry</span>
                        <span className="bg-slate-100 px-4 py-2 rounded-full border border-slate-200">Cuddalore</span>
                        <span className="bg-slate-100 px-4 py-2 rounded-full border border-slate-200">Karaikudi</span>
                        <span className="bg-slate-100 px-4 py-2 rounded-full border border-slate-200">Dharmapuri</span>
                    </div>
                </div>
            </section>

        </main>
    );
}
