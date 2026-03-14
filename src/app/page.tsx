import { directus, getAssetUrl } from '@/lib/directus';
import { readItems, readSingleton } from '@directus/sdk';
import Hero from '@/components/Hero';
import ClientStrip from '@/components/ClientStrip';
import InfrastructureEcosystem from '@/components/InfrastructureEcosystem';
import WhyChooseUs from '@/components/WhyChooseUs';
import AuthorizedBrands from '@/components/AuthorizedBrands';
import ExecutionProcess from '@/components/ExecutionProcess';
import CurrentProjects from '@/components/CurrentProjects';
import FadeIn from '@/components/animations/FadeIn';
import PriceGuideCTA from '@/components/PriceGuideCTA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best CCTV Installation Service & Solar Power in Chennai, Hosur, Coimbatore, Bangalore | InfySmart',
  description: 'Govt-approved CCTV installation, Solar 4G cameras, biometric access control & building automation for industrial, corporate, and government clients across Tamil Nadu & Karnataka. Authorized Hikvision, Dahua & CP Plus dealer.',
  alternates: {
    canonical: 'https://infysmart.com/',
  },
  openGraph: {
    title: 'Best CCTV Installation Service & Solar Power in Chennai, Hosur, Coimbatore, Bangalore | InfySmart',
    description: 'Govt-approved CCTV, Solar & Security System provider across Tamil Nadu & Karnataka. Serving TNPL, ACCET and leading industrial clients.',
    url: 'https://infysmart.com/',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Infysmart — Security & Technology Solutions' }],
  },
  twitter: {
    title: 'Best CCTV Installation & Solar Power | InfySmart',
    description: 'Govt-approved CCTV, Solar 4G cameras & biometric systems across Tamil Nadu & Karnataka.',
    images: ['/og-image.png'],
  },
};

export const revalidate = 60;

export default async function HomePage() {
  const [settings, services, clients, projects] = await Promise.all([
    directus.request(readSingleton('global_settings')),
    directus.request(readItems('services')),
    directus.request(readItems('clients')),
    directus.request(readItems('projects'))
  ]);

  // Transform services content to match new government-focused messaging
  const transformedServices = services?.map((service: any) => {
    // 1. Rename "Industrial CCTV" -> "Industrial & PSU Surveillance"
    if (service.title === "Industrial CCTV") {
      return {
        ...service,
        title: "Industrial & PSU Surveillance",
        short_description: "High-compliance CCTV networks for factories, government offices, and public infrastructure."
      };
    }
    // 2. Rename "Building Automation" -> "Educational Campus Security"
    if (service.title === "Building Automation") {
      return {
        ...service,
        title: "Educational Campus Security",
        short_description: "Safety monitoring for colleges and schools, trusted by government institutions (ACCET)."
      };
    }
    // 3. Rename "Solar Power Systems" -> "Commercial & Office Automation"
    if (service.title === "Solar Power Systems") {
      return {
        ...service,
        title: "Commercial & Office Automation",
        short_description: "Biometric access & server room security."
      };
    }
    return service;
  });

  const heroImageUrl = settings?.hero_image
    ? getAssetUrl(settings.hero_image)
    : undefined;

  return (
    <main className="min-h-screen bg-slate-50 overflow-x-hidden">
      <Hero heroImage={heroImageUrl} />

      <FadeIn direction="up" delay={0.2}>
        <ClientStrip clients={clients} />
      </FadeIn>

      <FadeIn direction="up">
        <AuthorizedBrands />
      </FadeIn>

      <FadeIn direction="up">
        {/* Pass transformedServices instead of raw services */}
        <InfrastructureEcosystem services={transformedServices || []} />
      </FadeIn>

      <FadeIn direction="up">
        <CurrentProjects projects={projects} />
      </FadeIn>

      <FadeIn direction="up">
        <ExecutionProcess />
      </FadeIn>

      <WhyChooseUs />

      <PriceGuideCTA />

      {/* SEO: Local keyword & service coverage section */}
      <section className="bg-slate-900 py-16 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <FadeIn direction="up">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Serving Industries &amp; Cities Across South India
            </h2>
            <p className="text-slate-400 text-center max-w-3xl mx-auto mb-10 text-sm leading-relaxed">
              From small offices to large-scale industrial complexes, Infysmart provides
              government-grade security infrastructure trusted by{' '}
              <strong className="text-slate-300">TNPL, ACCET, SIPCOT industries</strong>, and
              leading private enterprises across Tamil Nadu and Karnataka.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                title: 'CCTV Installation Services',
                desc: 'End-to-end CCTV camera installation for commercial, industrial, and government premises. IP cameras, NVR/DVR systems, and 4G solar CCTV for remote sites.',
                link: '/cctv',
                label: 'CCTV Services',
              },
              {
                title: 'Solar Power Systems',
                desc: 'On-grid and off-grid solar panel installation for factories, rooftops, and remote locations. Solar 4G CCTV cameras for zero-electricity surveillance.',
                link: '/solar',
                label: 'Solar Services',
              },
              {
                title: 'Biometric & Access Control',
                desc: 'Fingerprint, face recognition, and RFID-based attendance and door access systems. Authorized Essl, Matrix, and Realtime dealers.',
                link: '/services/biometric-systems',
                label: 'Biometric Systems',
              },
              {
                title: 'Annual Maintenance Contracts',
                desc: 'Structured preventive maintenance for CCTV, solar, and security systems. AMC plans starting at ₹450/year for apartments and offices.',
                link: '/amc',
                label: 'AMC Plans',
              },
            ].map((item) => (
              <div key={item.title} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{item.desc}</p>
                <a href={item.link} className="text-brand-blue text-sm font-semibold hover:underline">
                  {item.label} →
                </a>
              </div>
            ))}
          </div>

          {/* City keyword grid */}
          <div className="border-t border-slate-800 pt-8">
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4 text-center">
              CCTV &amp; Security System Installation Locations
            </h3>
            <div className="flex flex-wrap justify-center gap-2 text-xs text-slate-600">
              {[
                'CCTV Installation Chennai', 'CCTV Installation Hosur', 'CCTV Installation Coimbatore',
                'CCTV Installation Bangalore', 'CCTV Installation Dharmapuri', 'CCTV Installation Karaikudi',
                'CCTV Installation Puducherry', 'CCTV Installation Cuddalore', 'CCTV Installation Madurai',
                'CCTV Installation Salem', 'CCTV Installation Trichy', 'CCTV Installation Vellore',
                'Solar Panel Installation Tamil Nadu', 'Biometric System Chennai',
                'Video Door Phone Chennai', 'Gate Automation Hosur', 'CCTV AMC Chennai',
                'Industrial CCTV Ambattur', 'Factory CCTV Sriperumbudur', 'SIPCOT CCTV Installation',
              ].map((kw) => (
                <span key={kw} className="px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700/40">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
