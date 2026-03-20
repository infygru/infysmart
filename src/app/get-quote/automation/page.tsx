'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Zap, CheckCircle2, ArrowLeft, Send, Loader2 } from 'lucide-react';

const automationTypes = [
  'Sliding Gate Motor',
  'Swing Gate Motor',
  'Rolling Shutter Motor',
  'Boom Barrier',
  'Flap Barrier',
  'Access Control (Biometric / RFID)',
  'Video Door Phone',
  'Multiple (gate + shutter etc.)',
];
const propertyTypes = ['Home / Villa', 'Apartment Complex', 'Commercial Office', 'Shop / Showroom', 'Factory / Warehouse', 'IT Park / SEZ', 'Other'];
const cities = ['Chennai', 'Hosur', 'Coimbatore', 'Bangalore', 'Madurai', 'Trichy', 'Salem', 'Sriperumbudur', 'Ambattur', 'Other'];

export default function AutomationQuotePage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    property_type: '',
    automation_type: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/quote-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, service_type: 'automation' }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center py-16">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Quote Request Received!</h1>
          <p className="text-slate-600 mb-8">
            Thank you, <strong>{form.name}</strong>. Our automation specialist will call you at <strong>{form.phone}</strong> within 24 hours to discuss your requirements.
          </p>
          <Link href="/automation" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
            Back to Automation Services
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <div className="bg-slate-950 text-white py-12 px-6">
        <div className="container mx-auto max-w-3xl">
          <Link href="/automation" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Automation Services
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/50 border border-blue-700 text-blue-300 text-xs font-bold uppercase tracking-widest mb-4">
            <Zap className="w-3 h-3" /> Smart Automation Systems
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Get a Free Automation Quote</h1>
          <p className="text-slate-400 text-lg">
            Tell us what you need to automate. Our engineers will design the right solution and send you a detailed quote.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto max-w-3xl px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Personal Details */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Your Details</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Arjun Sharma"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">City / Location</label>
                  <select
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm bg-white"
                  >
                    <option value="">Select your city</option>
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Automation Requirements */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Automation Requirements</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">What do you want to automate?</label>
                  <select
                    name="automation_type"
                    value={form.automation_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm bg-white"
                  >
                    <option value="">Select automation type</option>
                    {automationTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Property Type</label>
                  <select
                    name="property_type"
                    value={form.property_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm bg-white"
                  >
                    <option value="">Select property type</option>
                    {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Additional Details</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="e.g. Heavy industrial sliding gate 6 meters wide, need RFID card access, existing remote broken and need replacement motor..."
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm resize-none"
                />
              </div>
            </div>

            {/* Feature callout */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              {['Remote / App Control', 'Safety Sensors Included', 'Battery Backup Option', 'AMC Available'].map(f => (
                <div key={f} className="flex flex-col items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span className="text-slate-700 font-medium">{f}</span>
                </div>
              ))}
            </div>

            {status === 'error' && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                Something went wrong. Please try again or call us at +91 94456 75619.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-base hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {status === 'loading' ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
              ) : (
                <><Send className="w-5 h-5" /> Get My Free Automation Quote</>
              )}
            </button>

            <p className="text-center text-xs text-slate-400">
              By submitting, you agree to be contacted by InfySmart Solutions. No spam.
            </p>
          </form>
        </div>

        {/* Trust signals */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="text-2xl font-bold text-blue-600 mb-1">2000kg</div>
            <div className="text-xs text-slate-500">Max Gate Capacity</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="text-2xl font-bold text-blue-600 mb-1">IP55</div>
            <div className="text-xs text-slate-500">Weatherproof Motors</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="text-2xl font-bold text-blue-600 mb-1">1 yr+</div>
            <div className="text-xs text-slate-500">Motor Warranty</div>
          </div>
        </div>
      </div>
    </main>
  );
}
