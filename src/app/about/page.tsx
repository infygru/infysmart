import { Metadata } from "next";
import {
  Building2,
  ShieldCheck,
  Landmark,
  Factory,
  Target,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Briefcase
} from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";


export const metadata: Metadata = {
  title: "About InfySmart | Smart Infrastructure & Security Solutions",
  description:
    "InfySmart is the official smart infrastructure and security solutions brand of Infygru Private Limited, delivering CCTV, automation, and solar projects for government, corporate, and industrial clients.",
  keywords: [
    "InfySmart",
    "Infygru Private Limited",
    "CCTV projects India",
    "Government CCTV projects",
    "Corporate security solutions",
    "Industrial surveillance systems",
    "Solar panel installation",
    "Automation solutions company",
    "Smart infrastructure India"
  ],
  openGraph: {
    title: "About InfySmart | A Unit of Infygru Private Limited",
    description:
      "InfySmart, a unit of Infygru Private Limited, specializes in CCTV, smart security, automation, and solar infrastructure projects for government and enterprise clients.",
    url: "https://infysmart.com/about",
    siteName: "InfySmart",
    type: "website",
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'About Infysmart — Security & Technology Solutions' }],
  },
  twitter: {
    title: "About Infysmart | Security & Infrastructure Solutions",
    description: "Govt-approved CCTV, automation & solar projects for government & enterprise clients.",
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: "https://infysmart.com/about"
  }
};

