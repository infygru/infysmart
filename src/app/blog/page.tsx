import { directus, Blog } from '@/lib/directus';
import { readItems, readSingleton } from '@directus/sdk';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogListClient from './BlogListClient'; 

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
            Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Innovation.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Deep dives into security infrastructure, renewable energy trends, and smart automation technologies.
          </p>
        </div>
      </div>

      <BlogListClient blogs={blogs} />

      <Footer settings={settings} />
    </main>
  );
}