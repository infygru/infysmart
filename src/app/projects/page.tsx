import { directus, getAssetUrl } from '@/lib/directus';
import { readItems, readSingleton } from '@directus/sdk';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CCTV & Security Projects Portfolio | Infysmart',
  description: 'Explore our completed and ongoing CCTV, solar, and security automation projects for government institutions, industrial clients, and commercial enterprises across Tamil Nadu & Karnataka.',
  alternates: { canonical: 'https://infysmart.com/projects' },
  openGraph: {
    title: 'CCTV & Security Projects Portfolio | Infysmart',
    description: 'Completed & ongoing CCTV, solar & security automation projects for government, industrial & commercial clients.',
    url: 'https://infysmart.com/projects',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Infysmart Project Portfolio' }],
  },
  twitter: {
    title: 'CCTV & Security Projects Portfolio | Infysmart',
    description: 'Government, industrial & commercial security projects across Tamil Nadu & Karnataka.',
    images: ['/og-image.png'],
  },
};

// Force dynamic rendering so new projects show up instantly
export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  // 1. Fetch ALL projects (Removed the 'Completed' filter for debugging)
  const [settings, projects] = await Promise.all([
    directus.request(readSingleton('global_settings')),
    directus.request(readItems('projects'))
  ]);

  return (
    <main className="min-h-screen bg-slate-50">


      <div className="bg-slate-900 text-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors text-sm font-semibold">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-400">Execution Portfolio</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Explore our track record of enterprise security, solar energy, and automation installations.
            </p>
          </div>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-4">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="relative h-64 w-full bg-slate-200 overflow-hidden">
                  {project.image ? (
                    <Image
                      src={getAssetUrl(project.image)}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-400 font-medium">
                      No Image
                    </div>
                  )}

                  {/* Show the actual status from DB */}
                  <div className="absolute top-4 left-4 bg-green-600/90 backdrop-blur text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm uppercase tracking-wider">
                    <CheckCircle2 className="h-3 w-3" /> {project.status || 'Project'}
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>

                  <div className="flex items-center text-slate-500 font-medium text-sm mb-6">
                    <MapPin className="h-4 w-4 mr-1.5 text-orange-500 shrink-0" />
                    {project.location}
                  </div>

                  <p className="text-slate-600 leading-relaxed text-sm mb-6 flex-1">
                    {project.summary}
                  </p>

                  <div className="pt-6 border-t border-slate-100 mt-auto">
                    <span className="text-sm font-bold text-slate-900">Infysmart Execution</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Fallback Message */}
          {projects.length === 0 && (
            <div className="text-center py-32">
              <div className="inline-block p-4 rounded-full bg-slate-100 mb-4">
                <CheckCircle2 className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">No Projects Found</h3>
              <p className="text-slate-500 mt-2">
                Please add items to the &quot;projects&quot; collection in your Directus Admin Panel.
              </p>
            </div>
          )}

        </div>
      </section>

      {/* PROJECT EXECUTION METHODOLOGY (SEO EXPANSION) */}
      <section className="py-20 bg-slate-900 text-white border-t border-slate-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Project Execution Methodology</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              How we approach complex infrastructure deployments from conception to handover.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 text-sm text-slate-300 leading-relaxed">
            <div>
              <p className="mb-4">
                Executing large-scale infrastructure projects requires more than just installing hardware. At InfySmart, our methodology is deeply rooted in <strong>Systematic Project Management</strong>. The lifecycle of a typical enterprise project begins with an exhaustive <strong>Site Audit and Feasibility Study</strong>. Our engineers do not rely on blueprints alone; we conduct physical walk-throughs to identify potential electromagnetic interference zones, determine structural load bearing capacities for solar rigs, and map optimal conduit pathways that comply with fire-safety regulations.
              </p>
              <p>
                Following the audit, our design team formulates a <strong>Technical Architecture Document (TAD)</strong>. This document specifies the exact Bill of Materials (BoM), including network switch capacities, required UPS back-up loads, and storage retention calculations for CCTV data. We believe in total transparency; the TAD is reviewed and signed off by the client’s IT and Security stakeholders before procurement begins, ensuring there are zero hidden costs or scope creeps during deployment.
              </p>
            </div>
            <div>
              <p className="mb-4">
                The actual deployment phase is governed by strict safety protocols. Our technicians utilize industrial-grade PPE (Personal Protective Equipment) and adhere to guidelines mandated by SIPCOT and other industrial safety boards. Cable dressing is executed with military precision—utilizing labeled patch panels, shielded CAT6 runs for PoE transmission, and separated high-voltage/low-voltage conduits to eliminate signal crosstalk.
              </p>
              <p>
                The final phase is <strong>Commissioning and Handover</strong>. We do not consider a project complete until the system has passed a 48-hour burn-in test. We then conduct comprehensive training sessions for the client’s security personnel and facilities management team, providing them with as-built drawings, Admin passwords, and warranty documentation. This structured, methodical approach is why leading tech parks and factories trust InfySmart with their critical projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT FAQ SECTION */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Project & Tender FAQs</h2>
            <p className="text-slate-600">Common questions regarding our contracting and execution capabilities.</p>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200">
              <h4 className="text-lg font-bold text-slate-900 mb-2">Can you participate in Government e-Marketplace (GeM) tenders?</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Yes. Through our parent entity, Infygru Private Limited, we are actively registered on the GeM portal and possess the necessary MSME, GST, and ISO certifications required to participate in state and central government tenders for security, IT infrastructure, and solar projects.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200">
              <h4 className="text-lg font-bold text-slate-900 mb-2">Do you provide &apos;Supply Only&apos; services or full &apos;Turnkey&apos; solutions?</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                We strongly specialize in comprehensive <strong>Turnkey Solutions</strong> (Supply, Installation, Testing, and Commissioning). We take full responsibility for the entire ecosystem, ensuring all components integrate seamlessly. However, for large IT integrators who require only hardware sourcing at wholesale dealer prices, we do offer supply-only agreements.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200">
              <h4 className="text-lg font-bold text-slate-900 mb-2">What is the typical timeline for an industrial CCTV project execution?</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Timelines vary based on scope and site readiness. A standard 32-camera IP setup in an operational warehouse typically takes 7 to 10 working days, inclusive of laying armored fiber optic backbone cables. We frequently operate night shifts to execute noisy tasks (like drilling and trenching) to ensure zero disruption to your daily business operations.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}