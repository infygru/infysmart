'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu, X, ShoppingCart } from 'lucide-react';
import { getAssetUrl, GlobalSettings } from '@/lib/directus';
import GetQuoteModal from '@/components/GetQuoteModal';
import { useCart } from '@/lib/cart-context';

export default function Navbar({ settings }: { settings: GlobalSettings | null }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { totals, openDrawer } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const navItems = [
    { label: 'Shop', href: '/shop' },
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
          <Link
            href="/"
            className="flex items-center gap-2 flex-shrink-0 bg-white px-3 py-1.5 rounded-lg shadow-sm"
            onClick={() => setIsMobileOpen(false)}
          >
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
          <nav className="hidden md:flex gap-4 lg:gap-6 items-center font-medium text-sm">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`whitespace-nowrap transition-colors hover:text-brand-blue ${textColor} ${
                  item.label === 'Shop'
                    ? isScrolled
                      ? 'text-brand-blue font-bold'
                      : 'text-yellow-300 font-bold'
                    : ''
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Cart icon with badge */}
            <button
              onClick={openDrawer}
              className={`relative p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label={`Cart (${totals.itemCount} items)`}
            >
              <ShoppingCart className="w-5 h-5" />
              {totals.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-brand-orange text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none">
                  {totals.itemCount > 99 ? '99+' : totals.itemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsQuoteOpen(true)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all font-bold whitespace-nowrap ${
                isScrolled
                  ? 'bg-brand-blue text-white hover:bg-blue-700'
                  : 'bg-white text-brand-blue hover:bg-gray-100'
              }`}
            >
              <Phone className="h-4 w-4" />
              Get Quote
            </button>
          </nav>

          {/* Mobile: cart + hamburger */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={openDrawer}
              className={`relative p-2 rounded-lg transition-colors ${textColor} hover:text-brand-blue`}
              aria-label={`Cart (${totals.itemCount} items)`}
            >
              <ShoppingCart className="w-5 h-5" />
              {totals.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-brand-orange text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none">
                  {totals.itemCount > 99 ? '99+' : totals.itemCount}
                </span>
              )}
            </button>

            <button
              className={`p-2 rounded-lg transition-colors ${textColor} hover:text-brand-blue`}
              onClick={() => setIsMobileOpen((v) => !v)}
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        >
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" />
        </div>
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 max-w-[85vw] z-40 bg-slate-950 border-l border-slate-800 shadow-2xl transform transition-transform duration-300 md:hidden ${
          isMobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <span className="text-xl font-extrabold text-white">
            Infy<span className="text-brand-blue">Smart</span>
          </span>
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
              className={`px-4 py-3 hover:text-white hover:bg-slate-800 rounded-lg font-medium transition-colors ${
                item.label === 'Shop'
                  ? 'text-yellow-300 font-bold'
                  : 'text-slate-300'
              }`}
            >
              {item.label}
              {item.label === 'Shop' && (
                <span className="ml-2 text-xs bg-brand-orange text-white px-1.5 py-0.5 rounded font-bold">
                  NEW
                </span>
              )}
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

      <GetQuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  );
}
