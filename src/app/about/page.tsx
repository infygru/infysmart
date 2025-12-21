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
    type: "website"
  },
  alternates: {
    canonical: "https://infysmart.com/about"
  }
};

export default function AboutPage() {
  return (
    <main className="bg-white font-sans text-slate-900">
      
      {/* 1. PREMIUM HERO SECTION */}
      <section className="relative bg-slate-900 py-24 md:py-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-blue-400 text-sm font-bold tracking-wider uppercase mb-8">
            <ShieldCheck className="w-4 h-4" /> Official Brand of Infygru Private Limited
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Engineering Trust. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Securing The Future.
            </span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-slate-300 leading-relaxed">
            Delivering enterprise-grade CCTV, Automation, and Solar infrastructure solutions 
            with precision and long-term reliability for Government and Industrial sectors.
          </p>
        </div>
      </section>

      {/* 2. CORPORATE IDENTITY (Infygru vs InfySmart) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Visual Column */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 transform rotate-2 rounded-2xl opacity-10"></div>
              <div className="relative bg-slate-50 p-10 rounded-2xl border border-slate-200 shadow-xl">
                <Building2 className="w-16 h-16 text-slate-800 mb-6" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Infygru Private Limited</h3>
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
            </div>

            {/* Content Column */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                A Unified Vision for <br />
                <span className="text-blue-600">Smart Infrastructure</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                <strong>InfySmart</strong> is the specialized operating unit of <strong>Infygru Private Limited</strong>. 
                While Infygru provides the corporate backbone and compliance framework required for large-scale projects, 
                InfySmart brings the technical expertise and agile execution teams needed on the ground.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                This structure allows us to serve massive government mandates and corporate requirements with 
                the speed of a tech company and the stability of a registered corporation.
              </p>
              
              <div className="border-l-4 border-blue-600 pl-6 py-2 bg-slate-50 rounded-r-lg">
                <p className="text-slate-700 italic font-medium">
                  "We don't just install technology; we engineer ecosystems that protect assets and optimize operations."
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SECTORS OF EXPERTISE */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Sectors</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We focus on high-stakes environments where security failures are not an option.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Government */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 group">
              <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <Landmark className="w-7 h-7 text-blue-600 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Government & PSUs</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Executing state-wide surveillance projects, municipal monitoring systems, and public infrastructure 
                upgrades with strict adherence to tender specifications and ISI/BIS standards.
              </p>
            </div>

            {/* Industrial */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 group">
              <div className="w-14 h-14 bg-orange-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors">
                <Factory className="w-7 h-7 text-orange-600 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Industrial Complexes</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Ruggedized surveillance for factories, perimeter protection for warehouses, and 
                high-temperature camera systems for manufacturing units like TNPL.
              </p>
            </div>

            {/* Corporate */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 group">
              <div className="w-14 h-14 bg-purple-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                <Briefcase className="w-7 h-7 text-purple-600 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Corporate Enterprise</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                End-to-end office automation, server room biometric security, and fire safety systems 
                designed for scalability and ease of management for IT Parks and offices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US LIST */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-2">
              <div className="p-12 md:p-16">
                <h2 className="text-3xl font-bold text-white mb-6">The InfySmart Advantage</h2>
                <p className="text-slate-400 mb-8">
                  Why leading organizations trust us with their critical infrastructure.
                </p>
                <div className="space-y-4">
                  {[
                    "Official Unit of Infygru Private Limited",
                    "Compliance-First Approach (Govt Standards)",
                    "Tier-1 Hardware Partners (Hikvision, Dahua, etc.)",
                    "Dedicated In-House Engineering Team",
                    "Comprehensive AMC & After-Sales Support",
                    "State-wide Service Network in Tamil Nadu"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="text-slate-200 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-800 p-12 md:p-16 flex flex-col justify-center">
                 <Target className="w-16 h-16 text-blue-500 mb-6" />
                 <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                 <p className="text-slate-400 leading-relaxed text-lg">
                   To be the premier technology partner for government bodies and enterprises 
                   by delivering secure, intelligent, and sustainable systems that create 
                   long-term operational value and safety.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONTACT & FOOTER CTA */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Get in Touch</h2>
            <p className="text-slate-600 mt-2">Reach out to our corporate office for consultations and tenders.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Address */}
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-slate-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Registered Office</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Infygru Private Limited,<br />
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
                <a href="tel:+919876543210" className="hover:text-blue-600 transition-colors font-semibold">
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
                <a href="mailto:sales@infysmart.com" className="hover:text-blue-600 transition-colors font-semibold">
                  sales@infysmart.com
                </a>
              </p>
              <p className="text-xs text-slate-400">For Sales & Tenders</p>
            </div>
          </div>
        </div>
      </section>
      
    </main>
  );
}