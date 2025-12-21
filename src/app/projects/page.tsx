import { directus, getAssetUrl } from '@/lib/directus';
import { readItems, readSingleton } from '@directus/sdk';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar'; 
import Footer from '@/components/Footer'; 

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
              Our Execution Portfolio
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
                Please add items to the "projects" collection in your Directus Admin Panel.
              </p>
            </div>
          )}

        </div>
      </section>

      <Footer settings={settings} />
    </main>
  );
}