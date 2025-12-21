import { directus } from '@/lib/directus';
import { readItems, readSingleton } from '@directus/sdk';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { 
  Sun, 
  Zap, 
  BatteryCharging, 
  IndianRupee, 
  Factory, 
  CheckCircle2, 
  Leaf,
  Home,
  Building2,
  TrendingUp,
  MapPin,
  Truck,
  FileText,
  Settings,
  ShieldCheck
} from 'lucide-react';

export const revalidate = 60;

// 1. Interface for Type Safety
interface Service {
  title: string;
  description: string;
  icon: string;
  slug: string;
}

export default async function SolarPage() {
  const [settings, services] = await Promise.all([
    directus.request(readSingleton('global_settings')),
    directus.request(readItems('services', {
      filter: { slug: { _eq: 'solar' } },
      limit: 1
    }))
  ]);

  // 2. Double-cast to fix TypeScript error
  const service = services[0] as unknown as Service | undefined;
  
  // Fallback Description
  const description = service?.description || "High-efficiency solar power plants for homes and industries.";

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900">

      {/* 1. HERO SECTION (SEO H1) */}
      <section className="relative h-[75vh] flex items-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <Image 
             src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2070&auto=format&fit=crop" 
             alt="Best Solar Panel Installation Company in Tamil Nadu Chennai Coimbatore" 
             fill 
             className="object-cover opacity-30"
             priority
           />
           <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 text-xs font-bold uppercase tracking-widest mb-6">
              <Sun className="w-3 h-3" /> Premier Solar EPC Partner
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Powering Tamil Nadu <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                With Free Solar Energy.
              </span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl">
              From <span className="text-white font-bold">Residential Rooftops in Chennai</span> to <span className="text-white font-bold">MW Scale Industrial Plants in Coimbatore</span>. 
              We are the certified installation partners for Tata Power, Adani, and Waaree.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="bg-yellow-500 text-slate-900 px-8 py-4 rounded-lg font-bold hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/20 text-center">
                Get Quote & ROI Report
              </Link>
              <Link href="#subsidy" className="px-8 py-4 rounded-lg font-bold text-white border border-slate-600 hover:bg-slate-800 transition-colors text-center flex items-center justify-center gap-2">
                <IndianRupee className="w-4 h-4" /> Check PM Surya Ghar Subsidy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. GOVT SUBSIDY (PM Surya Ghar) - High Search Volume Keyword */}
      <section id="subsidy" className="py-12 bg-white border-b border-slate-100">
        <div className="container mx-auto px-6">
           <div className="bg-green-50 border border-green-100 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                 <div className="inline-block bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                   GOVERNMENT SCHEME
                 </div>
                 <h2 className="text-3xl font-bold text-slate-900 mb-4">
                   PM Surya Ghar: Muft Bijli Yojana
                 </h2>
                 <p className="text-slate-700 mb-6 text-lg">
                   The Government of India offers massive subsidies for residential solar. 
                   <strong> Get up to ₹78,000 subsidy</strong> directly to your bank account.
                 </p>
                 <ul className="space-y-3 mb-8">
                   <li className="flex items-center gap-3 text-slate-800 font-medium">
                     <CheckCircle2 className="w-5 h-5 text-green-600" /> Subsidy for systems up to 3kW
                   </li>
                   <li className="flex items-center gap-3 text-slate-800 font-medium">
                     <CheckCircle2 className="w-5 h-5 text-green-600" /> 300 Units of Free Electricity / Month
                   </li>
                   <li className="flex items-center gap-3 text-slate-800 font-medium">
                     <CheckCircle2 className="w-5 h-5 text-green-600" /> We handle Net-Metering Paperwork
                   </li>
                 </ul>
                 <Link href="/contact" className="inline-flex items-center text-green-700 font-bold hover:underline">
                   Apply for Subsidy via InfySmart &rarr;
                 </Link>
              </div>
              <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-lg border border-green-100 text-center">
                 <div className="text-slate-500 text-sm font-bold uppercase mb-2">Estimated Savings</div>
                 <div className="text-5xl font-extrabold text-green-600 mb-2">₹50k+</div>
                 <div className="text-slate-600 font-medium">Per Year on Bills</div>
                 <div className="mt-6 text-xs text-slate-400">*Calculated for a typical 3kW system</div>
              </div>
           </div>
        </div>
      </section>

      {/* 3. LIFECYCLE SERVICES (Concept to Commissioning) */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Concept to Commissioning</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We handle the entire solar lifecycle so you don't have to deal with multiple vendors.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
             {/* Design */}
             <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-yellow-500 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:bg-yellow-500 transition-colors">
                  <Settings className="w-6 h-6 text-yellow-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Engineering & Design</h3>
                <p className="text-sm text-slate-600">
                  Shadow analysis and structural engineering to ensure maximum sunlight capture and safety.
                </p>
             </div>

             {/* Installation */}
             <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-yellow-500 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:bg-yellow-500 transition-colors">
                  <Sun className="w-6 h-6 text-yellow-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">EPC Installation</h3>
                <p className="text-sm text-slate-600">
                  Installation using galvanized high-rise structures (wind resistant up to 150kmph).
                </p>
             </div>

             {/* Approvals */}
             <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-yellow-500 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:bg-yellow-500 transition-colors">
                  <FileText className="w-6 h-6 text-yellow-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Net Metering</h3>
                <p className="text-sm text-slate-600">
                  We handle the complete liaison with TNEB (TANGEDCO) for meter approvals and subsidy release.
                </p>
             </div>

             {/* Maintenance */}
             <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-yellow-500 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:bg-yellow-500 transition-colors">
                  <ShieldCheck className="w-6 h-6 text-yellow-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Cleaning & AMC</h3>
                <p className="text-sm text-slate-600">
                  Regular panel cleaning services and inverter maintenance to maintain 100% generation efficiency.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* 4. DYNAMIC CONTENT & TECHNOLOGY */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
           <div>
             <span className="text-brand-orange font-bold text-sm tracking-wide uppercase mb-2 block">Premium Components Only</span>
             <h2 className="text-3xl font-bold text-slate-900 mb-6">Tier-1 Technology</h2>
             <div className="prose prose-lg prose-slate text-slate-600 leading-relaxed">
               <div dangerouslySetInnerHTML={{ __html: description }} />
             </div>
             
             <div className="mt-8 space-y-4">
               <div className="flex items-start gap-4">
                 <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <Sun className="w-5 h-5 text-slate-700" />
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-900">Mono-PERC Half Cut Panels</h4>
                    <p className="text-sm text-slate-500">Highest efficiency panels (540W+) that generate power even in low light or cloudy weather.</p>
                 </div>
               </div>
               <div className="flex items-start gap-4">
                 <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 text-slate-700" />
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-900">Smart Inverters</h4>
                    <p className="text-sm text-slate-500">Wi-Fi enabled inverters (Growatt, Solis) to track your daily generation and savings on your mobile.</p>
                 </div>
               </div>
             </div>
           </div>

           {/* Elevated Structure Visual */}
           <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-yellow-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
              
              <h3 className="text-2xl font-bold mb-6">Commercial & Industrial</h3>
              <p className="text-slate-300 mb-6">
                We specialize in MW scale plants for factories, textile mills, and educational institutions across Tamil Nadu.
              </p>
              <ul className="space-y-6">
                <li className="flex gap-4 items-center">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center font-bold text-sm">1</div>
                  <span>Accelerated Depreciation (AD) Tax Benefits (40%)</span>
                </li>
                <li className="flex gap-4 items-center">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center font-bold text-sm">2</div>
                  <span>ROI in just 3-4 Years</span>
                </li>
                <li className="flex gap-4 items-center">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center font-bold text-sm">3</div>
                  <span>Reduce Carbon Footprint for Green Ratings</span>
                </li>
              </ul>

              <div className="mt-8 pt-8 border-t border-slate-700">
                <p className="text-slate-400 text-sm mb-2">Our Technology Partners:</p>
                <div className="flex gap-6 font-bold text-slate-300 text-lg flex-wrap">
                  <span>Tata Power</span>
                  <span>Adani</span>
                  <span>Waaree</span>
                  <span>Havells</span>
                  <span>Luminous</span>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* 5. TAMIL NADU LOCAL SEO BLOCK */}
      <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Regional Hubs */}
            <div>
               <div className="flex items-center gap-3 mb-6">
                 <Truck className="w-8 h-8 text-blue-600" />
                 <h2 className="text-2xl font-bold text-slate-900">We Serve All Districts</h2>
               </div>
               <p className="text-slate-600 mb-6 leading-relaxed">
                 InfySmart has a dedicated logistics and installation network covering every major district in Tamil Nadu. We execute projects for residential villas, farmhouses, and industrial estates.
               </p>
               <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                 <h4 className="font-bold text-slate-900 mb-4 border-b pb-2">Active Project Locations:</h4>
                 <div className="grid grid-cols-2 gap-y-2 text-sm text-slate-600 font-medium">
                    <span className="hover:text-blue-600 cursor-pointer">• Chennai</span>
                    <span className="hover:text-blue-600 cursor-pointer">• Coimbatore</span>
                    <span className="hover:text-blue-600 cursor-pointer">• Madurai</span>
                    <span className="hover:text-blue-600 cursor-pointer">• Trichy</span>
                    <span className="hover:text-blue-600 cursor-pointer">• Salem</span>
                    <span className="hover:text-blue-600 cursor-pointer">• Tirunelveli</span>
                    <span className="hover:text-blue-600 cursor-pointer">• Erode</span>
                    <span className="hover:text-blue-600 cursor-pointer">• Vellore</span>
                    <span className="hover:text-blue-600 cursor-pointer">• Tiruppur</span>
                    <span className="hover:text-blue-600 cursor-pointer">• Thanjavur</span>
                 </div>
               </div>
            </div>

            {/* Application Types */}
            <div>
               <div className="flex items-center gap-3 mb-6">
                 <Building2 className="w-8 h-8 text-orange-600" />
                 <h2 className="text-2xl font-bold text-slate-900">Customized Applications</h2>
               </div>
               <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex items-start gap-4">
                    <Home className="w-6 h-6 text-green-600 shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-900">Residential Rooftops</h4>
                      <p className="text-sm text-slate-500">1kW to 10kW On-Grid systems with Net Metering.</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex items-start gap-4">
                    <Factory className="w-6 h-6 text-orange-600 shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-900">Industrial Sheds</h4>
                      <p className="text-sm text-slate-500">Lightweight mounting structures for metal roofs.</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex items-start gap-4">
                    <Leaf className="w-6 h-6 text-yellow-600 shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-900">Solar Water Pumps</h4>
                      <p className="text-sm text-slate-500">Off-grid pumping solutions for agriculture.</p>
                    </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="py-20 bg-slate-900 text-white border-t border-slate-800">
        <div className="container mx-auto px-6 text-center max-w-4xl">
           <h2 className="text-3xl font-bold mb-6">Switch to Solar Today</h2>
           <p className="text-slate-400 mb-8 text-lg">
             Join 1000+ satisfied customers across Tamil Nadu. Stop renting electricity from the grid, start owning it.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link href="/contact" className="bg-yellow-500 text-slate-900 px-10 py-4 rounded-full font-bold hover:bg-yellow-400 transition-all">
               Request Free Site Survey
             </Link>
             <Link href="tel:+919876543210" className="bg-transparent border border-white text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
               Calculate Savings
             </Link>
           </div>
        </div>
      </section>

      <Footer settings={settings} />
    </main>
  );
}