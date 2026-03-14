'use client';

import Link from 'next/link';
import { GlobalSettings } from '@/lib/directus';
import { Facebook, Instagram, Linkedin, Youtube, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';

export default function Footer({ settings }: { settings?: GlobalSettings | null }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">

      {/* ─── MAIN FOOTER GRID ─── */}
      <div className="container mx-auto px-4 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">

          {/* ── Brand Column (spans 2 cols on lg) ── */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="text-2xl font-extrabold text-white tracking-tight block mb-4">
              {settings?.site_name || 'Infysmart'}
            </Link>
            <p className="text-sm leading-relaxed mb-5 max-w-xs">
              <strong className="text-slate-300">Infysmart</strong> is a unit of{' '}
              <strong className="text-slate-300">Infygru Private Limited</strong> — a
              government-approved provider of <strong className="text-slate-300">CCTV installation,
              Solar 4G cameras, biometric access control, video door phones</strong> and{' '}
              <strong className="text-slate-300">building automation</strong> across Tamil Nadu
              &amp; Karnataka.
            </p>

            {/* Govt & compliance badge */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 mb-5 space-y-1.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-500 shrink-0" />
                <p className="text-xs text-slate-300 font-semibold">Government &amp; PSU Compliant Vendor</p>
              </div>
              <p className="text-xs text-slate-500 leading-snug pl-6">
                GST Registered · MSME Certified · TNPL Empanelled · ACCET Approved
              </p>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <a href="#" aria-label="Infysmart on Facebook" className="p-2 bg-slate-900 rounded-lg border border-slate-800 hover:border-brand-blue hover:text-white transition">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Infysmart on Instagram" className="p-2 bg-slate-900 rounded-lg border border-slate-800 hover:border-brand-blue hover:text-white transition">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Infysmart on LinkedIn" className="p-2 bg-slate-900 rounded-lg border border-slate-800 hover:border-brand-blue hover:text-white transition">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Infysmart on YouTube" className="p-2 bg-slate-900 rounded-lg border border-slate-800 hover:border-brand-blue hover:text-white transition">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* ── Our Services ── */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wide">Our Services</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/cctv" className="hover:text-brand-blue transition-colors">CCTV Camera Installation</Link></li>
              <li><Link href="/cctv" className="hover:text-brand-blue transition-colors">IP Camera Setup</Link></li>
              <li><Link href="/cctv" className="hover:text-brand-blue transition-colors">Industrial Surveillance</Link></li>
              <li><Link href="/cctv" className="hover:text-brand-blue transition-colors">Factory CCTV Systems</Link></li>
              <li><Link href="/solar" className="hover:text-brand-blue transition-colors">Solar Panel Installation</Link></li>
              <li><Link href="/solar" className="hover:text-brand-blue transition-colors">Solar 4G CCTV Cameras</Link></li>
              <li><Link href="/automation" className="hover:text-brand-blue transition-colors">Gate Motor Automation</Link></li>
              <li><Link href="/automation" className="hover:text-brand-blue transition-colors">Rolling Shutter Motors</Link></li>
              <li><Link href="/automation" className="hover:text-brand-blue transition-colors">Boom Barriers</Link></li>
              <li><Link href="/services/biometric-systems" className="hover:text-brand-blue transition-colors">Biometric Attendance</Link></li>
              <li><Link href="/services/biometric-systems" className="hover:text-brand-blue transition-colors">Face Recognition Systems</Link></li>
              <li><Link href="/services/video-door-phones" className="hover:text-brand-blue transition-colors">Video Door Phones</Link></li>
              <li><Link href="/amc" className="hover:text-brand-blue transition-colors">CCTV AMC Services</Link></li>
              <li><Link href="/amc" className="hover:text-brand-blue transition-colors">Solar AMC Services</Link></li>
            </ul>
          </div>

          {/* ── Industry Solutions ── */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wide">Industry Solutions</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/cctv" className="hover:text-brand-blue transition-colors">Government &amp; PSU Projects</Link></li>
              <li><Link href="/cctv" className="hover:text-brand-blue transition-colors">Industrial CCTV</Link></li>
              <li><Link href="/cctv" className="hover:text-brand-blue transition-colors">Factory &amp; Warehouse</Link></li>
              <li><Link href="/cctv" className="hover:text-brand-blue transition-colors">SIPCOT Zone Security</Link></li>
              <li><Link href="/cctv" className="hover:text-brand-blue transition-colors">Educational Campuses</Link></li>
              <li><Link href="/cctv" className="hover:text-brand-blue transition-colors">Hospital &amp; Healthcare</Link></li>
              <li><Link href="/cctv" className="hover:text-brand-blue transition-colors">Apartment Complexes</Link></li>
              <li><Link href="/cctv" className="hover:text-brand-blue transition-colors">Retail &amp; Showrooms</Link></li>
              <li><Link href="/cctv" className="hover:text-brand-blue transition-colors">Bank &amp; ATM Security</Link></li>
              <li><Link href="/solar" className="hover:text-brand-blue transition-colors">Rooftop Solar (Commercial)</Link></li>
              <li><Link href="/solar" className="hover:text-brand-blue transition-colors">Off-Grid Solar Solutions</Link></li>
              <li><Link href="/projects" className="hover:text-brand-blue transition-colors">View All Projects</Link></li>
            </ul>
          </div>

          {/* ── Areas Served ── */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wide">Areas We Serve</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li className="font-semibold text-slate-400 text-xs">Tamil Nadu</li>
              <li>Chennai &amp; Suburbs</li>
              <li>Hosur, Krishnagiri Dt.</li>
              <li>Coimbatore</li>
              <li>Dharmapuri</li>
              <li>Karaikudi, Sivaganga Dt.</li>
              <li>Puducherry</li>
              <li>Cuddalore</li>
              <li>Madurai</li>
              <li>Salem</li>
              <li>Trichy</li>
              <li>Vellore</li>
              <li className="font-semibold text-slate-400 text-xs pt-2">Industrial Zones</li>
              <li>Ambattur Industrial Estate</li>
              <li>Guindy Industrial Estate</li>
              <li>Sriperumbudur &amp; Oragadam</li>
              <li>SIPCOT (Irungattukottai)</li>
              <li>SIPCOT Siruseri</li>
              <li>Kanchipuram &amp; Vallam</li>
              <li className="font-semibold text-slate-400 text-xs pt-2">Karnataka</li>
              <li>Bengaluru (Bangalore)</li>
              <li>Hosapete &amp; Tumkur</li>
            </ul>
          </div>

          {/* ── Company + Contact ── */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wide">Company</h4>
            <ul className="space-y-3 text-sm mb-8">
              <li><Link href="/" className="hover:text-brand-blue transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-brand-blue transition-colors">About Infysmart</Link></li>
              <li><Link href="/projects" className="hover:text-brand-blue transition-colors">Our Projects</Link></li>
              <li><Link href="/blog" className="hover:text-brand-blue transition-colors">Security Blog</Link></li>
              <li><Link href="/contact" className="hover:text-brand-blue transition-colors">Get a Quote</Link></li>
              <li><Link href="/amc" className="hover:text-brand-blue transition-colors">AMC Plans &amp; Pricing</Link></li>
            </ul>

            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wide">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-brand-blue mt-0.5" />
                <span className="text-xs leading-relaxed">
                  {settings?.address || '16, Sarathi Nagar, Saidapet, Chennai – 600 015, Tamil Nadu'}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-brand-blue" />
                <a href={`tel:${settings?.contact_phone || '+919445675619'}`} className="hover:text-white text-xs">
                  {settings?.contact_phone || '+91 94456 75619'}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-brand-blue" />
                <a href={`mailto:${settings?.contact_email || 'sales@infysmart.com'}`} className="hover:text-white text-xs">
                  {settings?.contact_email || 'sales@infysmart.com'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ─── SEO KEYWORD TEXT BLOCK ─── */}
        <div className="border-t border-slate-800/60 pt-8 mb-8">
          <p className="text-[11px] text-slate-600 leading-relaxed max-w-5xl">
            <strong className="text-slate-500">Infysmart</strong> (a unit of Infygru Private
            Limited) is a government-approved CCTV installation and security systems company
            in Tamil Nadu and Karnataka. We provide{' '}
            <strong className="text-slate-500">CCTV camera installation in Chennai</strong>,{' '}
            <strong className="text-slate-500">CCTV installation in Hosur</strong>,{' '}
            <strong className="text-slate-500">CCTV installation in Coimbatore</strong> and{' '}
            <strong className="text-slate-500">CCTV installation in Bangalore</strong>. Our
            services include industrial CCTV surveillance, solar 4G CCTV cameras,
            biometric access control systems, video door phone installation, gate motor
            automation, rolling shutter automation, boom barriers, fire alarm systems,
            burglar alarm systems, and comprehensive Annual Maintenance Contracts (AMC) for
            CCTV, solar, and security systems. We are authorized dealers for{' '}
            <strong className="text-slate-500">Hikvision, Dahua, CP Plus, Honeywell,
            Panasonic, Matrix, and Essl</strong>. Serving{' '}
            <strong className="text-slate-500">
              Chennai, Hosur, Coimbatore, Bangalore, Dharmapuri, Karaikudi, Puducherry,
              Cuddalore, Madurai, Salem, Trichy, Vellore
            </strong>{' '}and SIPCOT industrial zones across South India.
          </p>
        </div>

        {/* ─── BOTTOM BAR ─── */}
        <div className="border-t border-slate-800/60 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-slate-600">
            © {currentYear}{' '}
            <strong className="text-slate-500">Infygru Private Limited</strong>. All rights reserved.
            CIN: U74999TN2020PTC138825
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-slate-600">
            <Link href="/terms" className="hover:text-slate-300 transition">Terms &amp; Conditions</Link>
            <Link href="/privacy" className="hover:text-slate-300 transition">Privacy Policy</Link>
            <Link href="/cookie-policy" className="hover:text-slate-300 transition">Cookie Policy</Link>
            <Link href="/refund-policy" className="hover:text-slate-300 transition">Refund &amp; Payment Policy</Link>
            <Link href="/sitemap.xml" className="hover:text-slate-300 transition">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
