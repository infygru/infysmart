'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, CheckCircle2, ArrowLeft, Send, Loader2 } from 'lucide-react';

const propertyTypes = ['Home / Villa', 'Apartment', 'Office', 'Shop / Showroom', 'Factory / Warehouse', 'Farmhouse', 'Other'];
const cameraRanges = ['1–4 cameras', '5–8 cameras', '9–16 cameras', '17–32 cameras', '32+ cameras'];
const cities = ['Chennai', 'Hosur', 'Coimbatore', 'Bangalore', 'Madurai', 'Trichy', 'Salem', 'Dharmapuri', 'Karaikudi', 'Other'];

export default function CCTVQuotePage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    location_other: '',
    property_type: '',
    cctv_camera_count_range: '',
    cctv_has_existing_system: false,
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const payload = {
      ...form,
      service_type: 'cctv',
      location: form.location === 'Other' ? form.location_other : form.location,
    };
    // don't send the helper field
    delete (payload as Record<string, unknown>).location_other;

    try {
      const res = await fetch('/api/quote-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Quote Request Received!</h1>
          <p className="text-slate-600 mb-8">
            Thank you, <strong>{form.name}</strong>. Our CCTV team will call you at <strong>{form.phone}</strong> within 24 hours with a customized quote.
          </p>
          <Link href="/cctv" className="inline-block bg-brand-blue text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
            Back to CCTV Services
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <div className="bg-slate-900 text-white py-12 px-6">
        <div className="container mx-auto max-w-3xl">
          <Link href="/cctv" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to CCTV Services
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/50 border border-blue-700 text-blue-300 text-xs font-bold uppercase tracking-widest mb-4">
            <Eye className="w-3 h-3" /> CCTV & Surveillance
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Get a Free CCTV Quote</h1>
          <p className="text-slate-400 text-lg">
            Fill in your requirements below. Our security expert will call you with a detailed quote — no obligation.
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
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
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
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">City / Location</label>
                  <select
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm bg-white"
                  >
                    <option value="">Select your city</option>
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {form.location === 'Other' && (
                    <input
                      type="text"
                      name="location_other"
                      value={form.location_other}
                      onChange={handleChange}
                      required
                      className="w-full mt-2 px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* CCTV Requirements */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">CCTV Requirements</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Property Type</label>
                  <select
                    name="property_type"
                    value={form.property_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm bg-white"
                  >
                    <option value="">Select property type</option>
                    {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Number of Cameras</label>
                  <select
                    name="cctv_camera_count_range"
                    value={form.cctv_camera_count_range}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm bg-white"
                  >
                    <option value="">Select range</option>
                    {cameraRanges.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="cctv_has_existing_system"
                    checked={form.cctv_has_existing_system}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-slate-300 text-brand-blue focus:ring-brand-blue cursor-pointer"
                  />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                    I have an existing CCTV system (upgrade / repair)
                  </span>
                </label>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Additional Requirements</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-brand-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm resize-none"
                />
              </div>
            </div>

            {status === 'error' && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                Something went wrong. Please try again or call us at +91 94456 75619.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-brand-blue text-white py-4 rounded-lg font-bold text-base hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {status === 'loading' ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
              ) : (
                <><Send className="w-5 h-5" /> Get My Free CCTV Quote</>
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
            <div className="text-2xl font-bold text-brand-blue mb-1">24h</div>
            <div className="text-xs text-slate-500">Response Time</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="text-2xl font-bold text-brand-blue mb-1">Free</div>
            <div className="text-xs text-slate-500">Site Survey</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="text-2xl font-bold text-brand-blue mb-1">1000+</div>
            <div className="text-xs text-slate-500">Installations</div>
          </div>
        </div>
      </div>
    </main>
  );
}
