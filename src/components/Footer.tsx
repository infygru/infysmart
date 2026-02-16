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
        <div className="grid md:grid-cols-5 gap-8 mb-16">

          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-white tracking-tight block mb-6">
              {settings?.site_name || 'Infysmart'}
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Infysmart is a unit of <strong>Infygru Private Limited</strong>.
              We provide enterprise-grade CCTV, Solar, and Automation solutions across Tamil Nadu.
            </p>
            <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 mb-6">
              <p className="text-xs text-slate-300 font-semibold mb-1">
                Government & PSU Compliant
              </p>
              <p className="text-xs text-slate-400 leading-snug">
                Fully compliant for Tenders in Tamil Nadu. GST & MSME Registered.
              </p>
            </div>
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
              <li><Link href="/" className="hover:text-brand-blue transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-brand-blue transition">About Us</Link></li>
              <li><Link href="/services" className="hover:text-brand-blue transition">Services</Link></li>
              <li><Link href="/projects" className="hover:text-brand-blue transition">Our Projects</Link></li>
              <li><Link href="/contact" className="hover:text-brand-blue transition">Contact</Link></li>
            </ul>
          </div>

          {/* Areas Served Column (New for SEO) */}
          <div>
            <h4 className="text-white font-bold mb-6">Areas We Serve</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Puducherry, India</li>
              <li>Hosur, Tamil Nadu</li>
              <li>Chennai, Tamil Nadu</li>
              <li>Ambattur Industrial Estate</li>
              <li>Guindy Industrial Estate</li>
              <li>Sriperumbudur & Oragadam</li>
              <li>Kanchipuram & Vallam</li>
              <li>SIPCOT Industrial Parks</li>
              <li>Bengaluru, Karnataka</li>
              <li>Coimbatore, Tamil Nadu</li>
              <li>Cuddalore, Tamil Nadu</li>
              <li>Karaikudi, Tamil Nadu</li>
              <li>Dharmapuri, Tamil Nadu</li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-white font-bold mb-6">Solutions</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/cctv" className="hover:text-brand-blue transition">Industrial CCTV</Link></li>
              <li><Link href="/cctv" className="hover:text-brand-blue transition">IP Camera Setup</Link></li>
              <li><Link href="/solar" className="hover:text-brand-blue transition">Solar 4G Cameras</Link></li>
              <li><Link href="/automation" className="hover:text-brand-blue transition">Access Control</Link></li>
              <li><Link href="/amc" className="hover:text-brand-blue transition">CCTV AMC</Link></li>
              <li><Link href="/services/video-door-phones" className="hover:text-brand-blue transition">Video Door Phones</Link></li>
              <li><Link href="/services/biometric-systems" className="hover:text-brand-blue transition">Biometric Systems</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-brand-blue" />
                <span>{settings?.address || '16, Sarathi Nagar, Saidapet, Chennai, Tamil Nadu, India'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-brand-blue" />
                <a href={`tel:${settings?.contact_phone || '+918300290019'}`} className="hover:text-white">
                  {settings?.contact_phone || '+91 830029 0019'}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-brand-blue" />
                <a href={`mailto:${settings?.contact_email || 'sales@infysmart.com'}`} className="hover:text-white">
                  {settings?.contact_email || 'sales@infysmart.com'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p className="mb-4 md:mb-0">© {currentYear} Infygru Private Limited. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/cookie-policy" className="hover:text-white transition">Cookie Policy</Link>
            <Link href="/refund-policy" className="hover:text-white transition">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
