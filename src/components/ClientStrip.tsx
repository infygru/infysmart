'use client';

import Image from 'next/image';
import { getAssetUrl, Client } from '@/lib/directus';

export default function ClientStrip({ clients }: { clients: Client[] }) {
  // Sorting logic to prioritize specific clients
  const priorityList = ['TNPL', 'ACCET', 'Govt Registered Vendor', 'Infygru', '88 Properties'];

  // Inject "Govt Registered Vendor" if not present
  const allClients = [...clients];
  if (!allClients.some(c => c.name.toLowerCase().includes('govt registered'))) {
    allClients.push({
      id: 'govt-badge-static',
      name: 'Govt Registered Vendor',
      logo: null, // Will use text fallback or you can add a static image path here
      sort: 0,
      status: 'published'
    } as Client);
  }

  const sortedClients = allClients.sort((a, b) => {
    const getPriority = (name: string) => {
      // Check if the client name contains any of the priority keywords
      const index = priorityList.findIndex(p => name.toLowerCase().includes(p.toLowerCase()));
      return index === -1 ? 999 : index;
    };
    return getPriority(a.name) - getPriority(b.name);
  });

  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full">
            Our Portfolio
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Trusted by Government Bodies & Leading Enterprises
          </h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full opacity-20"></div>
        </div>

        {/* Client Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-center">
          {sortedClients.map((client) => (
            <div
              key={client.id}
              className="group relative h-32 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center p-6"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

              {/* Image Container - FULL COLOR (No Grayscale) */}
              <div className="relative w-full h-full">
                {client.logo ? (
                  <Image
                    src={getAssetUrl(client.logo)}
                    alt={client.name}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center">
                    {client.name === 'Govt Registered Vendor' && <span className="text-3xl mb-1">🛡️</span>}
                    <span className="font-bold text-slate-400 group-hover:text-slate-800 transition-colors leading-tight">
                      {client.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA / Text */}
        <p className="text-center text-slate-500 mt-12 text-sm">
          Join 100+ organizations across Tamil Nadu securing their infrastructure with Infysmart.
        </p>

      </div>
    </section>
  );
}