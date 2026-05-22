import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/animations/FadeIn';
import {
    Wrench,
    CheckCircle2,
    AlertTriangle,
    Server,
    MapPin,
    Phone,
    Shield,
    Clock
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "CCTV AMC Services in Chennai | Annual Maintenance Contract | Infysmart",
    description: "Professional CCTV AMC services in Chennai starting at ₹450/year. Comprehensive maintenance for apartments, offices, and factories in Ambattur, Guindy, OMR, Anna Nagar. Zero downtime.",
    keywords: [
        "CCTV AMC Service Chennai",
        "Annual Maintenance Contract CCTV Chennai",
        "Security System Repair Chennai",
        "CCTV Repair Chennai",
        "Hikvision Service Center Chennai",
        "CP Plus Repair Chennai",
        "CCTV Technician near me",
        "AMC for Apartments Chennai",
        "Industrial CCTV AMC Chennai",
        "Anna Nagar", "OMR", "Velachery", "Ambattur", "Guindy"
    ],
    alternates: { canonical: 'https://infysmart.com/cctv-amc-chennai' },
    openGraph: {
        title: "CCTV AMC Services in Chennai | Preventative Maintenance | Infysmart",
        description: "Comprehensive CCTV AMC in Chennai. Starting ₹450/year for homes, apartments & industrial units across Chennai.",
        url: 'https://infysmart.com/cctv-amc-chennai',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CCTV AMC Services Chennai by Infysmart' }],
    },
};

export const revalidate = 60;

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://infysmart.com' },
        { '@type': 'ListItem', position: 2, name: 'CCTV AMC Services', item: 'https://infysmart.com/amc' },
        { '@type': 'ListItem', position: 3, name: 'CCTV AMC Chennai', item: 'https://infysmart.com/cctv-amc-chennai' },
    ],
};

const localServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'CCTV AMC Services in Chennai',
    serviceType: 'Security Camera Maintenance and Repair',
    description: 'Comprehensive Annual Maintenance Contracts (AMC) and repair services for CCTV cameras in Chennai. Serving residential apartments, IT parks, and industrial zones.',
    provider: { '@id': 'https://infysmart.com/#organization' },
    areaServed: [
        { '@type': 'City', name: 'Chennai' },
        { '@type': 'AdministrativeArea', name: 'Anna Nagar' },
        { '@type': 'AdministrativeArea', name: 'Velachery' },
        { '@type': 'AdministrativeArea', name: 'OMR' },
        { '@type': 'AdministrativeArea', name: 'Ambattur Industrial Estate' },
        { '@type': 'AdministrativeArea', name: 'Guindy' },
    ],
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'How much does CCTV AMC cost in Chennai?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'CCTV AMC in Chennai starts at ₹450 per camera per year for non-comprehensive contracts. Comprehensive AMC packages depend on the age of the system and site complexity. We provide custom quotes after a free site audit.',
            },
        },
        {
            '@type': 'Question',
            name: 'Do you offer AMC for apartment complexes in Chennai?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes! We specialize in maintaining large CCTV networks for gated communities and apartments in areas like OMR, Velachery, and Anna Nagar. Our service includes quarterly preventative visits and rapid response for any breakdown.',
            },
        },
        {
            '@type': 'Question',
            name: 'Will you service CCTV cameras installed by other vendors in Chennai?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, we take over existing CCTV networks. Our engineers will first conduct a site audit to assess the current health of your system and provide a rectification plan if necessary, before commencing the AMC.',
            },
        },
    ],
};

