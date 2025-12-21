<<<<<<< HEAD
import { directus, getAssetUrl } from '@/lib/directus';
import { readItems, readSingleton } from '@directus/sdk';
import Hero from '@/components/Hero';
import ClientStrip from '@/components/ClientStrip';
import InfrastructureEcosystem from '@/components/InfrastructureEcosystem';
import WhyChooseUs from '@/components/WhyChooseUs';
import AuthorizedBrands from '@/components/AuthorizedBrands';
import ExecutionProcess from '@/components/ExecutionProcess';
import Footer from '@/components/Footer';
import CurrentProjects from '@/components/CurrentProjects'; // <--- NEW IMPORT

export const revalidate = 60;

export default async function HomePage() {
  // Fetch 'projects' along with other data
  const [settings, services, clients, projects] = await Promise.all([
    directus.request(readSingleton('global_settings')),
    directus.request(readItems('services')),
    directus.request(readItems('clients')),
    directus.request(readItems('projects')) // <--- FETCH PROJECTS
  ]);

  const heroImageUrl = settings?.hero_image 
    ? getAssetUrl(settings.hero_image) 
    : undefined;

  return (
    <main className="min-h-screen bg-slate-50">
      <Hero heroImage={heroImageUrl} />
      <AuthorizedBrands />
      <ClientStrip clients={clients} />
      <InfrastructureEcosystem services={services} />
            {/* Add Current Projects Section Here */}
      <CurrentProjects projects={projects} />     
      <ExecutionProcess />
      <WhyChooseUs />
      <Footer settings={settings} />
    </main>
  );
}
=======
"use client";

import React, { useState, useEffect } from 'react';
import { 
  Shield, Sun, Cpu, CheckCircle, MessageSquare, X, Menu, Phone, 
  MapPin, Mail, ChevronRight, Award, Building, Users, ArrowRight, 
  Zap, Lock, Video, Battery, FileText, Calendar, User, Send,
  PenTool, Wrench, Headphones, Clock, Truck, Factory, Search, Server, Smartphone, Filter
} from 'lucide-react';

// --- TYPESCRIPT INTERFACES ---
interface SectionHeaderProps {
  title: string;
  subtitle: string;
  centered?: boolean;
}

interface BrandStripProps {
  filter?: string;
}

interface HeroProps {
  navigateTo: (page: string) => void;
  onOpenQuote: () => void;
}

interface ProcessProps {
  onOpenQuote: () => void;
}

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  onOpenQuote: () => void;
}

interface FooterProps {
  navigateTo: (page: string) => void;
}

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LegalPageProps {
  type: string;
}

// --- THEME CONFIGURATION ---
const THEME = {
  heroBg: "bg-slate-950",
  sectionBg: "bg-slate-50",
  cardBg: "bg-white",
  darkCard: "bg-slate-900",
  primaryText: "text-slate-900",
  headingText: "text-slate-900",
  lightText: "text-slate-400",
  brandPrimary: "bg-teal-700",
  brandText: "text-teal-700",
  accent: "bg-amber-500",
  accentHover: "hover:bg-amber-600",
  accentText: "text-amber-600",
};

// --- MOCK DATA ---
const DATA = {
  global: {
    siteName: "Infysmart Solutions",
    legalName: "Infygru Private Limited",
    phone: "+91 8300290019",
    email: "sales@infysmart.com",
    address: "16, Murahari street, Sarathi Nagar, Saidapet, Chennai 15",
    announcement: "📢 Offer: Free 1-Year Maintenance for all 5kW+ Solar Installations in Chennai & Kanchipuram!",
  },
  clients: [
    { name: "ISRO", icon: "🚀" },
    { name: "BPCL", icon: "⛽" },
    { name: "TNPL", icon: "🏭" },
    { name: "TN Sugar Mills", icon: "🌾" },
    { name: "Alagappa Univ", icon: "🎓" },
    { name: "TN Govt", icon: "🏛️" },
  ],
  brands: [
    { name: "Hikvision", type: "Security" },
    { name: "Dahua", type: "Security" },
    { name: "CP Plus", type: "Security" },
    { name: "Tata Power", type: "Solar" },
    { name: "Luminous", type: "Solar" },
    { name: "Nice", type: "Automation" },
  ],
  blogs: [
    {
      id: 1,
      title: "Why Ambattur & Guindy Industries are switching to On-Grid Solar?",
      date: "Oct 12, 2023",
      excerpt: "With rising TNEB tariffs, net-metering offers a 3-year ROI for factories in Chennai's industrial estates.",
      category: "Solar Energy"
    },
    {
      id: 2,
      title: "STQC Compliance: Mandatory for TN Government Tenders",
      date: "Nov 05, 2023",
      excerpt: "New government tenders in Tamil Nadu require STQC certified cameras. Learn how we meet these norms.",
      category: "Security"
    },
    {
      id: 3,
      title: "Gate Automation for Apartments in OMR & ECR",
      date: "Dec 01, 2023",
      excerpt: "From sliding gates for factories to swing gates for apartments, explore the best motors for Chennai weather.",
      category: "Automation"
    },
    {
      id: 4,
      title: "Best CCTV Camera Brands for Schools in 2024",
      date: "Jan 15, 2024",
      excerpt: "A comparison of Hikvision vs Dahua for educational institutions focusing on student safety and bus tracking.",
      category: "Security"
    },
    {
      id: 5,
      title: "Understanding Tamil Nadu Solar Subsidy 2024",
      date: "Feb 20, 2024",
      excerpt: "A complete guide to PM Surya Ghar Muft Bijli Yojana and how Chennai homeowners can apply.",
      category: "Solar Energy"
    }
  ]
};

