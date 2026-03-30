'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Phone, Menu, X, ShoppingCart, User, LogOut, Package, Settings, ShoppingBag } from 'lucide-react';
import { getAssetUrl, GlobalSettings } from '@/lib/directus';
import GetQuoteModal from '@/components/GetQuoteModal';
import { useCart } from '@/lib/cart-context';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar({ settings }: { settings: GlobalSettings | null }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { totals, openDrawer } = useCart();
  const { data: session } = useSession();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();

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
  ];

  const navBgClass = isScrolled
    ? 'bg-white/95 backdrop-blur-md shadow-sm py-2'
    : 'bg-white/95 backdrop-blur-md shadow-sm py-4';
  const textColor = 'text-slate-700';

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
          <nav className="hidden md:flex gap-1 lg:gap-2 items-center font-medium text-sm">
            {/* Shop — highlighted pill */}
            <Link
              href="/shop"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                pathname.startsWith('/shop')
                  ? 'bg-[#FF4500] text-white shadow-md shadow-orange-200'
                  : 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 shadow-sm shadow-orange-200'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Shop
            </Link>
            {navItems.filter(i => i.label !== 'Shop').map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    isActive ? 'text-[#FF4500] font-bold bg-orange-50' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Cart icon with badge */}
            <button
              onClick={openDrawer}
              className={`relative p-2 rounded-lg transition-colors text-slate-700 hover:bg-slate-100`}
              aria-label={`Cart (${totals.itemCount} items)`}
            >
              <ShoppingCart className="w-5 h-5" />
              {totals.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-brand-orange text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none">
                  {totals.itemCount > 99 ? '99+' : totals.itemCount}
                </span>
              )}
            </button>

            {/* Auth button */}
            {session?.user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-slate-700 hover:bg-slate-100`}
                >
                  {session.user.image ? (
                    <img src={session.user.image} alt="" className="w-7 h-7 rounded-full object-cover" />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                  <span className="text-sm font-semibold hidden lg:block max-w-[100px] truncate">
                    {session.user.name?.split(' ')[0] ?? 'Account'}
                  </span>
                </button>
                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl border border-slate-200 shadow-xl z-50 py-1.5 overflow-hidden">
                      <div className="px-4 py-2 border-b border-gray-100 mb-1">
                        <p className="text-xs font-semibold text-gray-900 truncate">{session.user.name ?? 'My Account'}</p>
                        <p className="text-[11px] text-gray-400 truncate">{session.user.email}</p>
                      </div>
                      <Link
                        href="/account"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-orange-50 hover:text-[#FF4500] transition-colors"
                      >
                        <User className="w-4 h-4" /> My Profile
                      </Link>
                      <Link
                        href="/account/orders"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-orange-50 hover:text-[#FF4500] transition-colors"
                      >
                        <Package className="w-4 h-4" /> My Orders
                      </Link>
                      {(session.user.email === 'infysmartbiz@gmail.com' || session.user.email === 'csenaren@gmail.com') && (
                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-orange-50 hover:text-[#FF4500] transition-colors"
                        >
                          <Settings className="w-4 h-4" /> Admin Panel
                        </Link>
                      )}
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          onClick={() => { setUserMenuOpen(false); signOut({ callbackUrl: '/' }); }}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full text-left transition-colors"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors text-slate-700 hover:bg-slate-100`}
              >
                <User className="w-4 h-4" /> Login
              </Link>
            )}

            <button
              onClick={() => setIsQuoteOpen(true)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all font-bold whitespace-nowrap bg-brand-blue text-white hover:bg-blue-700`}
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
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        </div>
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 max-w-[85vw] z-40 bg-white border-l border-gray-200 shadow-2xl transform transition-transform duration-300 md:hidden ${
          isMobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <span className="text-lg font-extrabold text-gray-900">Menu</span>
          <button onClick={() => setIsMobileOpen(false)} className="text-gray-400 hover:text-gray-700 p-1">
            <X size={22} />
          </button>
        </div>

        {session?.user && (
          <div className="px-5 py-3 bg-orange-50 border-b border-orange-100">
            <p className="text-sm font-semibold text-gray-900">{session.user.name ?? 'My Account'}</p>
            <p className="text-xs text-gray-500">{session.user.email}</p>
          </div>
        )}

        <nav className="flex flex-col p-4 gap-0.5">
          {/* Shop — highlighted in mobile too */}
          <Link
            href="/shop"
            onClick={() => setIsMobileOpen(false)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold transition-all text-sm ${
              pathname.startsWith('/shop')
                ? 'bg-[#FF4500] text-white'
                : 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> Shop Now
          </Link>
          {navItems.filter(i => i.label !== 'Shop').map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors text-sm ${
                  isActive
                    ? 'text-[#FF4500] bg-orange-50 font-bold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="mt-3 pt-3 border-t border-gray-100 space-y-0.5">
            {session?.user ? (
              <>
                <Link
                  href="/account"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#FF4500] rounded-lg transition-colors"
                >
                  <User className="h-4 w-4" /> My Profile
                </Link>
                <Link
                  href="/account/orders"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#FF4500] rounded-lg transition-colors"
                >
                  <Package className="h-4 w-4" /> My Orders
                </Link>
                <button
                  onClick={() => { setIsMobileOpen(false); signOut({ callbackUrl: '/' }); }}
                  className="flex items-center gap-2.5 px-4 py-3 text-sm text-red-500 hover:bg-red-50 rounded-lg w-full text-left transition-colors"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center gap-2.5 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 rounded-lg transition-colors"
              >
                <User className="h-4 w-4" /> Login / Register
              </Link>
            )}
          </div>

          <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
            <a
              href="tel:+919445675619"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-brand-blue text-white font-bold rounded-xl text-sm hover:bg-blue-700 transition-colors"
            >
              <Phone className="h-4 w-4" /> Call Now
            </a>
            <button
              onClick={() => { setIsMobileOpen(false); setIsQuoteOpen(true); }}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl text-sm hover:from-amber-600 hover:to-orange-700 transition-all"
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
