'use client';

import Link from 'next/link';
import { GlobalSettings } from '@/lib/directus';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

// FIX: Added '?' to make settings optional so it doesn't crash if missing
export default function Footer({ settings }: { settings?: GlobalSettings | null }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 pt-20 pb-10 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-white tracking-tight block mb-6">
              {settings?.site_name || 'Infysmart'}
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Infysmart is a unit of <strong>Infygru Private Limited</strong>. 
              We provide enterprise-grade CCTV, Solar, and Automation solutions across Tamil Nadu.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white transition"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white transition"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="hover:text-brand-500 transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-brand-500 transition">About Us</Link></li>
              <li><Link href="/services" className="hover:text-brand-500 transition">Services</Link></li>
              <li><Link href="/projects" className="hover:text-brand-500 transition">Our Projects</Link></li>
              <li><Link href="/contact" className="hover:text-brand-500 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-white font-bold mb-6">Solutions</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/services/cctv" className="hover:text-brand-500 transition">CCTV Surveillance</Link></li>
              <li><Link href="/services/solar" className="hover:text-brand-500 transition">Solar Power</Link></li>
              <li><Link href="/services/automation" className="hover:text-brand-500 transition">Home Automation</Link></li>
              <li><Link href="/services/amc" className="hover:text-brand-500 transition">AMC Support</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-brand-500" />
                <span>{settings?.address || 'Chennai, Tamil Nadu, India'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-brand-500" />
                <a href={`tel:${settings?.contact_phone}`} className="hover:text-white">
                  {settings?.contact_phone || '+91 98765 43210'}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-brand-500" />
                <a href={`mailto:${settings?.contact_email}`} className="hover:text-white">
                  {settings?.contact_email || 'sales@infysmart.com'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-xs">
          <p>© {currentYear} Infygru Private Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}