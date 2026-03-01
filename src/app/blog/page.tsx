import { directus, Blog } from '@/lib/directus';
import { readItems, readSingleton } from '@directus/sdk';
import Navbar from '@/components/Navbar';
import BlogListClient from './BlogListClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Insights & Innovation | Infysmart Blog",
  description: "Deep dives into security infrastructure, renewable energy trends, and smart automation technologies.",
  alternates: { canonical: '/blog' }
};

// Force refresh so you see new blogs immediately
export const revalidate = 0;

export default async function BlogIndexPage() {
  const [settings, blogs] = await Promise.all([
    directus.request(readSingleton('global_settings')),
    directus.request(readItems('blogs', {
      sort: ['-date_published'],
    }))
  ]);

  return (
    <main className="min-h-screen bg-white">


      {/* Premium Header */}
      <div className="bg-slate-900 pt-40 pb-20 relative overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="text-blue-400 font-bold tracking-widest text-xs uppercase mb-4 block">
            The Infysmart Journal
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
            Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-400">Innovation.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Deep dives into security infrastructure, renewable energy trends, and smart automation technologies.
          </p>
        </div>
      </div>

      <BlogListClient blogs={blogs} />

      {/* WHY WE BLOG (SEO EXPANSION) */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Commitment to Industry Knowledge</h2>
              <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                <p>
                  At InfySmart, we believe that an educated consumer makes the best technology decisions. The security and automation industry evolves at a breakneck pace. What was considered cutting-edge 5-Megapixel IP CCTV technology three years ago is now standard; today, the focus has shifted entirely towards Artificial Intelligence, deep learning algorithms, Facial Recognition access control, and edge-based video analytics.
                </p>
                <p>
                  Similarly, in the renewable energy sector, advancements in Monocrystalline PERC solar panels and hybrid inverter topologies are constantly changing the Return on Investment (ROI) calculations for commercial and residential installations. Navigating these technical shifts can be overwhelming for facility managers, HR departments, and homeowners alike.
                </p>
                <p>
                  This official <strong>InfySmart Engineering Blog</strong> serves as a comprehensive resource to demystify these complex systems. Our in-house technical experts regularly publish deep dives, comparative analyses, and case studies detailing our real-world execution challenges. We aim to break down vendor jargon—explaining exactly what terms like WDR (Wide Dynamic Range), ONVIF compliance, Net-Metering, and Wiegand protocols actually mean in practical applications.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl mt-8 border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-4">Topics We Cover</h3>
              <ul className="space-y-4 text-sm text-slate-700">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2 shrink-0"></div>
                  <div>
                    <strong className="block text-slate-900">Security Architecture</strong>
                    Best practices for designing robust IP camera networks, overcoming bandwidth limitations, and configuring reliable NVR storage topologies.
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2 shrink-0"></div>
                  <div>
                    <strong className="block text-slate-900">Automation Mechanics</strong>
                    Insights into selecting the right sliding gate motors, understanding boom barrier duty-cycles, and integrating access control software with payroll APIs.
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-2 shrink-0"></div>
                  <div>
                    <strong className="block text-slate-900">Solar Yield Optimization</strong>
                    Analyzing efficiency differences between On-Grid and Off-Grid solar plants, navigating TNEB net-metering regulations, and maximizing government subsidies.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG FAQ SECTION */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600">Information about our technical publications.</p>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200">
              <h4 className="text-lg font-bold text-slate-900 mb-2">Can I request a tutorial or guide on a specific topic?</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Absolutely! We welcome suggestions from our clients and readers. If you&apos;re struggling to understand a specific technology—like how to integrate a bio-metric machine with your existing fire alarm system—please contact our support team. Our engineers frequently write articles based on common questions we receive in the field.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200">
              <h4 className="text-lg font-bold text-slate-900 mb-2">Are the technical configurations mentioned in the blog applicable to all brands?</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                While the underlying network and electrical principles remain identical, specific software interfaces will vary. When detailing a configuration—such as setting up motion detection zones—we typically use industry leaders like Hikvision, Dahua, or Matrix as our reference examples, though the concepts translate universally to most enterprise-grade equipment.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}