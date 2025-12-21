'use client';

import Image from 'next/image';
import { getAssetUrl, Project } from '@/lib/directus';
import { Loader2, MapPin } from 'lucide-react';

export default function CurrentProjects({ projects }: { projects: Project[] }) {
  // Safety check: if projects is undefined or empty, don't break the page
  if (!projects) return null;

  // Filter for only 'Ongoing' projects (Case sensitive!)
  const ongoingProjects = projects.filter(p => p.status === 'Ongoing');

  // If no ongoing projects found, hide the section
  if (ongoingProjects.length === 0) return null;

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 animate-pulse">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              Live Sites
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Happening Now
            </h2>
            <p className="text-slate-500 mt-2 max-w-xl">
              Our engineers are currently deploying systems at these locations.
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ongoingProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              
              {/* Image Area */}
              <div className="relative h-48 w-full bg-slate-200">
                {project.image ? (
                  <Image 
                    src={getAssetUrl(project.image)} 
                    alt={project.title} 
                    fill 
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    <Loader2 className="animate-spin h-8 w-8" />
                  </div>
                )}
                {/* Status Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">
                  In Progress
                </div>
              </div>
              
              {/* Content Area */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                <div className="flex items-center text-slate-500 text-sm mb-4">
                  <MapPin className="h-4 w-4 mr-1 text-slate-400" />
                  {project.location}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                  {project.summary}
                </p>
                
                {/* Progress Bar (Visual only) */}
                <div className="mt-6">
                  <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                    <span>Completion</span>
                    <span>75%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-[75%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}