// --- SUB-COMPONENTS ---

const SectionHeader = ({ title, subtitle, centered = true }: SectionHeaderProps) => (
  <div className={`mb-16 ${centered ? 'text-center' : 'text-left'}`}>
    <h2 className={`text-3xl md:text-5xl font-extrabold ${THEME.headingText} mb-6 tracking-tight`}>
      {title}
    </h2>
    <div className={`h-1.5 w-24 ${THEME.accent} ${centered ? 'mx-auto' : ''} mb-6 rounded-full`}></div>
    <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
      {subtitle}
    </p>
  </div>
);

// 1.1 CLIENT LOGO STRIP
const ClientStrip = () => (
  <div className="bg-slate-900 border-b border-slate-800 py-8 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4">
      <p className="text-center text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-6">
        Trusted by Tamil Nadu's Vital Institutions
      </p>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition duration-500">
        {DATA.clients.map((c, i) => (
          <div key={i} className="flex items-center gap-2 text-white font-bold text-lg">
            <span className="text-2xl">{c.icon}</span> {c.name}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// 1.2 BRAND PARTNERS STRIP
const BrandStrip = ({ filter = "All" }: BrandStripProps) => {
  const brands = filter === "All" ? DATA.brands : DATA.brands.filter(b => b.type === filter);
  return (
    <div className="bg-white py-16 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader 
          title="Authorized Brands" 
          subtitle="We only install genuine, warranty-backed hardware from global leaders." 
          centered={true}
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
           {brands.map((b, i) => (
             <div key={i} className="flex flex-col items-center justify-center p-6 border border-slate-100 rounded-xl hover:shadow-lg transition">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-3 text-slate-400 font-bold text-2xl">
                  {b.name[0]}
                </div>
                <span className="font-bold text-slate-700">{b.name}</span>
                <span className="text-xs text-slate-400 uppercase mt-1">{b.type}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

// --- HOME PAGE COMPONENTS ---

// 1. HERO SECTION
const Hero = ({ navigateTo, onOpenQuote }: HeroProps) => (
  <div className={`relative ${THEME.heroBg} min-h-[700px] flex items-center overflow-hidden`}>
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

    <div className="max-w-7xl mx-auto px-4 relative z-10 w-full pt-20 pb-20">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        
        <div className="space-y-8">
          <div className="inline-flex items-center gap-3 bg-slate-900/50 border border-slate-700 rounded-full px-4 py-1.5 backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-slate-300 text-xs font-bold tracking-wider uppercase">ISRO & BPCL Vendor</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
            Secure Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Assets.</span> <br/>
            Power Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Future.</span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
            Tamil Nadu's trusted partner for STQC Compliant CCTV, Industrial Solar Plants, and Advanced Building Automation across Chennai, Madurai, and Coimbatore.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onOpenQuote}
              className={`${THEME.accent} ${THEME.accentHover} text-white px-8 py-4 rounded-lg font-bold text-lg transition shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2`}
            >
              Get Free Site Survey <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => navigateTo('cctv')}
              className="px-8 py-4 rounded-lg font-bold text-white border border-slate-700 hover:bg-slate-800 transition flex items-center justify-center gap-2"
            >
              Our Services <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="hidden lg:grid grid-cols-2 gap-4 relative">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 p-6 rounded-2xl transform translate-y-8 shadow-2xl">
            <div className="h-12 w-12 bg-teal-900/50 rounded-lg flex items-center justify-center mb-4 text-teal-400">
              <Shield size={24} />
            </div>
            <h3 className="text-white font-bold text-xl mb-2">Industrial CCTV</h3>
            <p className="text-slate-400 text-sm">ANPR & Face Recognition systems for Factories in SIPCOT & Guindy.</p>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-600 p-6 rounded-2xl shadow-2xl">
            <div className="h-12 w-12 bg-amber-900/50 rounded-lg flex items-center justify-center mb-4 text-amber-400">
              <Sun size={24} />
            </div>
            <h3 className="text-white font-bold text-xl mb-2">Solar Power</h3>
            <p className="text-slate-400 text-sm">3KW to 100KW Rooftop plants with TNEB Subsidy support.</p>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-600 p-6 rounded-2xl shadow-2xl col-span-2 w-4/5 mx-auto -mt-4 z-10">
            <div className="flex items-center gap-4">
               <div className="h-10 w-10 bg-indigo-900/50 rounded-lg flex items-center justify-center text-indigo-400"><Cpu size={20}/></div>
               <div>
                  <h3 className="text-white font-bold">Smart Automation</h3>
                  <p className="text-slate-400 text-xs">Gates, Fire Alarms & Access Control</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 1.3 TRUST & STATS STRIP
const HomeStats = () => (
  <div className="bg-teal-900 text-white py-12 border-b border-teal-800">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-teal-800">
      <div>
        <div className="text-4xl font-extrabold text-amber-400 mb-1">10+</div>
        <div className="text-xs uppercase tracking-widest font-bold text-teal-200">Years Experience</div>
      </div>
      <div>
        <div className="text-4xl font-extrabold text-amber-400 mb-1">500+</div>
        <div className="text-xs uppercase tracking-widest font-bold text-teal-200">Projects Done</div>
      </div>
      <div>
        <div className="text-4xl font-extrabold text-amber-400 mb-1">38</div>
        <div className="text-xs uppercase tracking-widest font-bold text-teal-200">TN Districts</div>
      </div>
      <div>
        <div className="text-4xl font-extrabold text-amber-400 mb-1">24/7</div>
        <div className="text-xs uppercase tracking-widest font-bold text-teal-200">Support Team</div>
      </div>
    </div>
  </div>
);

// 1.4 PROCESS SECTION
const HomeProcess = ({ onOpenQuote }: ProcessProps) => (
  <div className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <SectionHeader title="Our Execution Process" subtitle="From initial survey in Chennai to lifetime support, we follow a standardized 4-step protocol." />
      
      <div className="grid md:grid-cols-4 gap-8 relative">
        <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 z-0"></div>
        {[
          { icon: <MapPin size={24}/>, title: "1. Site Survey", desc: "Our engineers visit your location (Chennai, Madurai, etc.) to assess requirements." },
          { icon: <PenTool size={24}/>, title: "2. Design & Quote", desc: "We create a custom layout plan and provide a transparent, itemized quotation." },
          { icon: <Wrench size={24}/>, title: "3. Installation", desc: "Professional deployment using STQC certified cables and heavy-duty conduits." },
          { icon: <Headphones size={24}/>, title: "4. AMC Support", desc: "Dedicated maintenance team ensures your systems run with 99.9% uptime." }
        ].map((step, idx) => (
          <div key={idx} className="relative z-10 bg-white p-6 rounded-xl border border-slate-100 shadow-lg hover:-translate-y-2 transition duration-300">
            <div className={`w-14 h-14 ${THEME.brandPrimary} text-white rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-teal-900/20`}>
              {step.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- OTHER PAGES ---

// 2. CCTV PAGE (Updated with AMC)
const CCTVPage = ({ onOpenQuote }: ProcessProps) => (
  <div className="animate-fade-in pb-20">
    <div className="bg-slate-900 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <span className="text-teal-400 font-bold tracking-widest uppercase text-sm mb-2 block">Security Solutions</span>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Advanced Surveillance Systems</h1>
        <p className="text-slate-300 max-w-2xl text-lg">
          We install STQC compliant systems approved for Government tenders. Authorized partners for Hikvision, Dahua, and CP Plus across Tamil Nadu.
        </p>
      </div>
    </div>

    <BrandStrip filter="Security" />

    {/* AMC Callout Section */}
    <div className="bg-amber-50 border-y border-amber-100 py-16">
       <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold uppercase mb-4">
              <Wrench size={14} /> Maintenance Services
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Existing CCTV Not Working?</h2>
            <p className="text-slate-700 text-lg mb-6">
              We offer comprehensive **AMC (Annual Maintenance Contracts)** for Colleges, Factories, and Apartments. Our team revives old systems, replaces faulty DVRs, and upgrades cabling.
            </p>
            <ul className="space-y-2 mb-8">
               <li className="flex gap-2 items-center text-slate-700"><CheckCircle size={16} className="text-teal-600"/> Scheduled Quarterly Checkups</li>
               <li className="flex gap-2 items-center text-slate-700"><CheckCircle size={16} className="text-teal-600"/> Immediate On-Call Support</li>
               <li className="flex gap-2 items-center text-slate-700"><CheckCircle size={16} className="text-teal-600"/> Standby Backup Devices</li>
            </ul>
            <button onClick={onOpenQuote} className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-slate-800">Check AMC Pricing</button>
          </div>
          <div className="relative">
             <div className="absolute inset-0 bg-amber-200 rounded-2xl transform rotate-3"></div>
             <img src="https://placehold.co/600x350/fef3c7/b45309?text=CCTV+Technician+at+Work" className="relative rounded-2xl shadow-lg w-full" alt="AMC" />
          </div>
       </div>
    </div>

    {/* Refined "Why Us" Grid */}
    <div className="max-w-7xl mx-auto px-4 mt-20">
       <SectionHeader title="Premium Installation Standards" subtitle="We don't just fix cameras; we build integrated security infrastructure." />
       
       <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: <Video size={32}/>, 
              title: "High-Fidelity Imaging", 
              desc: "ColorVu & DarkFighter technology ensures crystal clear footage even in 0 Lux pitch darkness.", 
              color: "text-blue-500", bg: "bg-blue-50" 
            },
            { 
              icon: <Search size={32}/>, 
              title: "Intelligent Analytics", 
              desc: "ANPR (Number Plate Recognition), Face Detection, and Line Crossing alerts for automated perimeter security.", 
              color: "text-purple-500", bg: "bg-purple-50" 
            },
            { 
              icon: <Shield size={32}/>, 
              title: "Vandal-Proof Hardware", 
              desc: "IK10 rated casings resistant to impact and IP67 weather-proof cameras perfect for Chennai's humid climate.", 
              color: "text-slate-700", bg: "bg-slate-100" 
            },
            { 
              icon: <Zap size={32}/>, 
              title: "Power Backup Integration", 
              desc: "UPS integration for cameras ensures recording continues even during TNEB power cuts.", 
              color: "text-amber-500", bg: "bg-amber-50" 
            },
            { 
              icon: <Server size={32}/>, 
              title: "365 Days Recording", 
              desc: "Optimized H.265+ compression storage solutions to keep footage for Government mandated durations.", 
              color: "text-teal-600", bg: "bg-teal-50" 
            },
            { 
              icon: <Smartphone size={32}/>, 
              title: "Zero-Latency Remote View", 
              desc: "Cloud P2P networking allows you to monitor your factory or office from anywhere in the world via Mobile App.", 
              color: "text-indigo-500", bg: "bg-indigo-50" 
            }
          ].map((item, idx) => (
             <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition group">
                <div className={`w-16 h-16 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
                   {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
             </div>
          ))}
       </div>

       <div className="mt-16 bg-slate-900 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-white mb-6">Secure Your Premises Today</h3>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">Get a free site survey in Chennai, Madurai, or Coimbatore. Our engineers will design the perfect layout for your blind spots.</p>
            <button onClick={onOpenQuote} className={`${THEME.accent} ${THEME.accentHover} text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg`}>Request Free Site Visit</button>
          </div>
       </div>
    </div>
  </div>
);

// 3. SOLAR PAGE
const SolarPage = ({ onOpenQuote }: ProcessProps) => (
  <div className="animate-fade-in pb-20">
    <div className="bg-slate-900 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <span className="text-amber-400 font-bold tracking-widest uppercase text-sm mb-2 block">Energy Solutions</span>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Industrial Solar Power</h1>
        <p className="text-slate-300 max-w-2xl text-lg">
          Turn your empty rooftop into a power plant. We handle TNEB Net Metering approvals and subsidy documentation for industries in Ambattur & Guindy.
        </p>
      </div>
    </div>

    <BrandStrip filter="Solar" />

    <div className="max-w-7xl mx-auto px-4 mt-16">
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl transition">
          <div className="h-12 w-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mb-6"><Sun size={24}/></div>
          <h3 className="text-xl font-bold mb-3">On-Grid Systems</h3>
          <p className="text-slate-600 mb-4 text-sm">Best for industries. Generate power during the day, export excess to TNEB grid, and reduce monthly bills by up to 90%.</p>
          <ul className="text-sm space-y-2 text-slate-500">
             <li className="flex gap-2"><CheckCircle size={14} className="text-green-500"/> No Batteries required</li>
             <li className="flex gap-2"><CheckCircle size={14} className="text-green-500"/> 3-5 Year ROI</li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl transition">
          <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6"><Battery size={24}/></div>
          <h3 className="text-xl font-bold mb-3">Off-Grid & Hybrid</h3>
          <p className="text-slate-600 mb-4 text-sm">Best for colleges & hospitals. Complete independence from power cuts with Lithium Ferro Phosphate battery backup.</p>
          <ul className="text-sm space-y-2 text-slate-500">
             <li className="flex gap-2"><CheckCircle size={14} className="text-green-500"/> 24/7 Power Backup</li>
             <li className="flex gap-2"><CheckCircle size={14} className="text-green-500"/> Smart Inverter Load Management</li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl transition">
          <div className="h-12 w-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-6"><FileText size={24}/></div>
          <h3 className="text-xl font-bold mb-3">Govt Subsidy</h3>
          <p className="text-slate-600 mb-4 text-sm">We are registered vendors for PM Surya Ghar Muft Bijli Yojana. Get subsidies directly credited to your account.</p>
          <button onClick={onOpenQuote} className="w-full py-2 border border-slate-300 rounded font-bold hover:bg-slate-50 text-sm">Check Eligibility</button>
        </div>
      </div>
    </div>
  </div>
);

// 4. AUTOMATION PAGE
const AutomationPage = ({ onOpenQuote }: ProcessProps) => (
  <div className="animate-fade-in pb-20">
    <div className="bg-slate-900 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <span className="text-indigo-400 font-bold tracking-widest uppercase text-sm mb-2 block">Smart Infrastructure</span>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Building Automation</h1>
        <p className="text-slate-300 max-w-2xl text-lg">
          Integrated systems for access control, fire safety, and convenient entry management for Offices and Apartments.
        </p>
      </div>
    </div>

    <BrandStrip filter="Automation" />

    <div className="max-w-7xl mx-auto px-4 mt-16">
       <div className="grid gap-12">
          {/* Item 1 */}
          <div className="flex flex-col md:flex-row gap-8 items-center border-b border-slate-200 pb-12">
             <div className="md:w-1/2">
                <div className="h-14 w-14 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center mb-6"><Lock size={28}/></div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Gate Automation & Barriers</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                   Heavy-duty motors for industrial sliding gates (up to 2000kg) and swing gates. We also install Boom Barriers with RFID tags for automated vehicle entry in apartments and corporate parks in OMR.
                </p>
                <div className="flex flex-wrap gap-3">
                   <span className="bg-slate-100 px-3 py-1 rounded text-xs font-bold text-slate-600">Remote Control</span>
                   <span className="bg-slate-100 px-3 py-1 rounded text-xs font-bold text-slate-600">RFID Tag</span>
                </div>
             </div>
             <div className="md:w-1/2">
                <img src="https://placehold.co/600x350/e0e7ff/3730a3?text=Automatic+Gates" className="rounded-xl shadow-lg w-full" alt="Gates"/>
             </div>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col md:flex-row-reverse gap-8 items-center border-b border-slate-200 pb-12">
             <div className="md:w-1/2">
                <div className="h-14 w-14 bg-red-100 text-red-700 rounded-xl flex items-center justify-center mb-6"><Zap size={28}/></div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Fire Alarm Systems</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                   Conventional and Addressable fire alarm panels for factories and hospitals. We install smoke detectors, heat detectors, and manual call points (MCP) integrated with hooters.
                </p>
             </div>
             <div className="md:w-1/2">
                <img src="https://placehold.co/600x350/fee2e2/991b1b?text=Fire+Safety" className="rounded-xl shadow-lg w-full" alt="Fire Alarm"/>
             </div>
          </div>
       </div>
    </div>
  </div>
);

// 5. BLOG PAGE
const BlogPage = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredBlogs = DATA.blogs.filter(blog => {
    const matchCategory = filter === 'All' || blog.category === filter;
    const matchSearch = blog.title.toLowerCase().includes(search.toLowerCase()) || blog.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="animate-fade-in pb-20">
      <div className="bg-slate-900 text-white py-20 px-4">
         <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Knowledge Hub</h1>
          <p className="text-slate-300 max-w-xl">Latest updates on Technology, Government Compliance, and Energy Efficiency in Tamil Nadu.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
         <div className="bg-white rounded-xl shadow-xl p-6 border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 w-full md:w-96">
               <Search size={20} className="text-slate-400"/>
               <input 
                 type="text" 
                 placeholder="Search articles..." 
                 className="bg-transparent outline-none w-full text-slate-700"
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
               />
            </div>
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
               {['All', 'Security', 'Solar Energy', 'Automation'].map(cat => (
                 <button 
                   key={cat}
                   onClick={() => setFilter(cat)}
                   className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition ${filter === cat ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                 >
                   {cat}
                 </button>
               ))}
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 grid md:grid-cols-3 gap-8">
        {filteredBlogs.length > 0 ? filteredBlogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition group cursor-pointer flex flex-col">
             <div className="h-48 bg-slate-200 relative overflow-hidden">
               <img src={`https://placehold.co/600x400/f1f5f9/334155?text=${blog.category}`} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={blog.title}/>
               <span className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded text-xs font-bold text-slate-900">{blog.category}</span>
             </div>
             <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                   <Calendar size={14}/> {blog.date}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-700 transition line-clamp-2">{blog.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">{blog.excerpt}</p>
                <span className="text-teal-600 font-bold text-sm flex items-center gap-1 mt-auto">Read More <ArrowRight size={16}/></span>
             </div>
          </div>
        )) : (
          <div className="col-span-3 text-center py-20 text-slate-500">
             <p className="text-lg">No articles found matching your criteria.</p>
             <button onClick={() => {setFilter('All'); setSearch('')}} className="text-teal-600 font-bold mt-2">Clear Filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

// 6. LEGAL PAGE
const LegalPage = ({ type }: LegalPageProps) => {
  const titles: Record<string, string> = {
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    cookies: "Cookie Policy"
  };

  return (
    <div className="animate-fade-in pb-20">
      <div className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{titles[type]}</h1>
          <p className="text-slate-400">Last Updated: March 2024</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 mt-12 prose prose-slate">
         {type === 'privacy' && (
           <>
             <h3>1. Information We Collect</h3>
             <p>We collect information you provide directly to us, such as when you fill out a quote form, including your name, email address, phone number, and site location.</p>
             <h3>2. How We Use Information</h3>
             <p>We use the information to provide, maintain, and improve our services, specifically to contact you regarding your installation inquiries in Tamil Nadu.</p>
           </>
         )}
         {type === 'terms' && (
           <>
             <h3>1. Acceptance of Terms</h3>
             <p>By accessing our website, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
             <h3>2. Service Availability</h3>
             <p>Our installation services are currently available only within the state of Tamil Nadu, India.</p>
           </>
         )}
         {type === 'cookies' && (
           <>
             <h3>1. What are Cookies?</h3>
             <p>Cookies are small data files stored on your device that help us improve our services and your experience.</p>
             <h3>2. Analytics</h3>
             <p>We use cookies to understand how you interact with our website to optimize our content for better user experience.</p>
           </>
         )}
         <div className="mt-12 p-6 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-sm text-slate-500 font-bold">Legal Entity:</p>
            <p className="text-slate-700">Infysmart Solutions is a registered trading brand of <span className="font-bold">Infygru Private Limited</span>.</p>
         </div>
      </div>
    </div>
  );
};

// 7. DYNAMIC QUOTE FORM
const QuoteModal = ({ isOpen, onClose }: QuoteModalProps) => {
  const [service, setService] = useState('CCTV');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl animate-fade-in-up my-auto">
        <div className="bg-slate-900 p-6 flex justify-between items-center text-white rounded-t-2xl">
          <div>
            <h3 className="text-xl font-bold">Request a Proposal</h3>
            <p className="text-slate-400 text-sm">Tailored Estimation for {service} solutions.</p>
          </div>
          <button onClick={onClose} className="hover:bg-white/10 p-2 rounded transition"><X size={24}/></button>
        </div>
        
        <form className="p-8 grid md:grid-cols-2 gap-6">
           <div className="col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Select Service Required *</label>
              <div className="grid grid-cols-3 gap-4">
                 {['CCTV', 'Solar', 'Automation'].map(opt => (
                   <label key={opt} className="cursor-pointer">
                      <input 
                        type="radio" 
                        name="service" 
                        className="peer sr-only" 
                        checked={service === opt}
                        onChange={() => setService(opt)}
                      />
                      <div className="text-center py-3 border border-slate-200 rounded-lg peer-checked:bg-teal-50 peer-checked:border-teal-500 peer-checked:text-teal-700 font-bold transition hover:bg-slate-50">
                        {opt}
                      </div>
                   </label>
                 ))}
              </div>
           </div>

           {/* Dynamic Fields based on Service */}
           {service === 'CCTV' && (
             <>
               <div className="col-span-1">
                 <label className="block text-sm font-bold text-slate-700 mb-2">Approx. No. of Cameras</label>
                 <select className="w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-teal-500">
                    <option>1 - 4 (Home/Small Office)</option>
                    <option>4 - 16 (Office/Shop)</option>
                    <option>16 - 64 (Industry/College)</option>
                    <option>64+ (Large Campus)</option>
                 </select>
               </div>
               <div className="col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Storage Required (Days)</label>
                  <input type="number" className="w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-teal-500" placeholder="e.g. 15, 30, 90"/>
               </div>
             </>
           )}

           {service === 'Solar' && (
             <>
               <div className="col-span-1">
                 <label className="block text-sm font-bold text-slate-700 mb-2">Avg Monthly Electricity Bill (₹)</label>
                 <input type="number" className="w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-teal-500" placeholder="e.g. 15000"/>
               </div>
               <div className="col-span-1">
                 <label className="block text-sm font-bold text-slate-700 mb-2">Connection Type</label>
                 <select className="w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-teal-500">
                    <option>Domestic (Home)</option>
                    <option>Commercial (Shop/Office)</option>
                    <option>Industrial (Factory)</option>
                 </select>
               </div>
             </>
           )}

           {service === 'Automation' && (
             <div className="col-span-2">
                 <label className="block text-sm font-bold text-slate-700 mb-2">Requirement Type</label>
                 <select className="w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-teal-500">
                    <option>Sliding Gate Motor</option>
                    <option>Boom Barrier for Apartment</option>
                    <option>Biometric Attendance System</option>
                    <option>Video Door Phone (VDP)</option>
                    <option>Fire Alarm System</option>
                 </select>
             </div>
           )}

           {/* Standard Contact Fields */}
           <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Full Name *</label>
              <div className="relative">
                 <User size={18} className="absolute left-3 top-3 text-slate-400"/>
                 <input type="text" className="w-full pl-10 border border-slate-200 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-teal-500" placeholder="Your Name"/>
              </div>
           </div>

           <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number *</label>
              <div className="relative">
                 <Phone size={18} className="absolute left-3 top-3 text-slate-400"/>
                 <input type="tel" className="w-full pl-10 border border-slate-200 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-teal-500" placeholder="+91"/>
              </div>
           </div>

           <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Organization/Building Name</label>
              <div className="relative">
                 <Building size={18} className="absolute left-3 top-3 text-slate-400"/>
                 <input type="text" className="w-full pl-10 border border-slate-200 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-teal-500" placeholder="Company Name"/>
              </div>
           </div>

           <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Site Location</label>
              <div className="relative">
                 <MapPin size={18} className="absolute left-3 top-3 text-slate-400"/>
                 <input type="text" className="w-full pl-10 border border-slate-200 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-teal-500" placeholder="Area (e.g. Guindy, Velachery)"/>
              </div>
           </div>

           <div className="col-span-2">
             <button type="button" onClick={() => { alert('Request Sent!'); onClose(); }} className={`w-full ${THEME.brandPrimary} text-white font-bold py-4 rounded-lg hover:bg-teal-800 transition shadow-lg`}>
                Get Free Quote
             </button>
             <p className="text-center text-xs text-slate-400 mt-4">Our engineers from Saidapet will contact you within 2 hours.</p>
           </div>
        </form>
      </div>
    </div>
  );
};

// 8. ADVANCED CHATBOT
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! Welcome to Infysmart Solutions. Are you looking for CCTV, Solar, or Automation?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages([...messages, { type: 'user', text: userMsg }]);
    setInput('');

    // Simple Logic Tree
    setTimeout(() => {
       let botReply = "";
       const lower = userMsg.toLowerCase();

       if (lower.includes("cctv") || lower.includes("camera")) {
          botReply = "For CCTV, do you need it for Home, Office, or Industrial Factory?";
       } else if (lower.includes("solar")) {
          botReply = "Great. Are you interested in On-Grid (Bill Reduction) or Off-Grid (Battery Backup)?";
       } else if (lower.includes("automation") || lower.includes("gate")) {
          botReply = "We offer Gate Motors, Fire Alarms, and Biometrics. Which one interests you?";
       } else if (lower.includes("price") || lower.includes("cost") || lower.includes("quote")) {
          botReply = "Pricing depends on site conditions. Please share your Phone Number, and our engineer will call you.";
       } else if (/\d{10}/.test(userMsg)) {
          botReply = "Thank you! We have noted your number. Our team will contact you within 2 hours.";
       } else {
          botReply = "I understand. Could you please provide your site location or phone number so an expert can guide you?";
       }
       
       setMessages(prev => [...prev, { type: 'bot', text: botReply }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-80 mb-4 border border-slate-200 overflow-hidden animate-fade-in-up">
          <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xs">IS</div>
               <span className="font-bold text-sm">Support Agent</span>
            </div>
            <button onClick={() => setIsOpen(false)}><X size={18}/></button>
          </div>
          <div className="h-80 bg-slate-50 p-4 overflow-y-auto space-y-3">
             {messages.map((m, i) => (
                <div key={i} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[85%] p-3 rounded-xl text-sm ${m.type === 'user' ? 'bg-teal-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'}`}>
                      {m.text}
                   </div>
                </div>
             ))}
          </div>
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)}
              placeholder="Type here..." 
              className="flex-1 bg-slate-100 p-2.5 rounded-lg text-sm outline-none focus:ring-1 focus:ring-teal-500"
            />
            <button type="submit" className="bg-teal-600 text-white p-2.5 rounded-lg hover:bg-teal-700"><Send size={16}/></button>
          </form>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-full shadow-lg shadow-teal-900/30 transition hover:scale-110 flex items-center justify-center gap-2"
      >
        {isOpen ? <X size={24}/> : <><MessageSquare size={24}/> <span className="font-bold pr-1 hidden md:inline">Chat</span></>}
      </button>
    </div>
  );
};

// --- LAYOUT SHELL ---

const Navbar = ({ activePage, setActivePage, onOpenQuote }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-slate-900/95 backdrop-blur-md text-white sticky top-0 z-40 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActivePage('home')}>
             <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(20,184,166,0.5)]">
                <Shield className="text-white" size={24} />
             </div>
             <div>
               <span className="block text-2xl font-bold tracking-tight">INFYSMART</span>
             </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => setActivePage('home')} className={`text-sm font-bold uppercase hover:text-teal-400 transition ${activePage === 'home' ? 'text-teal-400' : 'text-slate-300'}`}>Home</button>
            
            {/* Services Dropdown Trigger */}
            <div className="relative group">
               <button className="text-sm font-bold uppercase flex items-center gap-1 text-slate-300 group-hover:text-teal-400 py-6">
                 Services <ChevronRight size={14} className="rotate-90"/>
               </button>
               <div className="absolute top-full left-0 w-48 bg-white text-slate-800 rounded-lg shadow-xl overflow-hidden hidden group-hover:block border-t-4 border-teal-500">
                  <button onClick={() => setActivePage('cctv')} className="block w-full text-left px-4 py-3 hover:bg-slate-50 text-sm font-semibold border-b">CCTV Systems</button>
                  <button onClick={() => setActivePage('solar')} className="block w-full text-left px-4 py-3 hover:bg-slate-50 text-sm font-semibold border-b">Solar Power</button>
                  <button onClick={() => setActivePage('automation')} className="block w-full text-left px-4 py-3 hover:bg-slate-50 text-sm font-semibold">Automation</button>
               </div>
            </div>

            <button onClick={() => setActivePage('blog')} className={`text-sm font-bold uppercase hover:text-teal-400 transition ${activePage === 'blog' ? 'text-teal-400' : 'text-slate-300'}`}>Blog</button>
            
            <button 
              onClick={onOpenQuote}
              className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded font-bold transition shadow-lg shadow-amber-900/50"
            >
              Get Quote
            </button>
          </div>

          {/* Mobile Menu Btn */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}><Menu /></button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 p-4">
          <button onClick={() => {setActivePage('home'); setIsMenuOpen(false)}} className="block w-full text-left py-3 font-bold border-b border-slate-800 text-slate-300">Home</button>
          <button onClick={() => {setActivePage('cctv'); setIsMenuOpen(false)}} className="block w-full text-left py-3 font-bold border-b border-slate-800 text-slate-300">CCTV Services</button>
          <button onClick={() => {setActivePage('solar'); setIsMenuOpen(false)}} className="block w-full text-left py-3 font-bold border-b border-slate-800 text-slate-300">Solar Power</button>
          <button onClick={() => {setActivePage('automation'); setIsMenuOpen(false)}} className="block w-full text-left py-3 font-bold border-b border-slate-800 text-slate-300">Automation</button>
          <button onClick={() => {setActivePage('blog'); setIsMenuOpen(false)}} className="block w-full text-left py-3 font-bold border-b border-slate-800 text-slate-300">Blog</button>
        </div>
      )}
    </nav>
  );
};

const Footer = ({ navigateTo }: FooterProps) => (
  <footer className="bg-slate-950 text-slate-400 pt-20 pb-10 border-t border-slate-900">
    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12 mb-12">
      <div className="col-span-1 md:col-span-2">
        <h4 className="text-white font-bold text-3xl mb-4 tracking-tight">INFYSMART</h4>
        <p className="mb-6 max-w-sm">
          A Brand of <strong>Infygru Private Limited</strong>.<br/>
          Bridging the gap between government compliance and advanced technology.
        </p>
        <div className="flex gap-4">
           <span className="bg-slate-900 border border-slate-800 px-3 py-1 rounded text-xs font-bold text-teal-500">GEM Registered</span>
           <span className="bg-slate-900 border border-slate-800 px-3 py-1 rounded text-xs font-bold text-amber-500">STQC Compliant</span>
        </div>
      </div>
      <div>
        <h5 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Quick Links</h5>
        <ul className="space-y-3 text-sm">
          <li><button onClick={() => navigateTo('cctv')} className="hover:text-teal-400 transition">Industrial CCTV</button></li>
          <li><button onClick={() => navigateTo('solar')} className="hover:text-teal-400 transition">Solar Plants</button></li>
          <li><button onClick={() => navigateTo('automation')} className="hover:text-teal-400 transition">Gate Automation</button></li>
          <li><button onClick={() => navigateTo('blog')} className="hover:text-teal-400 transition">Latest News</button></li>
        </ul>
      </div>
      <div>
        <h5 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Contact</h5>
        <ul className="space-y-4 text-sm">
          <li className="flex gap-3"><MapPin size={18} className="text-amber-500 shrink-0"/> {DATA.global.address}</li>
          <li className="flex gap-3"><Phone size={18} className="text-amber-500 shrink-0"/> {DATA.global.phone}</li>
          <li className="flex gap-3"><Mail size={18} className="text-amber-500 shrink-0"/> {DATA.global.email}</li>
        </ul>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
      <div>
        &copy; {new Date().getFullYear()} Infygru Private Limited. All Rights Reserved.
      </div>
      <div className="flex gap-6">
        <button onClick={() => navigateTo('privacy')} className="hover:text-teal-500 transition">Privacy Policy</button>
        <button onClick={() => navigateTo('terms')} className="hover:text-teal-500 transition">Terms of Service</button>
        <button onClick={() => navigateTo('cookies')} className="hover:text-teal-500 transition">Cookie Policy</button>
      </div>
    </div>
    <div className="text-center text-[10px] text-slate-700 mt-4">
      Infysmart Solutions is a registered trading brand of Infygru Private Limited.
    </div>
  </footer>
);

const App = () => {
  const [activePage, setActivePage] = useState('home'); 
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  return (
    <div className="font-sans text-slate-900 min-h-screen flex flex-col selection:bg-teal-200 selection:text-teal-900">
      <Navbar activePage={activePage} setActivePage={setActivePage} onOpenQuote={() => setIsQuoteOpen(true)} />
      
      <main className="flex-grow">
        {activePage === 'home' && (
          <>
            <Hero navigateTo={setActivePage} onOpenQuote={() => setIsQuoteOpen(true)} />
            <ClientStrip />
            <HomeStats />
            <BrandStrip filter="All" />
            <HomeProcess onOpenQuote={() => setIsQuoteOpen(true)} />
          </>
        )}
        {activePage === 'cctv' && <CCTVPage onOpenQuote={() => setIsQuoteOpen(true)} />}
        {activePage === 'solar' && <SolarPage onOpenQuote={() => setIsQuoteOpen(true)} />}
        {activePage === 'automation' && <AutomationPage onOpenQuote={() => setIsQuoteOpen(true)} />}
        {activePage === 'blog' && <BlogPage />}
        
        {/* Legal Pages */}
        {(activePage === 'privacy' || activePage === 'terms' || activePage === 'cookies') && (
          <LegalPage type={activePage} />
        )}
      </main>

      <Footer navigateTo={setActivePage} />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
      <Chatbot />
    </div>
  );
};

export default App;
>>>>>>> 77bd4f21ae6f899b48680ec69e65e85793de4e8e
