'use client';

import Link from 'next/link';
import { Service } from '@/lib/directus';
import { ArrowRight, ShieldCheck, Zap, Cpu, Server } from 'lucide-react';

export default function InfrastructureEcosystem({ services }: { services: Service[] }) {
  
  // Helper to map dynamic titles to icons
  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('solar')) return <Zap className="h-8 w-8" />;
    if (t.includes('automation')) return <Cpu className="h-8 w-8" />;
    if (t.includes('network') || t.includes('switch')) return <Server className="h-8 w-8" />;
    return <ShieldCheck className="h-8 w-8" />;
  };

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            End-to-End Infrastructure Solutions
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            From advanced surveillance to sustainable energy, Infysmart delivers enterprise-grade technology that works for you.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link 
              key={service.id} 
              href={`/services/${service.slug}`}
              className="group relative bg-white p-8 rounded-2xl border border-slate-200 hover:border-brand-500/50 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div className="h-16 w-16 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
                {getIcon(service.title)}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-slate-600 mb-8 leading-relaxed line-clamp-3">
                {service.short_description}
              </p>

              <div className="flex items-center text-sm font-bold text-brand-600 gap-2">
                Learn More 
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}