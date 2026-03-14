'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu, X } from 'lucide-react';
import { getAssetUrl, GlobalSettings } from '@/lib/directus';
import GetQuoteModal from '@/components/GetQuoteModal';

export default function Navbar({ settings }: { settings: GlobalSettings | null }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change / resize
  useEffect(() => {
    if (isMobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const navItems = [
    { label: 'CCTV', href: '/cctv' },
    { label: 'Solar', href: '/solar' },
    { label: 'Automation', href: '/automation' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
  ];

  const navBgClass = isScrolled
    ? 'bg-white/95 backdrop-blur-md shadow-sm py-2'
    : 'bg-transparent py-4';
  const textColor = isScrolled ? 'text-slate-700' : 'text-white';

  return (
    <>
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${navBgClass}`}>
        <div className="container mx-auto px-4 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 bg-white px-3 py-1.5 rounded-lg shadow-sm" onClick={() => setIsMobileOpen(false)}>
            {settings?.logo ? (
              <Image
                src={getAssetUrl(settings.logo)}
                alt={settings.site_name || 'Infysmart'}
                width={160}
                height={44}
                className="object-contain h-10 w-auto"
              />
            ) : (
              <div className="text-xl font-extrabold tracking-tight text-slate-900">
                Infy<span className="text-brand-blue">Smart</span>
              </div>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-5 lg:gap-7 items-center font-medium text-sm">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className={`whitespace-nowrap transition-colors hover:text-brand-blue ${textColor}`}>
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => setIsQuoteOpen(true)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all font-bold whitespace-nowrap ${
                isScrolled ? 'bg-brand-blue text-white hover:bg-blue-700' : 'bg-white text-brand-blue hover:bg-gray-100'
              }`}
            >
              <Phone className="h-4 w-4" />
              Get Quote
            </button>
          </nav>

          {/* Mobile: hamburger */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${textColor} hover:text-brand-blue`}
            onClick={() => setIsMobileOpen((v) => !v)}
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-30 md:hidden" onClick={() => setIsMobileOpen(false)}>
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" />
        </div>
      )}
      <div
        className={`fixed top-0 right-0 h-full w-72 max-w-[85vw] z-40 bg-slate-950 border-l border-slate-800 shadow-2xl transform transition-transform duration-300 md:hidden ${
          isMobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <span className="text-xl font-extrabold text-white">Infy<span className="text-brand-blue">Smart</span></span>
          <button onClick={() => setIsMobileOpen(false)} className="text-slate-400 hover:text-white p-1">
            <X size={22} />
          </button>
        </div>
        <nav className="flex flex-col p-5 gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className="px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
            <a
              href="tel:+919445675619"
              className="flex items-center justify-center gap-2 w-full py-3 bg-brand-blue text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Phone className="h-4 w-4" /> Call Now
            </a>
            <button
              onClick={() => { setIsMobileOpen(false); setIsQuoteOpen(true); }}
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#FF4500] text-white font-bold rounded-lg hover:bg-orange-600 transition-colors"
            >
              Get Free Quote
            </button>
          </div>
        </nav>
      </div>

      {/* Quote Modal */}
      <GetQuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  );
}