export default function AboutPage() {
  return (
    <main className="bg-white font-sans text-slate-900 overflow-x-hidden">

      {/* 1. PREMIUM HERO SECTION */}
      <section className="relative bg-slate-900 py-24 md:py-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <FadeIn direction="up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-blue-400 text-sm font-bold tracking-wider uppercase mb-8">
              <ShieldCheck className="w-4 h-4" /> Official Brand of <a href="https://infygru.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors underline decoration-blue-500/30">Infygru Private Limited</a>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Engineering Trust. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-400">
                Securing The Future.
              </span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-slate-300 leading-relaxed">
              Delivering enterprise-grade CCTV, Automation, and Solar infrastructure solutions
              with precision and long-term reliability for Government and Industrial sectors.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 2. CORPORATE IDENTITY (Infygru vs InfySmart) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Visual Column */}
            <FadeIn direction="right" className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue to-purple-600 transform rotate-2 rounded-2xl opacity-10"></div>
              <div className="relative bg-slate-50 p-10 rounded-2xl border border-slate-200 shadow-xl">
                <Building2 className="w-16 h-16 text-slate-800 mb-6" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  <a href="https://infygru.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors">
                    Infygru Private Limited
                  </a>
                </h3>
                <p className="text-slate-500 font-medium mb-6 uppercase tracking-widest text-xs">The Parent Entity</p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <p className="text-slate-600 text-sm">Registered Private Limited Company executing major contracts.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <p className="text-slate-600 text-sm">Handles Government Tenders, Compliance & Audits.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <p className="text-slate-600 text-sm">Provides financial strength and operational governance.</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Content Column */}
            <FadeIn direction="left">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                A Unified Vision for <br />
                <span className="text-brand-blue">Smart Infrastructure</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                <strong>InfySmart</strong> is the specialized operating unit of <strong><a href="https://infygru.com" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:text-blue-800 hover:underline">Infygru Private Limited</a></strong>.
                While Infygru provides the corporate backbone and compliance framework required for large-scale projects,
                InfySmart brings the technical expertise and agile execution teams needed on the ground.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                This structure allows us to serve massive government mandates and corporate requirements with
                the speed of a tech company and the stability of a registered corporation.
              </p>

              <div className="border-l-4 border-brand-blue pl-6 py-2 bg-slate-50 rounded-r-lg">
                <p className="text-slate-700 italic font-medium">
                  &quot;We don&apos;t just install technology; we engineer ecosystems that protect assets and optimize operations.&quot;
                </p>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* 3. SECTORS OF EXPERTISE */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn direction="up">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Sectors</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                We focus on high-stakes environments where security failures are not an option.
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Government */}
            <FadeIn direction="up" delay={0.1}>
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 group h-full">
                <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand-blue transition-colors">
                  <Landmark className="w-7 h-7 text-brand-blue group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Government &amp; PSUs</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Executing state-wide surveillance projects, municipal monitoring systems, and public infrastructure
                  upgrades with strict adherence to tender specifications and ISI/BIS standards.
                </p>
              </div>
            </FadeIn>

            {/* Industrial */}
            <FadeIn direction="up" delay={0.2}>
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 group h-full">
                <div className="w-14 h-14 bg-orange-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors">
                  <Factory className="w-7 h-7 text-orange-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Industrial Complexes</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Ruggedized surveillance for factories, perimeter protection for warehouses, and
                  high-temperature camera systems for manufacturing units like TNPL.
                </p>
              </div>
            </FadeIn>

            {/* Corporate */}
            <FadeIn direction="up" delay={0.3}>
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 group h-full">
                <div className="w-14 h-14 bg-purple-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                  <Briefcase className="w-7 h-7 text-purple-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Corporate Enterprise</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  End-to-end office automation, server room biometric security, and fire safety systems
                  designed for scalability and ease of management for IT Parks and offices.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US LIST */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn direction="up">
            <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid lg:grid-cols-2">
                <div className="p-12 md:p-16">
                  <h2 className="text-3xl font-bold text-white mb-6">The InfySmart Engineering Advantage</h2>
                  <p className="text-slate-400 mb-8 leading-relaxed text-sm">
                    In the highly fragmented security and automation market, finding a reliable system integrator is challenging. As a unit of Infygru, we differentiate ourselves not merely by the products we sell, but by the rigorous engineering standards we apply during installation. We do not believe in cost-cutting with inferior cabling or unbranded power supplies that compromise the longevity of expensive Tier-1 hardware.
                  </p>
                  <div className="space-y-4">
                    {[
                      <span key="infygru">Official Unit of <a href="https://infygru.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline">Infygru Private Limited</a></span>,
                      "Compliance-First Approach (Govt & SIPCOT Standards)",
                      "Tier-1 Hardware Partners (Hikvision, Dahua, Matrix)",
                      "Dedicated In-House Engineering & R&amp;D Team",
                      "Comprehensive AMC & Proven After-Sales Support",
                      "State-wide Rapid Service Network in Tamil Nadu"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                        </div>
                        <span className="text-slate-200 font-medium text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-800 p-12 md:p-16 flex flex-col justify-center">
                  <Target className="w-16 h-16 text-brand-blue mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">Our Vision & Mission</h3>
                  <p className="text-slate-400 leading-relaxed text-sm mb-4">
                    <strong>Mission:</strong> To democratize enterprise-grade security and smart automation by pioneering scalable, cost-effective infrastructure solutions without compromising on reliability or data privacy.
                  </p>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    <strong>Vision:</strong> To be recognized as the premier indigenous technology partner for government bodies, multinational corporations, and critical industrial sectors across South India, delivering intelligent ecosystems that ensure absolute asset protection.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 4.5 OUR TECHNICAL PHILOSOPHY & CAPABILITIES (SEO EXPANSION) */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Technical Philosophy</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We approach every site—whether a residential villa or a manufacturing plant—with a mindset rooted in risk-mitigation and future-proofing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 text-sm text-slate-700 leading-relaxed">
            <div>
              <p className="mb-4">
                The core philosophy driving InfySmart is that technology should be an invisible enabler. A surveillance system or an automated gate should work flawlessly in the background, requiring intervention only when a security anomaly occurs. Achieving this requires meticulous site surveying. Before we lay a single cable, our engineers assess lux levels (ambient lighting) for cameras, calculate starting torque requirements for gate motors based on wind resistance and incline, and analyze roof structural integrity for solar panel ballasts.
              </p>
              <p>
                We heavily prioritize network security. With the rise of IoT devices, we ensure that every IP camera, bio-metric scanner, and NVR we deploy sits behind a secure firewall, utilizing strong passwords and firmware-level encryption to prevent unauthorized remote access, keeping our corporate clients compliant with modern data protection regulations.
              </p>
            </div>
            <div>
              <p className="mb-4">
                Furthermore, we recognize that the true test of an integrator is not the day of installation, but the day the equipment fails. Electronic degradation is inevitable in harsh tropical climates. This is why our Service Level Agreements (SLAs) under our Annual Maintenance Contracts (AMCs) are structured to be aggressive. We maintain a substantial inventory of essential spare parts locally, ensuring that if a client&apos;s DVR motherboard fails at 2 AM, a backup unit is deployed the next morning to eliminate critical recording downtime.
              </p>
              <p>
                As an authorized dealer for global giants like Hikvision, Dahua, Matrix, and eSSL, we act as the crucial technical bridge between the manufacturer&apos;s complex R&amp;D and the end-user&apos;s daily operational needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600">Common inquiries about our company and operations.</p>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200">
              <h4 className="text-lg font-bold text-slate-900 mb-2">What is the relationship between InfySmart and Infygru?</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                InfySmart is the dedicated technology brand owned and operated by Infygru Private Limited. All legal contracts, government tenders, billing, and compliances are executed under the registered entity, Infygru Private Limited. InfySmart acts as the consumer and enterprise-facing identity focused specifically on electronics infrastructure.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200">
              <h4 className="text-lg font-bold text-slate-900 mb-2">Do you undertake residential projects, or only commercial/government work?</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                While our primary volume comes from B2B enterprise and government sectors, we enthusiastically undertake premium residential projects. For individual homeowners, we offer specialized services like Smart Home Automation, Video Door Phones for villas, and residential solar roof-top systems under the PM Surya Ghar scheme.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200">
              <h4 className="text-lg font-bold text-slate-900 mb-2">Where is your technical team located?</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our registered corporate office is in Chennai, Tamil Nadu. However, we have decentralized teams and service hubs in key industrial belts including Hosur, Bengaluru, Coimbatore, and Puducherry to ensure rapid response times for our AMC clients across the state.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONTACT & FOOTER CTA */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn direction="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900">Get in Touch</h2>
              <p className="text-slate-600 mt-2">Reach out to our corporate office for consultations and tenders.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Address */}
              <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-slate-100">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-blue">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Registered Office</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  <a href="https://infygru.com" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-brand-blue transition-colors">Infygru Private Limited</a>,<br />
                  Chennai, Tamil Nadu - 600001,<br />
                  India
                </p>
              </div>

              {/* Phone */}
              <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-slate-100">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                  <Phone className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Phone Support</h4>
                <p className="text-slate-600 text-sm mb-1">
                  <a href="tel:+919876543210" className="hover:text-brand-blue transition-colors font-semibold">
                    +91 98765 43210
                  </a>
                </p>
                <p className="text-xs text-slate-400">Mon-Sat 9am to 6pm</p>
              </div>

              {/* Email */}
              <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-slate-100">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                  <Mail className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Email Us</h4>
                <p className="text-slate-600 text-sm mb-1">
                  <a href="mailto:sales@infysmart.com" className="hover:text-brand-blue transition-colors font-semibold">
                    sales@infysmart.com
                  </a>
                </p>
                <p className="text-xs text-slate-400">For Sales & Tenders</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

    </main>
  );
}