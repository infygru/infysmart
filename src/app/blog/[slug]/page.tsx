import { directus, getAssetUrl } from '@/lib/directus';
import { readItems, readSingleton } from '@directus/sdk';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, User, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs'; // Import the new component

// Force refresh
export const revalidate = 0;

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // 1. Fetch Current Blog & "Read Next" suggestions
  const [settings, blogs] = await Promise.all([
    directus.request(readSingleton('global_settings')),
    directus.request(readItems('blogs', {
      sort: ['-date_published'],
      limit: 3
    }))
  ]);

  // Find the current blog
  const currentBlog = blogs.find(b => b.slug === params.slug);
  
  if (!currentBlog) notFound();

  // Get other blogs for "Read Next"
  const nextBlogs = blogs.filter(b => b.slug !== params.slug).slice(0, 2);

  // 2. Define Breadcrumb Structure
  const breadcrumbItems = [
    { label: 'Blog', href: '/blog' },
    // Optional: If you have category pages, you can uncomment the next line
    // { label: currentBlog.category, href: `/blog/category/${currentBlog.category.toLowerCase()}` },
    { label: currentBlog.title, active: true }
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900">

      <article>
        
        {/* HEADER SECTION */}
        <div className="bg-slate-50 pt-28 pb-12 border-b border-slate-200">
          <div className="container mx-auto px-4">
            
            {/* --- REPLACED: Breadcrumbs Component --- */}
            <Breadcrumbs items={breadcrumbItems} />

            <div className="grid lg:grid-cols-2 gap-10 items-center">
              
              {/* LEFT: Content Info */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider shadow-sm">
                    {currentBlog.category}
                  </span>
                  <span className="text-slate-500 text-xs font-bold flex items-center gap-1">
                    <Clock className="h-3 w-3" /> 5 min read
                  </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                  {currentBlog.title}
                </h1>

                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm text-slate-400">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-slate-900">{currentBlog.author || 'Infysmart Team'}</div>
                    <div className="text-xs font-medium text-slate-500">
                      {new Date(currentBlog.date_published).toLocaleDateString('en-US', { dateStyle: 'long' })}
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: Image */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-md border border-slate-200 bg-white">
                {currentBlog.image ? (
                  <Image 
                    src={getAssetUrl(currentBlog.image)} 
                    alt={currentBlog.title} 
                    fill 
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-100">
                    No Image
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* ARTICLE CONTENT */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar (Details) */}
            <div className="hidden lg:block w-64 shrink-0">
               <div className="sticky top-28 space-y-8">
                 <div>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                     Executive Summary
                   </p>
                   <p className="text-sm text-slate-700 leading-relaxed border-l-2 border-blue-500 pl-3 italic">
                     {currentBlog.summary}
                   </p>
                 </div>
               </div>
            </div>

            {/* Main Prose Content */}
            <div className="flex-1 max-w-3xl">
              <div 
                className="prose prose-lg prose-slate max-w-none 
                text-slate-800
                prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight
                prose-p:text-slate-800 prose-p:leading-8
                prose-a:text-blue-700 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-slate-900
                prose-img:rounded-xl prose-img:shadow-md prose-img:my-8
                prose-li:text-slate-800
                prose-blockquote:text-slate-700 prose-blockquote:border-blue-600"
                dangerouslySetInnerHTML={{ __html: currentBlog.content }}
              />
            </div>

          </div>
        </div>

        {/* PAGINATION / READ NEXT */}
        {nextBlogs.length > 0 && (
          <div className="bg-slate-50 border-t border-slate-200 py-16">
            <div className="container mx-auto px-4">
              <h3 className="text-xl font-bold text-slate-900 mb-8">Continue Reading</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                {nextBlogs.map((post) => (
                  <Link 
                    key={post.id} 
                    href={`/blog/${post.slug}`}
                    className="group bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex items-center gap-6"
                  >
                    <div className="relative h-24 w-24 shrink-0 rounded-lg overflow-hidden bg-slate-100">
                      {post.image && (
                        <Image src={getAssetUrl(post.image)} alt={post.title} fill className="object-cover" />
                      )}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-blue-600 uppercase mb-1 block">{post.category}</span>
                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <div className="flex items-center text-xs text-slate-500 font-bold mt-2">
                        Read Article <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

      </article>

      <Footer settings={settings} />
    </main>
  );
}