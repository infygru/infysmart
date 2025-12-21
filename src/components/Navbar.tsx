'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu } from 'lucide-react';
import { getAssetUrl, GlobalSettings } from '@/lib/directus';
import GetQuoteModal from '@/components/GetQuoteModal';

export default function Navbar({ settings }: { settings: GlobalSettings | null }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'CCTV', href: '/cctv' },
    { label: 'Solar', href: '/solar' },
    { label: 'Automation', href: '/automation' },
    { label: 'Projects Done', href: '/projects' },
    { label: 'Blogs', href: '/blog' },
    { label: 'About', href: '/about' },
  ];

  const baseTextColor = isScrolled ? 'text-slate-700' : 'text-white';
  const navBgClass = isScrolled
    ? 'bg-white/95 backdrop-blur-md shadow-sm py-2'
    : 'bg-transparent py-4';

  return (
    <>

      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${navBgClass}`}>
        <div className="container mx-auto px-4 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group relative h-12 flex-shrink-0 bg-white px-3 rounded-lg shadow-sm"
          >
            {settings?.logo ? (
              <Image
                src={getAssetUrl(settings.logo)}
                alt={settings.site_name}
                width={180}
                height={50}
                className="object-contain h-full w-auto py-1"
              />
            ) : (
              <div className="text-2xl font-bold tracking-tight text-slate-900">
                Infy<span className="text-brand-orange">Smart</span>
              </div>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 lg:gap-8 items-center font-medium text-sm">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`whitespace-nowrap transition-colors hover:text-brand-orange ${baseTextColor}`}
              >
                {item.label}
              </Link>
            ))}

            {/* GET QUOTE BUTTON (MODAL TRIGGER) */}
            <button
              onClick={() => setIsQuoteOpen(true)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded transition-all font-bold whitespace-nowrap ${
                isScrolled
                  ? 'bg-brand-orange text-white hover:bg-orange-700'
                  : 'bg-white text-brand-orange hover:bg-gray-100'
              }`}
            >
              <Phone className="h-4 w-4" />
              <span>Get Quote</span>
            </button>
          </nav>

          {/* Mobile Menu Icon */}
          <button className={`md:hidden ${baseTextColor} hover:text-brand-orange transition-colors`}>
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* QUOTE MODAL */}
<GetQuoteModal
  isOpen={isQuoteOpen}
  onClose={() => setIsQuoteOpen(false)}
/>
    </>
  );
}
