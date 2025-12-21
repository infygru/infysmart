'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAssetUrl, Blog } from '@/lib/directus';
import { Search, Calendar, User, ArrowRight } from 'lucide-react';

export default function BlogListClient({ blogs }: { blogs: Blog[] }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  // Extract unique categories from data
  const categories = ['All', ...Array.from(new Set(blogs.map(b => b.category))).filter(Boolean)];

  // Filter Logic
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || blog.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          
          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                  category === cat 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <article key={blog.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
              
              {/* Image */}
              <Link href={`/blog/${blog.slug}`} className="relative h-56 w-full overflow-hidden block">
                {blog.image ? (
                  <Image 
                    src={getAssetUrl(blog.image)} 
                    alt={blog.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 font-bold">No Image</div>
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {blog.category}
                </div>
              </Link>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 font-medium">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(blog.date_published).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"><User className="h-3 w-3" /> {blog.author || 'Infysmart'}</span>
                </div>

                <Link href={`/blog/${blog.slug}`} className="block">
                  <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h2>
                </Link>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                  {blog.summary}
                </p>

                <Link href={`/blog/${blog.slug}`} className="inline-flex items-center text-blue-600 font-bold text-sm mt-auto group/link">
                  Read Article <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-slate-900">No articles found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your search or category filter.</p>
          </div>
        )}

      </div>
    </section>
  );
}