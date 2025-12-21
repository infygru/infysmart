import { directus } from '@/lib/directus';
import { readItems, readSingleton } from '@directus/sdk';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { 
  Shield, 
  Eye, 
  Wrench, 
  MapPin, 
  CheckCircle2, 
  Settings,
  Truck,
  ShoppingCart,
  HardDrive
} from 'lucide-react';

export const revalidate = 60;

// 1. Define Interface
interface Service {
  title: string;
  description: string;
  icon: string;
  slug: string;
}

export default async function CCTVPage() {
  const [settings, services] = await Promise.all([
    directus.request(readSingleton('global_settings')),
    directus.request(readItems('services', {
      filter: { slug: { _eq: 'cctv' } },
      limit: 1
    }))
  ]);

  // 2. FIX: Use 'as unknown as Service' to bypass the strict check
  const service = services[0] as unknown as Service | undefined;
  
  // Fallback content
  const description = service?.description || "Advanced security camera solutions for homes, businesses, and industrial facilities.";

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900">

      {/* 1. HERO SECTION (SEO Optimized H1) */}
      <section className="relative h-[75vh] flex items-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <Image 
             src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2070&auto=format&fit=crop" 
             alt="Best CCTV Camera Installation Service in Chennai Tamil Nadu" 
             fill 
             className="object-cover opacity-20"
             priority
           />
           <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/50 border border-blue-700 text-blue-300 text-xs font-bold uppercase tracking-widest mb-6">
              <Eye className="w-3 h-3" /> Sales • Installation • Service • AMC
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Total Surveillance Solutions <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Across Tamil Nadu.
              </span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl">
              From residential IP cameras in Chennai to industrial surveillance projects in Coimbatore. 
              We are the authorized dealers and certified installers for Hikvision, Dahua, and CP Plus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/50 text-center">
                Book Free Site Visit
              </Link>
              <Link href="tel:+919876543210" className="px-8 py-4 rounded-lg font-bold text-white border border-slate-600 hover:bg-slate-800 transition-colors text-center">
                Call for Repair / AMC
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR 4-STEP SERVICE MODEL (Sales -> Install -> Service -> AMC) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Complete Lifecycle Support</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We don't just sell boxes. We provide end-to-end security ownership.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
             {/* Sales */}
             <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:border-blue-500 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:bg-blue-600 transition-colors">
                  <ShoppingCart className="w-6 h-6 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Sales & Supply</h3>
                <p className="text-sm text-slate-600">
                  Wholesale pricing on Cameras, DVRs, NVRs, and Hard Disks. Authorized dealers for top brands.
                </p>
             </div>

             {/* Installation */}
             <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:border-blue-500 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:bg-blue-600 transition-colors">
                  <Settings className="w-6 h-6 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Pro Installation</h3>
                <p className="text-sm text-slate-600">
                  Neat structured cabling, strategic camera positioning for zero blind spots, and mobile config.
                </p>
             </div>

             {/* Service */}
             <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:border-blue-500 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:bg-blue-600 transition-colors">
                  <Wrench className="w-6 h-6 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Repair & Service</h3>
                <p className="text-sm text-slate-600">
                  Camera offline? HDD not recording? Our technicians provide quick on-site troubleshooting.
                </p>
             </div>

             {/* AMC */}
             <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:border-blue-500 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:bg-blue-600 transition-colors">
                  <Shield className="w-6 h-6 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">AMC Packages</h3>
                <p className="text-sm text-slate-600">
                  Annual Maintenance Contracts for apartments and offices to ensure 24/7 system uptime.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC CONTENT (Overview) */}
      <section className="py-20 container mx-auto px-6 border-t border-slate-200">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
           <div>
             <span className="text-brand-orange font-bold text-sm tracking-wide uppercase mb-2 block">Why Choose InfySmart?</span>
             <h2 className="text-3xl font-bold text-slate-900 mb-6">Technology That Protects</h2>
             <div className="prose prose-lg prose-slate text-slate-600 leading-relaxed">
               <div dangerouslySetInnerHTML={{ __html: description }} />
             </div>
             
             <div className="mt-8">
               <div className="flex items-center gap-3 mb-3">
                 <CheckCircle2 className="text-green-500 w-5 h-5" />
                 <span className="font-semibold text-slate-800">Night Vision & ColorVu Technology</span>
               </div>
               <div className="flex items-center gap-3 mb-3">
                 <CheckCircle2 className="text-green-500 w-5 h-5" />
                 <span className="font-semibold text-slate-800">Face Detection & Intrusion Alarms</span>
               </div>
               <div className="flex items-center gap-3">
                 <CheckCircle2 className="text-green-500 w-5 h-5" />
                 <span className="font-semibold text-slate-800">Cloud Storage & Remote Playback</span>
               </div>
             </div>
           </div>

           {/* Tech Visual */}
           <div className="relative h-96 bg-slate-900 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center group">
              {/* Overlay Pattern */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
              
              <div className="text-center relative z-10">
                 <HardDrive className="w-20 h-20 text-blue-500 mx-auto mb-4 animate-pulse" />
                 <h3 className="text-2xl font-bold text-white">Smart Monitoring</h3>
                 <p className="text-slate-400 mt-2">Access footage from anywhere in the world</p>
              </div>
           </div>
        </div>
      </section>

      {/* 4. SEO LOCATION BLOCK (Chennai & Tamil Nadu) */}
      <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Chennai Local Service */}
            <div>
               <div className="flex items-center gap-3 mb-6">
                 <MapPin className="w-8 h-8 text-red-600" />
                 <h2 className="text-2xl font-bold text-slate-900">Chennai Service Network</h2>
               </div>
               <p className="text-slate-600 mb-6 leading-relaxed">
                 Looking for <strong>"CCTV installation near me"</strong>? We have rapid-response technicians stationed across key zones in Chennai for quick installation and repair services.
               </p>
               <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                 <h4 className="font-bold text-slate-900 mb-4 border-b pb-2">We Serve Your Neighborhood:</h4>
                 <div className="grid grid-cols-2 gap-y-2 text-sm text-slate-600">
                    <span className="hover:text-blue-600 cursor-pointer">• Saidapet</span>
                    <span className="hover:text-blue-600 cursor-pointer">• T. Nagar</span>
                    <span className="hover:text-blue-600 cursor-pointer">• Chromepet</span>
                    <span className="hover:text-blue-600 cursor-pointer">• Tambaram</span>
                    <span className="hover:text-blue-600 cursor-pointer">• Velachery</span>
                    <span className="hover:text-blue-600 cursor-pointer">• Guindy</span>
                    <span className="hover:text-blue-600 cursor-pointer">• Adyar</span>
                    <span className="hover:text-blue-600 cursor-pointer">• Porur</span>
                    <span className="hover:text-blue-600 cursor-pointer">• Anna Nagar</span>
                    <span className="hover:text-blue-600 cursor-pointer">• Ambattur</span>
                 </div>
               </div>
            </div>

            {/* Tamil Nadu Projects */}
            <div>
               <div className="flex items-center gap-3 mb-6">
                 <Truck className="w-8 h-8 text-blue-600" />
                 <h2 className="text-2xl font-bold text-slate-900">Projects Across Tamil Nadu</h2>
               </div>
               <p className="text-slate-600 mb-6 leading-relaxed">
                 Infysmart specializes in executing large-scale <strong>Government and Industrial CCTV projects</strong> anywhere in the state. We handle logistics, installation, and commissioning for multi-site requirements.
               </p>
               <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
                 <div className="relative z-10">
                   <h4 className="font-bold text-xl mb-2">Industrial & Govt Tenders</h4>
                   <p className="text-blue-100 text-sm mb-4">
                     Serving Coimbatore, Madurai, Trichy, Salem, and Tirunelveli.
                   </p>
                   <Link href="/contact" className="inline-block bg-white text-blue-900 px-6 py-2 rounded-lg font-bold hover:bg-blue-50 transition-colors text-sm">
                     Request State-wide Quote
                   </Link>
                 </div>
                 {/* Decorative Map BG */}
                 <MapPin className="absolute -bottom-4 -right-4 w-32 h-32 text-blue-500 opacity-30" />
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. BRANDS */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
            Authorized Sales & Service Partners For
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-xl font-bold text-slate-400 grayscale opacity-80">
             <span>Hikvision</span>
             <span>Dahua</span>
             <span>CP Plus</span>
             <span>Honeywell</span>
             <span>Panasonic</span>
             <span>Bosch</span>
          </div>
        </div>
      </section>

      <Footer settings={settings} />
    </main>
  );
}