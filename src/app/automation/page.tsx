import { directus } from '@/lib/directus';
import { readItems, readSingleton } from '@directus/sdk';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Smartphone, 
  Shield, 
  Key, 
  Zap, 
  Settings, 
  CheckCircle2, 
  Building2, 
  Warehouse, 
  MapPin, 
  Truck,
  Wifi,
  Lock,
  Factory // Added this missing import
} from 'lucide-react';

export const revalidate = 60;

// 1. Interface for Type Safety
interface Service {
  title: string;
  description: string;
  icon: string;
  slug: string;
}

export default async function AutomationPage() {
  const [settings, services] = await Promise.all([
    directus.request(readSingleton('global_settings')),
    directus.request(readItems('services', {
      filter: { slug: { _eq: 'automation' } },
      limit: 1
    }))
  ]);

  // 2. Double-cast to fix TypeScript error
  const service = services[0] as unknown as Service | undefined;
  
  // Fallback Description
  const description = service?.description || "Smart automation solutions for gates, shutters, and barriers.";

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900">

      {/* 1. HERO SECTION */}
      <section className="relative h-[75vh] flex items-center bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <Image 
             src="https://images.unsplash.com/photo-1558002038-1091a560eaf3?q=80&w=2000&auto=format&fit=crop" 
             alt="Automatic Gate Motor Installation Chennai Tamil Nadu" 
             fill 
             className="object-cover opacity-30"
             priority
           />
           <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/50 border border-blue-700 text-blue-300 text-xs font-bold uppercase tracking-widest mb-6">
              <Zap className="w-3 h-3" /> Smart Entry Solutions
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Secure & Effortless <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Automation Systems.
              </span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl">
              From <span className="text-white font-bold">Luxury Villas in ECR</span> to <span className="text-white font-bold">Industrial Factories in Sriperumbudur</span>. 
              We install heavy-duty Gate Motors, Rolling Shutters, and Boom Barriers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/50 text-center">
                Get Quote for Motor
              </Link>
              <Link href="tel:+919876543210" className="px-8 py-4 rounded-lg font-bold text-white border border-slate-600 hover:bg-slate-800 transition-colors text-center flex items-center justify-center gap-2">
                <Settings className="w-4 h-4" /> Service & Repair
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE SOLUTIONS GRID */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Complete Entrance Automation</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Upgrade your property with Italian-engineered motors and smart control systems.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             {/* Gate Automation */}
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-500 transition-all group">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <Shield className="w-7 h-7 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Automatic Gates</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  <strong>Sliding & Swing Gates</strong> for homes and offices. Operate via Remote, RFID, or Mobile App. Supports gates up to 2000kg.
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wide">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> Manual Override
                </div>
             </div>

             {/* Rolling Shutters */}
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-purple-500 transition-all group">
                <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                  <Warehouse className="w-7 h-7 text-purple-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Motorized Shutters</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  For shops, garages, and warehouses. Hassle-free operation with key-switch or remote. Heavy-duty motors for durability.
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wide">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> Anti-Drop Safety
                </div>
             </div>

             {/* Boom Barriers */}
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-orange-500 transition-all group">
                <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors">
                  <Lock className="w-7 h-7 text-orange-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Boom Barriers</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  Access control for apartments, malls, and toll plazas. High-speed operation with RFID/Fastag integration capability.
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wide">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> 100% Duty Cycle
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC CONTENT & FEATURES */}
      <section className="py-20 container mx-auto px-6 bg-slate-50">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
           <div>
             <span className="text-brand-orange font-bold text-sm tracking-wide uppercase mb-2 block">Why Automate?</span>
             <h2 className="text-3xl font-bold text-slate-900 mb-6">Convenience Meets Security</h2>
             <div className="prose prose-lg prose-slate text-slate-600 leading-relaxed">
               <div dangerouslySetInnerHTML={{ __html: description }} />
             </div>
             
             <div className="mt-8 space-y-4">
               <div className="flex items-start gap-4">
                 <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-900">App Control</h4>
                    <p className="text-sm text-slate-500">Open your gate for guests even when you are not at home using Wi-Fi modules.</p>
                 </div>
               </div>
               <div className="flex items-start gap-4">
                 <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                    <Key className="w-5 h-5 text-purple-600" />
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-900">Power Failure Backup</h4>
                    <p className="text-sm text-slate-500">All our motors come with a manual release key or battery backup option.</p>
                 </div>
               </div>
             </div>
           </div>

           {/* Feature Visual */}
           <div className="relative bg-slate-900 rounded-2xl p-8 md:p-12 text-white overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
              
              <h3 className="text-2xl font-bold mb-6">Industrial Grade reliability</h3>
              <p className="text-slate-300 mb-8">
                We use oil-bath gear motors for heavy industrial gates ensuring longevity even with continuous usage.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                 <div className="bg-slate-800 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400 mb-1">2000kg</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Max Gate Weight</div>
                 </div>
                 <div className="bg-slate-800 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400 mb-1">3 Sec</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Fast Opening Time</div>
                 </div>
                 <div className="bg-slate-800 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-400 mb-1">IP55</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Waterproof Rating</div>
                 </div>
                 <div className="bg-slate-800 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-400 mb-1">100%</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Copper Motor</div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 4. LOCAL SEO & SERVICE AREA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Chennai Service */}
            <div>
               <div className="flex items-center gap-3 mb-6">
                 <MapPin className="w-8 h-8 text-red-600" />
                 <h2 className="text-2xl font-bold text-slate-900">Automation in Chennai</h2>
               </div>
               <p className="text-slate-600 mb-6 leading-relaxed">
                 We provide quick installation and on-site motor repair services across Chennai. Whether it's a <strong>stuck gate</strong> or a <strong>faulty remote</strong>, our technicians are a call away.
               </p>
               <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                 <h4 className="font-bold text-slate-900 mb-4 border-b pb-2 border-slate-200">Key Service Areas:</h4>
                 <div className="grid grid-cols-2 gap-y-2 text-sm text-slate-600 font-medium">
                    <span className="hover:text-blue-600 cursor-pointer">• ECR & OMR (Villas)</span>
                    <span className="hover:text-blue-600 cursor-pointer">• Anna Nagar</span>
                    <span className="hover:text-blue-600 cursor-pointer">• Adyar / Besant Nagar</span>
                    <span className="hover:text-blue-600 cursor-pointer">• Ambattur Estate</span>
                    <span className="hover:text-blue-600 cursor-pointer">• Guindy Industrial Area</span>
                    <span className="hover:text-blue-600 cursor-pointer">• Velachery</span>
                 </div>
               </div>
            </div>

            {/* Tamil Nadu Projects */}
            <div>
               <div className="flex items-center gap-3 mb-6">
                 <Truck className="w-8 h-8 text-blue-600" />
                 <h2 className="text-2xl font-bold text-slate-900">Industrial Projects TN</h2>
               </div>
               <p className="text-slate-600 mb-6 leading-relaxed">
                 InfySmart executes large-scale entrance automation for <strong>Special Economic Zones (SEZs)</strong>, Factories, and Logistics Parks across Tamil Nadu.
               </p>
               <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="bg-blue-100 p-2 rounded text-blue-600"><Building2 className="w-5 h-5"/></div>
                    <div>
                      <h4 className="font-bold text-slate-900">Coimbatore & Tiruppur</h4>
                      <p className="text-sm text-slate-500">High-speed shutters for textile units.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="bg-orange-100 p-2 rounded text-orange-600"><Factory className="w-5 h-5"/></div>
                    <div>
                      <h4 className="font-bold text-slate-900">Hosur & Sriperumbudur</h4>
                      <p className="text-sm text-slate-500">Boom barriers and heavy sliding gates for manufacturing plants.</p>
                    </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. BRANDS */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">
            We Use World-Class Motors From
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-xl font-bold text-slate-400 grayscale opacity-80">
             <span>CAME</span>
             <span>NICE</span>
             <span>FAAC</span>
             <span>SOMFY</span>
             <span>CENTURION</span>
             <span>BFT</span>
          </div>
        </div>
      </section>

      <Footer settings={settings} />
    </main>
  );
}