export default async function ChennaiAMCPage() {
    return (
        <main className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localServiceSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            {/* 1. HERO SECTION */}
            <section className="relative h-[70vh] min-h-[600px] flex items-center bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1621905251189-08b95d620045?q=80&w=2669&auto=format&fit=crop"
                        alt="CCTV AMC Service Chennai"
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <FadeIn direction="right" className="max-w-3xl">
                        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8">
                            <Link href="/" className="hover:text-slate-300">Home</Link>
                            <span>/</span>
                            <Link href="/amc" className="hover:text-slate-300">AMC Services</Link>
                            <span>/</span>
                            <span className="text-slate-400">Chennai</span>
                        </nav>
                        
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/50 border border-red-700 text-red-300 text-xs font-bold uppercase tracking-widest mb-6">
                            <MapPin className="w-3 h-3" /> Dedicated Chennai AMC Team
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                            Reliable CCTV AMC <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                                Across Chennai
                            </span>
                        </h1>
                        <p className="text-lg text-slate-300 mb-8 max-w-xl leading-relaxed">
                            Protect your premises with rapid-response CCTV maintenance. Specializing in apartments, IT parks in OMR, and factories in Ambattur & Guindy. Don&apos;t wait for a breakdown!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/contact" className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-900/50 text-center">
                                Request Free Site Audit
                            </Link>
                            <a href="tel:+919445675619" className="px-8 py-4 rounded-lg font-bold text-white border border-slate-600 hover:bg-slate-800 transition-colors text-center flex items-center justify-center gap-2">
                                <Phone className="w-4 h-4" /> +91 94456 75619
                            </a>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 2. WHY CHENNAI NEEDS PROACTIVE AMC? */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-red-600 font-bold text-sm tracking-wide uppercase mb-2 block">Local Expertise</span>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Tackling Chennai&apos;s Coastal Climate</h2>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                Chennai&apos;s high humidity and coastal salt air drastically reduce the lifespan of external BNC connectors and unshielded cabling. <strong className="text-slate-900">Preventative maintenance</strong> is crucial here to avoid sudden camera blackouts.
                            </p>
                            <div className="space-y-4">
                                <div className="flex bg-slate-50 p-4 rounded-lg border border-slate-200 gap-4">
                                    <Clock className="w-6 h-6 text-brand-blue shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-slate-900">Same-Day Resolution in Metro Limits</h4>
                                        <p className="text-sm text-slate-600">Our technicians cover T. Nagar, Anna Nagar, and Adyar with rapid dispatch to minimize your security downtime.</p>
                                    </div>
                                </div>
                                <div className="flex bg-slate-50 p-4 rounded-lg border border-slate-200 gap-4">
                                    <Shield className="w-6 h-6 text-brand-blue shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-slate-900">Industrial SLAs for Ambattur & Guindy</h4>
                                        <p className="text-sm text-slate-600">Strict 4-8 hour response times for factories and manufacturing units requiring continuous compliance recording.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 rounded-full blur-[80px] opacity-20"></div>
                            <h3 className="text-2xl font-bold mb-6">Our Chennai AMC Package</h3>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 border-b border-slate-800 pb-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                    <span><strong>4 Preventative Visits/Year</strong> for cleaning & health checks</span>
                                </li>
                                <li className="flex items-center gap-3 border-b border-slate-800 pb-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                    <span>Anti-corrosion treatment for outdoor connectors</span>
                                </li>
                                <li className="flex items-center gap-3 border-b border-slate-800 pb-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                    <span>Unlimited breakdown calls with fast dispatch</span>
                                </li>
                                <li className="flex items-center gap-3 border-b border-slate-800 pb-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                    <span>Hard Drive (HDD) health and retention audit</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                    <span>Firmware updates for IP cameras and NVRs</span>
                                </li>
                            </ul>
                            <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                                <span className="block text-sm text-slate-400 mb-1">Starting from</span>
                                <span className="text-3xl font-bold text-red-500">₹450 <span className="text-lg text-slate-500 font-normal">/cam/year</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. COVERAGE AREAS */}
            <section className="py-20 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto px-6 text-center max-w-4xl">
                    <span className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-4 block">Chennai Network</span>
                    <h2 className="text-3xl font-bold text-slate-900 mb-10">We Cover All Major Chennai Zones</h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                        {[
                            { area: 'Anna Nagar & Mogappair', desc: 'Residential & Retail' },
                            { area: 'OMR & ECR', desc: 'IT Parks & Villas' },
                            { area: 'Velachery & Adyar', desc: 'Apartments & Commercial' },
                            { area: 'Ambattur & Guindy', desc: 'Industrial Estates' },
                            { area: 'Tambaram & Chromepet', desc: 'Suburban Complexes' },
                            { area: 'Porur & Poonamallee', desc: 'Growing Hubs' }
                        ].map(zone => (
                            <div key={zone.area} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
                                <MapPin className="w-6 h-6 text-brand-blue mb-2 mx-auto" />
                                <h4 className="font-bold text-slate-800 text-sm mb-1">{zone.area}</h4>
                                <span className="text-xs text-slate-500">{zone.desc}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. FAQ SECTION */}
            <section className="py-20 bg-white border-t border-slate-200">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Chennai AMC FAQs</h2>
                        <p className="text-slate-600">Common questions about our maintenance contracts in Chennai.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200">
                            <h4 className="text-lg font-bold text-slate-900 mb-2">My cameras were installed by another company. Can you provide AMC?</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Yes. We frequently take over AMCs for apartments and offices in Chennai where the original vendor is unresponsive. Our team will perform an initial site audit, provide a health report, quote for any immediate repairs needed, and then initiate the AMC.
                            </p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200">
                            <h4 className="text-lg font-bold text-slate-900 mb-2">How quickly can a technician reach us in case of a breakdown?</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                For most areas within Chennai city limits (like T. Nagar, Anna Nagar, Velachery), we offer same-day or next-business-day response. For industrial clients in Ambattur or SIPCOT with SLA contracts, we guarantee specific response times (e.g., 4 to 8 hours).
                            </p>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200">
                            <h4 className="text-lg font-bold text-slate-900 mb-2">What is the difference between Comprehensive and Non-Comprehensive AMC?</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                <strong>Non-Comprehensive AMC</strong> covers regular service visits, preventative maintenance, and breakdown labor charges. You only pay for spare parts if something breaks. <br/>
                                <strong>Comprehensive AMC</strong> covers everything, including the cost of replacing faulty hardware like cameras or DVRs (excluding physical damage/acts of god).
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. CTA */}
            <section className="py-20 bg-brand-blue text-white">
                <div className="container mx-auto px-6 text-center max-w-2xl">
                    <h2 className="text-3xl font-bold mb-4">Secure Your Chennai Property Today</h2>
                    <p className="text-blue-100 mb-8">
                        Get a free site audit for your apartment complex, office, or factory. Discover why over 100+ businesses in Chennai trust Infysmart.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact" className="bg-white text-brand-blue px-10 py-4 rounded-lg font-bold hover:bg-blue-50 transition-all shadow-xl">
                            Request Free Audit
                        </Link>
                        <a href="tel:+919445675619" className="border border-white text-white px-10 py-4 rounded-lg font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                            <Phone className="w-4 h-4" /> Call: +91 94456 75619
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
