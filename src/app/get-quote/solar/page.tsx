'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sun, CheckCircle2, ArrowLeft, Send, Loader2 } from 'lucide-react';

const propertyTypes = ['Residential Home', 'Apartment / Flat', 'Commercial Office', 'Factory / Industry', 'Farm / Agriculture', 'Educational Institution', 'Other'];
const systemTypes = ['On-Grid (Grid-Tie)', 'Off-Grid (Battery Backup)', 'Hybrid (Grid + Battery)', 'Solar Water Pump', 'Solar 4G CCTV Camera'];
const capacities = ['1 kW', '2 kW', '3 kW', '5 kW', '7.5 kW', '10 kW', '15 kW', '20 kW+', 'Not sure — advise me'];
const monthlyBills = ['Below ₹1,000', '₹1,000 – ₹3,000', '₹3,000 – ₹5,000', '₹5,000 – ₹10,000', 'Above ₹10,000'];
const cities = ['Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Salem', 'Hosur', 'Erode', 'Vellore', 'Tirunelveli', 'Puducherry', 'Bangalore', 'Other'];

export default function SolarQuotePage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    property_type: '',
    solar_system_type: '',
    solar_capacity: '',
    solar_monthly_bill: '',
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
        body: JSON.stringify({ ...form, service_type: 'solar' }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <main className="min-h-screen bg-amber-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center py-16">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-yellow-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Quote Request Received!</h1>
          <p className="text-slate-600 mb-8">
            Thank you, <strong>{form.name}</strong>. Our solar energy expert will call you at <strong>{form.phone}</strong> within 24 hours with a detailed proposal and ROI report.
          </p>
          <Link href="/solar" className="inline-block bg-yellow-500 text-slate-900 px-8 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
            Back to Solar Services
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-amber-50 font-sans text-slate-900">
      {/* Header */}
      <div className="bg-slate-900 text-white py-12 px-6">
        <div className="container mx-auto max-w-3xl">
          <Link href="/solar" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Solar Services
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 text-xs font-bold uppercase tracking-widest mb-4">
            <Sun className="w-3 h-3" /> Solar Power Solutions
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Get a Free Solar Quote & ROI Report</h1>
          <p className="text-slate-400 text-lg">
            Tell us about your energy needs. We&apos;ll calculate your savings, subsidy eligibility, and payback period — for free.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto max-w-3xl px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-8 md:p-10">
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
                    placeholder="Senthil Murugan"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 outline-none transition-all text-sm"
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
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 outline-none transition-all text-sm"
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
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">City / Location</label>
                  <select
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 outline-none transition-all text-sm bg-white"
                  >
                    <option value="">Select your city</option>
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Solar Requirements */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Solar Requirements</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Property Type</label>
                  <select
                    name="property_type"
                    value={form.property_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 outline-none transition-all text-sm bg-white"
                  >
                    <option value="">Select property type</option>
                    {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">System Type</label>
                  <select
                    name="solar_system_type"
                    value={form.solar_system_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 outline-none transition-all text-sm bg-white"
                  >
                    <option value="">Select system type</option>
                    {systemTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Required Capacity</label>
                  <select
                    name="solar_capacity"
                    value={form.solar_capacity}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 outline-none transition-all text-sm bg-white"
                  >
                    <option value="">Select capacity</option>
                    {capacities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Current Monthly Electricity Bill</label>
                  <select
                    name="solar_monthly_bill"
                    value={form.solar_monthly_bill}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 outline-none transition-all text-sm bg-white"
                  >
                    <option value="">Select bill range</option>
                    {monthlyBills.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Additional Requirements</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="e.g. Flat roof, want subsidy, need battery backup, industrial shed with metal roof..."
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 outline-none transition-all text-sm resize-none"
                />
              </div>
            </div>

            {/* Subsidy notice */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex gap-3 items-start">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <p className="text-sm text-green-800">
                <strong>PM Surya Ghar Subsidy:</strong> Residential customers may qualify for up to ₹78,000 subsidy. Our team will verify your eligibility when we call.
              </p>
            </div>

            {status === 'error' && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                Something went wrong. Please try again or call us at +91 94456 75619.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-yellow-500 text-slate-900 py-4 rounded-lg font-bold text-base hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {status === 'loading' ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
              ) : (
                <><Send className="w-5 h-5" /> Get My Free Solar Quote</>
              )}
            </button>

            <p className="text-center text-xs text-slate-400">
              By submitting, you agree to be contacted by InfySmart Solutions. No spam.
            </p>
          </form>
        </div>

        {/* Trust signals */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-xl p-4 border border-amber-100">
            <div className="text-2xl font-bold text-yellow-600 mb-1">3–4 yr</div>
            <div className="text-xs text-slate-500">Avg. ROI Period</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-amber-100">
            <div className="text-2xl font-bold text-yellow-600 mb-1">₹78k</div>
            <div className="text-xs text-slate-500">Max Govt Subsidy</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-amber-100">
            <div className="text-2xl font-bold text-yellow-600 mb-1">25 yr</div>
            <div className="text-xs text-slate-500">Panel Warranty</div>
          </div>
        </div>
      </div>
    </main>
  );
}
